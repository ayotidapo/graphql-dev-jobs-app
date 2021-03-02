import React, { Component } from 'react';
import { loginUser } from './request';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: false };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleClick(event) {
    try {
      event.preventDefault();
      const { email, password } = this.state;
      await loginUser({ email, password })

      this.props.onLogin();
    } catch (e) {

      const error = e.graphQLErrors.map(x => x.message).join(',')
      this.setState({ error });
    }

  }


  render() {
    const { email, password, error } = this.state;
    return (
      <form>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" name="email" value={email}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <p className="help is-danger">{error && 'Invalid credentials'}</p>
          <div className="control">
            <button className="button is-link" onClick={this.handleClick.bind(this)}>Login</button>
          </div>
        </div>
      </form>
    );
  }
}
