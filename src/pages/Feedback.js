import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearScore } from '../redux/action';
import Header from '../components/Header';
import './Feedback.css';
import Scoreboard from '../components/Scoreboard';

class Feedback extends React.Component {
  render() {
    const { history, score, assertions, resetScore } = this.props;
    const lintChato = 3;
    const result = assertions >= lintChato ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <Header />
        <div className="feedback__parent">
          <div className="feedback__result">
            <Scoreboard
              result={ result }
              score={ score }
              assertions={ assertions }
              history={ history }
            />
            <nav>
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
            </nav>
          </div>
        </div>
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
