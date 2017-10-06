import React from 'react';
import AppState, {subscribe} from 'react-app-state';
import {Card, RaisedButton, TextField} from '../_util/material';

import BarraAguarde from '../_util/BarraAguarde';
import Rodape from './Rodape';
import loginState from './loginState';
import './Login.scss';

let frmLogin = new AppState({ usuario: '', senha: '', processando: false });

@subscribe(frmLogin)
export default class Login extends React.Component {
	submitForm = (ev) => {
		ev.preventDefault();
		let { usuario, senha } = this.props;
		frmLogin.set({ processando: true }, () => {
			loginState.login(usuario, senha, () => {
				frmLogin.set({ usuario: '', senha: '', processando: false });
			});
		});
	}

	render() {
		let { usuario, senha, processando } = this.props;
		return (
			<div id="Login">
				<form onSubmit={this.submitForm}>
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
				<Rodape/>
			</div>
		);
	}
}
