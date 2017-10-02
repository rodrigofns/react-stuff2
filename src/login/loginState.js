import AppState from 'react-app-state';

class LoginState extends AppState {
	constructor() {
		super({
			estaLogado: !!localStorage.getItem('authUser'),
			usuario: localStorage.getItem('authUser')
		});
	}

	login(usuario, senha, callback) {
		localStorage.setItem('authUser', usuario);
		super.set({
			estaLogado: true,
			usuario: usuario
		}, callback);
	}

	logoff(callback) {
		localStorage.removeItem('authUser');
		super.set({
			estaLogado: false,
			usuario: ''
		}, callback);
	}
}

export default new LoginState();
