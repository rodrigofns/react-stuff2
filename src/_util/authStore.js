import {observable} from 'mobx';

import authToken from './authToken';
import {sguHttpRequest} from './sguHttpRequest';

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
		return sguHttpRequest.doPost('/logoff');
	}

	_updateAuthStatus(path, body) {
		return sguHttpRequest.doPost(path, body)
			.then(data => {
				if (data.status) {
					authToken.save(data.token);
					this.isAuth = true;
					this.nomeUsuario = data.nome;
				} else {
					authToken.remove();
					this.isAuth = false;
					this.nomeUsuario = '';
				}
			});
	}
}

export let authStore = new AuthStore();
