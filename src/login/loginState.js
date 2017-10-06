import AppState from 'react-app-state';
import sguHttpRequest from '../_util/sguHttpRequest';

class LoginState extends AppState {
	constructor() {
		super({
			estaLogado: !!localStorage.getItem('authUser'),
			usuario: localStorage.getItem('authUser')
		});
	}

	login(usuario, senha, callback) {
		sguHttpRequest.doPost('/login', { usuario, senha }, r => {
			if (r.status) {
				localStorage.setItem('authUser', usuario);
				super.set({
					estaLogado: true,
					usuario: usuario
				}, callback);
			} else {

			}
		});
	}

	logoff(callback) {
		localStorage.removeItem('authUser'); // limpa imediatamente
		super.set({
			estaLogado: false,
			usuario: ''
		}, callback);
		sguHttpRequest.doPost('/logoff');
	}
}

export default new LoginState();
