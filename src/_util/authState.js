import AppState from 'react-app-state';

import sguHttpRequest from './sguHttpRequest';
import authToken from './authToken';

class AuthState extends AppState {
	constructor() {
		super({ isAuth: false, nomeUsuario: '' });
	}

	checkAuth() {
		return this._updateAuthStatus('/usuario', { });
	}

	login(usuario, senha) {
		return this._updateAuthStatus('/login', { usuario, senha });
	}

	logoff() {
		authToken.remove();
		super.set({ isAuth: false, nomeUsuario: '' });
		return sguHttpRequest.doPost('/logoff');
	}

	_updateAuthStatus(path, body) {
		return new Promise(resolve => {
			sguHttpRequest.doPost(path, body)
				.then(data => {
					if (data.status) {
						authToken.save(data.token);
						super.set({ isAuth: true, nomeUsuario: data.nome }, () => resolve());
					} else {
						authToken.remove();
						super.set({ isAuth: false, nomeUsuario: '' }, () => resolve());
					}
				});
		});
	}
}

export default new AuthState();
