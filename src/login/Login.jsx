import React from 'react';
import {Card, RaisedButton, TextField} from 'material-ui';
import {httpSgu, BarraAguarde} from '_util';

import Rodape from './Rodape';
import './Login.sass';

export default class Login extends React.Component {
	state = {
		usuario: '',
		senha: '',
		processando: false
	};

	submitForm = (ev) => {
		ev.preventDefault();
		this.setState({ processando: true }, () => {
			httpSgu.doPost('/login', {
				usuario: this.state.usuario,
				senha: this.state.senha
			}).catch(() => {
				this.setState({
					senha: '',
					processando: false
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
						<BarraAguarde visivel={processando}/>
						<div className="caixaLogin">
							<h2>Login</h2>
							<div>
								<TextField autoComplete="off" disabled={processando}
									name="login" floatingLabelText="Nome de usuário" autoFocus
									onChange={e => this.setState({ usuario: e.target.value })}/>
							</div>
							<div>
								<TextField name="pwd" disabled={processando}
									type="password" floatingLabelText="Senha"
									onChange={e => this.setState({ senha: e.target.value })}/>
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
