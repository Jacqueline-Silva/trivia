import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fecthGravatar';
import './Header.css';

class Feedback extends React.Component {
  render() {
    // const { email, nome, score } = this.props;
    const { score, assertion } = this.props;
    const lintChato = 3;
    const result = assertion >= lintChato ? "Well Done!" : "Could be better...";
    return (
      <div>
        <p data-testid="feedback-text">{result}</p>
      </div>
    );
  }
}

const mapStateToProps = () => ({
  score: store.player.score,
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
