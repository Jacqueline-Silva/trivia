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
    console.log(token);
    const APIanswer = await fetchQuestions(token);
    console.log(APIanswer);
    const invalidToken = 3;
    if (APIanswer.response_code === invalidToken) {
      dispatch(fetchTokenThunk());
    }
    this.setState({
      questions: APIanswer.results,
    });
  }

  // async componentDidUpdate(prevProps) {
  //   const { token } = this.props;
  //   if (prevProps.token !== token) {
  //     const APIanswer = await this.getQuestion();
  //     console.log(APIanswer);
  //     this.setState({
  //       questions: APIanswer.results,
  //     });
  //   }
  // }

  // getQuestion = async () => {
  //   const { token } = this.props;
  //   // console.log(token);
  //   const question = await fetchQuestions(token);
  //   // console.log(question);
  //   return question;
  // }

  render() {
    console.log(this.state);
    const { questions } = this.state;
    return (
      <section>
        <p data-testid="question-category">{questions.length && questions[0].category}</p>
        <p data-testid="question-text">{questions.length && questions[0].question}</p>
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
