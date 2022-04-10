import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRankings } from '../services/localStorage';
import './Ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      rankings: [],
    };
  }

  componentDidMount() {
    const rankings = getRankings();

    // referência do código de ordenação: https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
    // Ordenando os rankings por score:
    const lintChato = (a, b) => ((a.score < b.score) ? 1 : 0);
    const lintChato2 = -1;
    const ordenação = (a, b) => (a.score > b.score ? lintChato2 : lintChato);
    rankings.sort(ordenação);
    // fim da ordenação;
    this.setState({ rankings });
  }

  render() {
    const { history } = this.props;
    const { rankings } = this.state;
    console.log(rankings);
    return (
      <div className="ranking__parent">
        <div className="ranking__result">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ol className="ranking__results">
            { rankings.map((ranking, i) => (
              <li key={ i }>
                <img
                  data-testid={ `gravatar-email-${i}` }
                  src={ ranking.picture }
                  alt={ `Avatar do ${ranking.name}` }
                />
                <h2 data-testid={ `player-name-${i}` }>{ranking.name}</h2>
                <h3 data-testid={ `player-score-${i}` }>{ranking.score}</h3>
              </li>
            )) }
          </ol>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('./') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
