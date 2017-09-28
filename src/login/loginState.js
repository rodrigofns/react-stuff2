import AppState from 'react-app-state';

class LoginState {
	constructor() {
		this.ourState = new AppState();
		this.ourState.set({ isLogged: false, userName: '' });
	}

	login(userName, pwd, callback) {
		this.ourState.set({ isLogged: true, userName: userName }, callback);
	}

	logoff(callback) {
		this.ourState.set({ isLogged: false, userName: '' }, callback);
	}

	subscribe(TheComponent) {
		return this.ourState.subscribe(TheComponent,
			'isLogged', 'userName');
	}
}

export default new LoginState();
