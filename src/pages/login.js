import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/action';

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

  render() {
    const { email, name } = this.state;
    const { click } = this.props;
    const nameValidate = name.length > 0;
    const emailValidade = email.length > 0;
    // (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

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
            <Link to="/carteira">
              <button
                id="button"
                disabled={ !(emailValidade && nameValidate) }
                data-testid="btn-play"
                type="button"
                onClick={ async () => click(name, email) }
              >
                Play
              </button>
            </Link>
          </form>
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
});

export default connect(null, mapDispatchToProps)(Login);
