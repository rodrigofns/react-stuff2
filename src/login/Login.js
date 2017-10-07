import React from 'react';
import {Card, RaisedButton, TextField} from '../_util/material';

import BarraAguarde from '../_util/BarraAguarde';
import authState from '../_util/authState';
import Rodape from './Rodape';
import './Login.scss';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { usuario: '', senha: '', processando: false };
	}

	submitForm = (ev) => {
		ev.preventDefault();
		this.setState({ processando: true }, () => {
			authState.login(this.state.usuario, this.state.senha)
				.catch(() => {
					this.setState({ senha: '', processando: false });
				});
		});
	}

	render() {
		let { usuario, senha, processando } = this.state;
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
									onChange={e => this.setState({ usuario: e.target.value })}
									name="login"
									floatingLabelText="Nome de usuário"/>
							</div>
							<div>
								<TextField
									name="pwd"
									disabled={processando}
									onChange={e => this.setState({ senha: e.target.value })}
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
