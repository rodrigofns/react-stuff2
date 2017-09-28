import AppState from 'react-app-state';

class LoginState {
	constructor() {
		this.ourState = new AppState();
		this.ourState.set({
			estaLogado: !!localStorage.getItem('authUser'),
			usuario: localStorage.getItem('authUser')
		});
	}

	login(usuario, senha, callback) {
		localStorage.setItem('authUser', usuario);
		this.ourState.set({
			estaLogado: true,
			usuario: usuario
		}, callback);
	}

	logoff(callback) {
		localStorage.removeItem('authUser');
		this.ourState.set({
			estaLogado: false,
			usuario: ''
		}, callback);
	}

	subscribe(TheComponent, ...vars) {
		return this.ourState.subscribe(TheComponent, ...vars);
	}
}

export default new LoginState();
