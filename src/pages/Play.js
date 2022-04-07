import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk } from '../redux/action';
import Header from '../components/Header';
import { saveRanking } from '../services/localStorage';
import './Play.css';

class Play extends React.Component {
  async componentDidMount() {
    const { dispatch, questions } = this.props;
    console.log(questions);
    const invalidToken = 3;
    if (questions.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
  }

  chooseAnswer = () => {
    const buttons = document.getElementsByName('answer');
    console.log(buttons);
    buttons.forEach((button) => {
      console.log(button.className);
      if (button.className.includes('wrong')) {
        button.classList.add('wrong');
      } else {
        button.classList.add('correct');
      }
    });
  }

  renderAnswers = () => {
    let answers = [];
    const { questions } = this.props;
    const { results } = questions;
    results[0].incorrect_answers.forEach((element, index) => {
      answers = [...answers, [`wrong-answer-${index}`, element]];
    }); // Cria array de respostas erradas
    const randomIndex = Math.floor(Math.random() * (answers.length + 1)); // Cria index aleatório
    answers.splice(randomIndex, 0, ['correct-answer', results[0].correct_answer]); // Adiciona resposta correta em index aleatório
    return (
      <div data-testid="answer-options">
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ answer[0] }
              className={ answer[0] }
              name="answer"
              onClick={ this.chooseAnswer }
            >
              {answer[1]}
            </button>
          ))
        }
      </div>

    );
  }

  sendToLocalStorage = () => {
    const { name, score, gravatarEmail, assertions, history } = this.props;
    console.log(this.props);
    const ranking = { name, score, gravatarEmail, assertions };
    saveRanking(ranking);
    history.push('./feedback');
  }

  render() {
    const { questions: { results } } = this.props;
    return (
      <>
        <div>
          <Header />
        </div>
        {
          results.length && (
            <section>
              <p data-testid="question-category">{results[0].category}</p>
              <p data-testid="question-text">{results[0].question}</p>
              {this.renderAnswers()}
              <button type="button" onClick={ this.sendToLocalStorage }>
                Feedback
              </button>
            </section>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Play);
