import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenThunk } from '../redux/action';
import Header from '../components/Header';

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
    console.log(answers.length);
    const invalidToken = 3;
    if (questions.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
    this.setState({ answerIndex: Math.floor(Math.random() * (answers.length + 1)) });
  }

  nextQuestion = () => {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const { results: { [questionIndex]: { incorrect_answers: answers } } } = questions;
    const quatro = 4;
    const menosQuatro = -4;
    const provisório = questionIndex < quatro ? 1 : -menosQuatro;
    this.setState((state) => ({
      questionIndex: state.questionIndex + provisório,
      questiOnOff: true,
      answerIndex: Math.floor(Math.random() * (answers.length + 1)),
    }));
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
              onClick={ () => this.setState({ questiOnOff: false }) }
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
    console.log(results);
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
});

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps)(Play);
