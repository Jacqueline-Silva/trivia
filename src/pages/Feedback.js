import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveRanking, getRanking } from '../services/localStorage';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const ranking = { name, score, gravatarEmail, assertions };
    saveRanking(ranking);
  }

  render() {
    // const { email, nome, score } = this.props;
    const { score, assertions } = getRanking();
    const lintChato = 3;
    const result = assertions >= lintChato ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{result}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
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
