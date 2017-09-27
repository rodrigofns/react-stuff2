import React from 'react';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import loginState from './loginState';
import './Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userName: '', pwd: '' };
	}

	render() {
		return (
			<div id="Login-wrap">
				<Card>
					<form onSubmit={ev => {
						ev.preventDefault();
						loginState.login(this.state.userName, this.state.login);
					}}>
						<h1>Login</h1>
						<div>
							<TextField
								autoFocus
								autoComplete="off"
								value={this.state.userName}
								onChange={e => this.setState({ userName: e.target.value })}
								name="login"
								floatingLabelText="Login"/>
						</div>
						<div>
							<TextField
							value={this.state.pwd}
								name="pwd"
								onChange={e => this.setState({ pwd: e.target.value })}
								type="password"
								floatingLabelText="Password"/>
						</div>
						<RaisedButton primary type="submit" label="Sign in"/>
					</form>
				</Card>
			</div>
		);
	}
}

export default Login;
