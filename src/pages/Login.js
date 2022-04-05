import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchTokenThunk } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',

    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { name, email } = this.state;
    const { click, tokenThunk, history } = this.props;
    click(name, email);
    tokenThunk();
    history.push('');
  }

  settingsRedirect = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, name } = this.state;
    const nameValidate = name.length > 0;
    const emailValidade = email.length > 0;

    return (
      <div>
        <fieldset>
          <form>
            <label htmlFor="name">
              <input
                type="name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
                name="name"
                id="name"
                placeholder="Name"
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="input-gravatar-email"
                type="email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                id="email"
                placeholder="Email"
              />
            </label>
            <button
              id="button"
              disabled={ !(emailValidade && nameValidate) }
              data-testid="btn-play"
              type="button"
              onClick={ this.handleClick }
            >
              Play
            </button>
          </form>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsRedirect }
          >
            Settings
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  click: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  click: (name, email) => dispatch(login(name, email)),
  tokenThunk: () => dispatch(fetchTokenThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
