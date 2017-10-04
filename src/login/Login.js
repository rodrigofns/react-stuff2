import React from 'react';
import AppState, {subscribe} from 'react-app-state';
import {Card, RaisedButton, TextField} from '../_util/material';

import BarraAguarde from '../_util/BarraAguarde';
import loginState from './loginState';
import './Login.css';

let frmLogin = new AppState({ usuario: '', senha: '', processando: false });

@subscribe(frmLogin)
export default class Login extends React.Component {
	render() {
		let { usuario, senha, processando } = this.props;
		return (
			<div id="Login">
				<form onSubmit={ev => {
					ev.preventDefault();
					frmLogin.set({ processando: true }, () => {
						loginState.login(usuario, senha, () => {
							frmLogin.set({ usuario: '', senha: '', processando: false });
						});
					});
				}}>
					<Card>
						<BarraAguarde visivel={processando}/>
						<div className="caixaLogin">
							<h2>Login</h2>
							<div>
								<TextField
									autoFocus
									autoComplete="off"
									disabled={processando}
									onChange={e => frmLogin.set({ usuario: e.target.value })}
									name="login"
									floatingLabelText="Nome de usuário"/>
							</div>
							<div>
								<TextField
									name="pwd"
									disabled={processando}
									onChange={e => frmLogin.set({ senha: e.target.value })}
									type="password"
									floatingLabelText="Senha"/>
							</div>
							<RaisedButton secondary type="submit" label="Entrar"
								disabled={(!usuario || !usuario.length) || (!senha || !senha.length) || processando}/>
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
	}
}
