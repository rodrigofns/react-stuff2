import AppState from 'react-app-state';
import sguRequest from '../_util/sguRequest';

class LoginState extends AppState {
	constructor() {
		super({
			estaLogado: !!localStorage.getItem('authUser'),
			usuario: localStorage.getItem('authUser')
		});
	}

	login(usuario, senha, callback) {
		sguRequest.doPost('/login', { usuario, senha }, r => {
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
		sguRequest.doPost('/logoff');
	}
}

export default new LoginState();
