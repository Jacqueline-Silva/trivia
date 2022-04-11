import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fecthGravatar';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      img: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const img = fetchGravatar(email);
    this.setState({ img });
  }

  render() {
    const { email, nome, score, history } = this.props;
    const { img } = this.state;
    return (
      <header>
        <div className="header__user">
          <img
            data-testid="header-profile-picture"
            src={ img }
            alt={ `Avatar de ${email}` }
            className="header__picture"
          />
          <p data-testid="header-player-name">{ nome }</p>
        </div>
        <div className="header__score-and-btn">
          <span className="header__score">
            Score:
            <p data-testid="header-score">{ score }</p>
          </span>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
          >
            Logout
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nome: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: propTypes.string,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
