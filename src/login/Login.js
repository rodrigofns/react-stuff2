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
		<form onSubmit={ev => {
			ev.preventDefault();
			loginState.login(frmState.get('usr'), frmState.get('pwd'));
		}}>
			<Card>
				<div id="Login-card-inner">
					<h2>Login</h2>
					<div>
						<TextField
							autoFocus
							autoComplete="off"
							onChange={e => frmState.set({ usr: e.target.value })}
							name="login"
							floatingLabelText="Nome de usuário"/>
					</div>
					<div>
						<TextField
							name="pwd"
							onChange={e => frmState.set({ pwd: e.target.value })}
							type="password"
							floatingLabelText="Senha"/>
					</div>
					<RaisedButton secondary type="submit" label="Entrar"/>
				</div>
			</Card>
		</form>
		<footer>
			Procuradoria Geral da Fazenda Nacional<br/>
			Esplanada dos Ministérios, Bloco "P", 8º andar<br/>
			CEP: 70048-900, Brasília/DF
		</footer>
	</div>
);

export default Login;
