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
      showBorder: false,
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
        isDisabled: false,
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
    this.setState({
      showBorder: false,
    });
  }

  chooseAnswer = (answerType) => {
    const { sendScore } = this.props;
    this.setState({
      questiOnOff: false,
      showBorder: true,
    });
    clearInterval(this.timerToAnswer);
    const score = this.countPoints(answerType);
    sendScore(score);
  }

  countPoints = (answerType) => {
    const { questions: { results } } = this.props;
    const { questionIndex, time } = this.state;
    const difficultiesValues = { hard: 3, medium: 2, easy: 1 };
    const { difficulty } = results[questionIndex]; // Pega a chave difficulty da pergunta atual
    const base = 10;
    let hits = {};
    if (answerType.includes('correct')) {
      const totalPoints = base + (time * difficultiesValues[difficulty]);
      hits = { score: totalPoints, assertions: 1 };
      return hits;
    }
    return { score: 0, assertions: 0 };
  }

  applyClass = (answer) => (answer.includes('wrong') ? 'wrong' : 'correct');

  renderAnswers = () => {
    let answers = [];
    const { questionIndex, answerIndex, isDisabled, showBorder } = this.state;
    const { questions: { results } } = this.props;
    // Cria array de respostas erradas
    results[questionIndex].incorrect_answers.forEach((element, index) => {
      answers = [...answers, [`wrong-answer-${index}`, element]];
    });
    // Adiciona resposta correta em index aleatório
    answers
      .splice(answerIndex, 0, ['correct-answer', results[questionIndex].correct_answer]);

    return (
      <div data-testid="answer-options" className="play__reply">
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ answer[0] }
              className={ showBorder ? this.applyClass(answer[0]) : '' }
              name="answer"
              onClick={ () => this.chooseAnswer(answer[0]) }
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
    const { questions: { results }, history } = this.props;
    const { questiOnOff, questionIndex, time } = this.state;
    return (
      <div>
        <Header history={ history } />
        <div className="play__parent">
          {
            results.length && (
              <section className="play__questions">
                <span className="play__time">
                  Time:
                  <p>{`${time}s`}</p>
                </span>
                <div className="play-questions__category-text">
                  <p
                    data-testid="question-category"
                    className="play__question-category"
                  >
                    {results[questionIndex].category}
                  </p>
                  <p
                    data-testid="question-text"
                    className="play__question-text"
                  >
                    {he.decode(results[questionIndex].question)}
                  </p>
                  {this.renderAnswers()}
                </div>
                {(!questiOnOff || time === 0)
              && (
                <button
                  type="button"
                  onClick={ this.nextQuestion }
                  data-testid="btn-next"
                  className="play__btn-next"
                >
                  Next
                </button>)}
              </section>
            )
          }
        </div>
      </div>
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
  dispatch: PropTypes.func,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }),
  score: PropTypes.number,
  assertions: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  sendScore: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
