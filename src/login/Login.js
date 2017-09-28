import React from 'react';
import AppState from 'react-app-state';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import loginState from './loginState';
import './Login.css';

let frmState = new AppState({ usr: '', pwd: '' });

const Login = () => (
	<div id="Login-wrap">
		<Card>
			<form onSubmit={ev => {
				ev.preventDefault();
				loginState.login(frmState.get('usr'), frmState.get('pwd'));
			}}>
				<h1>Login</h1>
				<div>
					<TextField
						autoFocus
						autoComplete="off"
						onChange={e => frmState.set({ usr: e.target.value })}
						name="login"
						floatingLabelText="Login"/>
				</div>
				<div>
					<TextField
						name="pwd"
						onChange={e => frmState.set({ pwd: e.target.value })}
						type="password"
						floatingLabelText="Password"/>
				</div>
				<RaisedButton primary type="submit" label="Sign in"/>
			</form>
		</Card>
	</div>
);

export default Login;
