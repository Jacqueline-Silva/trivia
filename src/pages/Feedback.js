import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRanking } from '../services/localStorage';
import Header from '../components/Header';

class Feedback extends React.Component {
  /* componentDidMount() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const ranking = { name, score, gravatarEmail, assertions };
    saveRanking(ranking);
  } */

  render() {
    // const { email, nome, score } = this.props;
    const rankingAtual = getRanking();
    const { history } = this.props;
    const { score, assertions } = rankingAtual;
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
          onClick={ () => history.push('./') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

/* const mapStateToProps = (store) => ({
  score: store.player.score,
  assertions: store.player.assertions,
  name: store.player.name,
  gravatarEmail: store.player.gravatarEmail,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
*/
Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
