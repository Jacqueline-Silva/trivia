import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Scoreboard extends Component {
  render() {
    const { result, score, assertions } = this.props;
    return (
      <>
        <h1 data-testid="feedback-text">{result}</h1>
        <section>
          <h2>
            Score:
            {' '}
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </h2>
          <h2>
            Assertions:
            {' '}
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
          </h2>
        </section>
      </>

    );
  }
}

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
};

export default Scoreboard;
