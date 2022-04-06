import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services/fetchquestios';
import { fetchTokenThunk } from '../redux/action';

class Play extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: '',
    };
  }

  async componentDidMount() {
    const { dispatch, token } = this.props;
    const APIanswer = await fetchQuestions(token);
    const invalidToken = 3;
    if (APIanswer.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
    this.setState({
      questions: APIanswer.results,
    });
  }

  renderAnswers = () => {
    let answers = [];
    const { questions } = this.state;
    questions[0].incorrect_answers.forEach((element, index) => {
      answers = [...answers, [`wrong-answer-${index}`, element]];
    }); // Cria array de respostas erradas
    const randomIndex = Math.floor(Math.random() * (answers.length + 1)); // Cria index aleatório
    answers.splice(randomIndex, 0, ['correct-answer', questions[0].correct_answer]); // Adiciona resposta correta em index aleatório
    return (
      answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ answer[0] }
        >
          {answer[1]}
        </button>
      ))
    );
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    const render = questions.length;
    return (
      <section>
        <p data-testid="question-category">{render && questions[0].category}</p>
        <p data-testid="question-text">{render && questions[0].question}</p>
        {render && this.renderAnswers()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

Play.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Play);
