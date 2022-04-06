import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk } from '../redux/action';
import Header from '../components/Header';

class Play extends React.Component {
  async componentDidMount() {
    const { dispatch, questions } = this.props;
    console.log(questions);
    const invalidToken = 3;
    if (questions.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
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
            >
              {answer[1]}
            </button>
          ))
        }
      </div>

    );
  }

  render() {
    const { questions: { results } } = this.props;
    console.log(results);
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
            </section>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps)(Play);
