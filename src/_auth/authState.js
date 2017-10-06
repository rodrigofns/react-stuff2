import AppState from 'react-app-state';

import sguHttpRequest from './sguHttpRequest';
import authToken from './authToken';

class AuthState extends AppState {
	constructor() {
		super({ isAuth: false, nomeUsuario: '' });
	}

	checkAuth() {
		return new Promise((resolve, reject) => {
			sguHttpRequest.doPost('/usuario')
				.then(data => this._updateAuthStatus(data, () => resolve(data)))
				.catch(err => this._updateAuthStatus(err, () => reject(err)));
		});
	}

	login(usuario, senha) {
		return new Promise((resolve, reject) => {
			sguHttpRequest.doPost('/login', { usuario, senha })
				.then(data => this._updateAuthStatus(data, () => resolve(data)))
				.catch(err => this._updateAuthStatus(err, () => reject(err)));
		});
	}

	logoff() {
		authToken.remove();
		super.set({ isAuth: false, nomeUsuario: '' });
		return sguHttpRequest.doPost('/logoff');
	}

	_updateAuthStatus(data, callback) {
		if (data.status) {
			authToken.save(data.token);
			super.set({ isAuth: true, nomeUsuario: data.nome }, callback);
		} else {
			authToken.remove();
			super.set({ isAuth: false, nomeUsuario: '' }, callback);
		}
	}
}

export default new AuthState();
