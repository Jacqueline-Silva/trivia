import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearScore } from '../redux/action';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { history, score, assertions, resetScore } = this.props;
    const lintChato = 3;
    const result = assertions >= lintChato ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{result}</h1>
        <h2>
          Score:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </h2>
        <h2>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => resetScore() && history.push('./') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => resetScore() && history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(clearScore()),
});

const mapStateToProps = (state) => ({
  questions: state.questions,
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
