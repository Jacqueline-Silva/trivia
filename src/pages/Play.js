import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import he from 'he'; // Dica da Luá
import { fetchTokenThunk, newScore } from '../redux/action';
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
      isDisabled: false,
      time: 30,
    };
  }

  async componentDidMount() {
    // Em caso de token inválido
    const { dispatch, questions } = this.props;
    const { results: { 0: { incorrect_answers: answers } } } = questions;
    const invalidToken = 3;
    if (questions.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }

    // Usado no botão next e para misturar as respostas (index aleatório das respostas)
    this.setState({ answerIndex: Math.floor(Math.random() * (answers.length + 1)) });

    this.timer();
  }

  componentDidUpdate(previousProps, previousState) {
    // Quando o timer zera sem resposta desabilita os botões e limpa interval
    if (previousState.time === 1) {
      clearInterval(this.timerToAnswer);
      this.setState({
        isDisabled: true,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerToAnswer);
  }

  timer = () => {
    const time = 1000;
    this.timerToAnswer = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, time);
  }

  sendToLocalStorage = () => {
    const { name, score, gravatarEmail, assertions } = this.props;
    const ranking = { name, score, gravatarEmail, assertions };
    saveRanking(ranking);
  }

  nextQuestion = () => {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const { results: { [questionIndex]: { incorrect_answers: answers } } } = questions;
    const quatro = 4;
    return (questionIndex !== quatro
      ? this.setState((state) => ({
        questionIndex: state.questionIndex + 1,
        questiOnOff: true,
        time: 30,
        answerIndex: Math.floor(Math.random() * (answers.length + 1)),
      }), this.rebootColorButton, this.timer()) : this.feedbackPush());
  }

  feedbackPush = () => {
    const { history } = this.props;
    this.sendToLocalStorage();
    history.push('./feedback');
  }

  rebootColorButton = () => {
    const buttons = document.getElementsByName('answer');
    buttons.forEach((button) => (button.className
      .includes('wrong') ? button.classList
        .remove('wrong') : button.classList.remove('correct')));
  }

  chooseAnswer = ({ target }) => {
    const { sendScore } = this.props;
    const buttons = document.getElementsByName('answer');
    buttons.forEach((button) => {
      if (button.className.includes('wrong')) {
        button.classList.add('wrong');
      } else {
        button.classList.add('correct');
      }
    });
    this.setState({ questiOnOff: false });
    clearInterval(this.timerToAnswer);
    const score = this.countPoints(target.className);
    console.log(score);
    sendScore(score);
  }

  countPoints = (className) => {
    const { questions: { results } } = this.props;
    const { questionIndex, time } = this.state;
    const difficulties = [{ hard: 3 }, { medium: 2 }, { easy: 1 }];
    const { difficulty } = results[questionIndex];
    const base = 10;
    let teste = {};
    if (className.includes('correct')) {
      const difficultyPoints = difficulties
        .find((item) => difficulty === Object.keys(item).toString());
      const totalPoints = base
      + (time * difficultyPoints[results[questionIndex].difficulty]);
      teste = { score: totalPoints, assertions: 1 };
      return teste;
    }
    return { score: 0, assertions: 0 };
  }

  renderAnswers = () => {
    let answers = [];
    const { questionIndex, answerIndex, isDisabled } = this.state;
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
              disabled={ isDisabled }
            >
              {he.decode(answer[1])}
            </button>
          ))
        }
      </div>

    );
  }

  render() {
    const { history, questions: { results } } = this.props;
    const { questiOnOff, questionIndex, time, isDisabled } = this.state;
    return (
      <>
        <div>
          <Header />
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('./') }
          >
            Início
          </button>
        </div>
        {
          results.length && (
            <section>
              <p data-testid="question-category">{results[questionIndex].category}</p>
              <p
                data-testid="question-text"
              >
                {he.decode(results[questionIndex].question)}
              </p>
              {this.renderAnswers()}
              <p>{time}</p>
              {(!questiOnOff || isDisabled)
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

const mapDispatchToProps = (dispatch) => ({
  sendScore: (state) => dispatch(newScore(state)),
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
  sendScore: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// blabla

export default connect(mapStateToProps, mapDispatchToProps)(Play);
