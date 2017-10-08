import React from 'react';
import {Card, RaisedButton, TextField} from 'material-ui';
import {useProp, authStore, BarraAguarde} from '_util';

import Rodape from './Rodape';
import './Login.scss';

@useProp({ authStore })
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { usuario: '', senha: '', processando: false };
	}

	submitForm = (ev) => {
		ev.preventDefault();
		this.setState({ processando: true }, () => {
			authStore.login(this.state.usuario, this.state.senha)
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
								disabled={(!usuario || !usuario.length) || (!senha || !senha.length) || processando}/>
						</div>
					</Card>
				</form>
				<Rodape/>
			</div>
		);
	}
}
