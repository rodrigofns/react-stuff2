/**
 * Autenticação e dados do usuário autenticado.
 */

import {observable} from 'mobx';

import authToken from './authToken';
import {httpSgu} from './httpSgu';

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
		return httpSgu.doPost('/logoff');
	}

	_updateAuthStatus(path, body) {
		// return httpSgu.doPost(path, body)
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
