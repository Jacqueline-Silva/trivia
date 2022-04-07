import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk } from '../redux/action';
import Header from '../components/Header';
import { saveRanking } from '../services/localStorage';
import './Play.css';

class Play extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
      questiOnOff: true,
      answerIndex: 0,
    };
  }

  async componentDidMount() {
    const { dispatch, questions } = this.props;
    const { results: { 0: { incorrect_answers: answers } } } = questions;
    const invalidToken = 3;
    if (questions.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
    this.setState({ answerIndex: Math.floor(Math.random() * (answers.length + 1)) });
  }

  sendToLocalStorage = () => {
    const { name, score, gravatarEmail, assertions } = this.props;
    const ranking = { name, score, gravatarEmail, assertions };
    saveRanking(ranking);
  }

  nextQuestion = () => {
    this.sendToLocalStorage();
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const { history } = this.props;
    const { results: { [questionIndex]: { incorrect_answers: answers } } } = questions;
    const quatro = 4;
    return (questionIndex !== quatro
      ? this.setState((state) => ({
        questionIndex: state.questionIndex + 1,
        questiOnOff: true,
        answerIndex: Math.floor(Math.random() * (answers.length + 1)),
      }), this.rebootColorButton) : history.push('./feedback'));
  }

  rebootColorButton = () => {
    const buttons = document.getElementsByName('answer');
    buttons.forEach((button) => (button.className
      .includes('wrong') ? button.classList
        .remove('wrong') : button.classList.remove('correct')));
  }

  chooseAnswer = () => {
    const buttons = document.getElementsByName('answer');
    buttons.forEach((button) => {
      if (button.className.includes('wrong')) {
        button.classList.add('wrong');
      } else {
        button.classList.add('correct');
      }
    });
    this.setState({ questiOnOff: false });
  }

  renderAnswers = () => {
    let answers = [];
    const { questionIndex, answerIndex } = this.state;
    const { questions } = this.props;
    const { results } = questions;

    results[questionIndex].incorrect_answers.forEach((element, index) => {
      answers = [...answers, [`wrong-answer-${index}`, element]];
    }); // Cria array de respostas erradas

    answers
      .splice(answerIndex, 0, ['correct-answer', results[questionIndex].correct_answer]); // Adiciona resposta correta em index aleatório

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

  render() {
    const { questiOnOff, questionIndex } = this.state;
    const { questions: { results } } = this.props;
    return (
      <>
        <div>
          <Header />
        </div>
        {
          results.length && (
            <section>
              <p data-testid="question-category">{results[questionIndex].category}</p>
              <p data-testid="question-text">{results[questionIndex].question}</p>
              {this.renderAnswers()}
              {!questiOnOff
              && (
                <button
                  type="button"
                  onClick={ this.nextQuestion }
                  data-testid="btn-next"
                >
                  Next
                </button>)}

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
