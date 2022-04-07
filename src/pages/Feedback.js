import React from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../services/localStorage';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    const rankingAtual = getRanking();
    console.log(rankingAtual);
    const { score, assertions } = rankingAtual;
    const lintChato = 3;
    const result = assertions >= lintChato ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{result}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Feedback;
