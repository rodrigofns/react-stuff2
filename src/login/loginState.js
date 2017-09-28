import AppState from 'react-app-state';

class LoginState {
	constructor() {
		this.ourState = new AppState();
		this.ourState.set({
			isLogged: !!localStorage.getItem('authUser'),
			userName: localStorage.getItem('authUser')
		});
	}

	login(userName, pwd, callback) {
		localStorage.setItem('authUser', userName);
		this.ourState.set({ isLogged: true, userName: userName }, callback);
	}

	logoff(callback) {
		localStorage.removeItem('authUser');
		this.ourState.set({ isLogged: false, userName: '' }, callback);
	}

	subscribe(TheComponent, ...vars) {
		return this.ourState.subscribe(TheComponent, ...vars);
	}
}

export default new LoginState();
