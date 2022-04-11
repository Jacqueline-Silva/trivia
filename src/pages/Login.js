import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchTokenThunk, saveQuestions } from '../redux/action';
import fetchQuestions from '../services/fetchquestios';
import './Login.css';

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

  handleClick = async () => {
    const { name, email } = this.state;
    const { click, tokenThunk, history, savingQuestions } = this.props;
    click(name, email);
    await tokenThunk();
    const { token } = this.props;
    const APIanswer = await fetchQuestions(token);
    savingQuestions(APIanswer);
    history.push('/play');
  }

  settingsRedirect = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, name } = this.state;
    const nameValidate = name.length > 0;
    const emailValidade = email.length > 0
      || (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

    return (
      <div className="login__parent">
        <form className="login__form--center">
          {// "https://i.pinimg.com/736x/f3/f3/50/f3f350bd03f37534896b775ca9c1a0f0.jpg"
          // "../image/charada-interrogacao.jpg"
          }
          <img
            src="https://i.pinimg.com/736x/f3/f3/50/f3f350bd03f37534896b775ca9c1a0f0.jpg"
            alt="?"
            width="130px"
          />
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
          <section className="login__buttons">
            <button
              id="button"
              disabled={ !(emailValidade && nameValidate) }
              data-testid="btn-play"
              type="button"
              onClick={ this.handleClick }
              className="login-button__play"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.settingsRedirect }
              className="login-button__settings"
            >
              Settings
            </button>
          </section>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  click: propTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  click: (name, email) => dispatch(login(name, email)),
  tokenThunk: () => dispatch(fetchTokenThunk()),
  savingQuestions: (questions) => dispatch(saveQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
