import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getRankings } from '../services/localStorage';
import fetchGravatar from '../services/fecthGravatar';

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

    // Criando Gravatars:
    rankings.forEach(((element) => {
      (element
        .gravatarEmail = fetchGravatar(element.gravatarEmail));
    }));
    this.setState({ rankings });
  }

  render() {
    const { history } = this.props;
    const { rankings } = this.state;
    console.log(rankings);
    return (
      <div>
        <div>
          <Header />
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('./') }
          >
            Home
          </button>
        </div>
        <h1 data-testid="ranking-title">Ranking</h1>
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
