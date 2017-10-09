/**
 * Autenticação e dados do usuário autenticado.
 */

import {observable} from 'mobx';

import authToken from './authToken';
import {sguHttp} from './sguHttp';

class AuthStore {
	@observable isAuth = false;
	@observable nomeUsuario = '';

	checkAuth() {
		return this._updateAuthStatus('/usuario', { });
	}

	login(usuario, senha) {
		return this._updateAuthStatus('/login', { usuario, senha });
	}

	logoff() {
		authToken.remove();
		this.isAuth = false;
		this.nomeUsuario = '';
		return sguHttp.doPost('/logoff');
	}

	_updateAuthStatus(path, body) {
		// return sguHttp.doPost(path, body)
		// 	.then(data => {
		// 		if (data.status) {
		// 			authToken.save(data.token);
		// 			this.isAuth = true;
		// 			this.nomeUsuario = data.nome;
		// 		} else {
		// 			authToken.remove();
		// 			this.isAuth = false;
		// 			this.nomeUsuario = '';
		// 		}
		// 	});
		return new Promise(resolve => {
			this.isAuth = true;
			this.nomeUsuario = 'Usuário genérico';
			resolve();
		});
	}
}

export let authStore = new AuthStore();
