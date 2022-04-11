import React, { Component } from 'react';
import PropTypes from 'prop-types';
import coulBeBetter from '../image/couldBeBetter.png';
import wellDone from '../image/wellDone.png';

class Scoreboard extends Component {
  render() {
    const { result, score, assertions } = this.props;
    return (
      <div>
        {result === 'Well Done!'
          ? <img src={ wellDone } alt="charada" />
          : <img src={ coulBeBetter } alt="charada" />}
        <section>
          <h1 data-testid="feedback-text">{result}</h1>
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
      </div>

    );
  }
}

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
};

export default Scoreboard;
