import React from 'react';
import {Card, RaisedButton, TextField} from 'material-ui';
import {WaitBar} from '_util';

import GlobalMsg from '../_layout/GlobalMsg';
import Rodape from './Rodape';
import httpLogin from './httpLogin';
import './Login.sass';

export default class Login extends React.Component {
	state = {
		usuario: '',
		senha: '',
		processando: false
	};

	txtUsuario = null;

	submitForm = (ev) => {
		ev.preventDefault();
		this.setState({ processando: true }, () => {
			httpLogin.login(this.state.usuario, this.state.senha)
				.catch(err => {
					this.setState({
						senha: '',
						processando: false
					}, () => {
						this.txtUsuario.focus();
						this.txtUsuario.select();
					});
				});
		});
	}

	render() {
		const { usuario, senha, processando } = this.state;
		return (
			<div id="Login">
				<form onSubmit={this.submitForm}>
					<Card>
						<WaitBar show={processando}/>
						<div className="caixaLogin">
							<h2>Login</h2>
							<GlobalMsg className="msgs"/>
							<div>
								<TextField autoComplete="off" disabled={processando}
									ref={elem => this.txtUsuario = elem}
									name="login" floatingLabelText="Nome de usuário" autoFocus
									value={usuario} onChange={e => this.setState({ usuario: e.target.value })}/>
							</div>
							<div>
								<TextField name="pwd" disabled={processando}
									type="password" floatingLabelText="Senha"
									value={senha} onChange={e => this.setState({ senha: e.target.value })}/>
							</div>
							<RaisedButton secondary type="submit" label="Entrar"
								disabled={!usuario || !senha || processando}/>
						</div>
					</Card>
				</form>
				<Rodape/>
			</div>
		);
	}
}
