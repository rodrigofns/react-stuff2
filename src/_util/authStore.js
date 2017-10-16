import {action, observable} from 'mobx';
import * as jwt from 'jwt-simple';

const TOKEN_PROPERTY = process.env.REACT_APP_TOKEN_PROPERTY; // veja arquivo ".env" na raiz do projeto

class AuthStore {
	@observable isAuth = false;

	@action
	checkAuth() {
		this.isAuth = !!this.getToken();
	}

	getToken() {
		return localStorage.getItem(TOKEN_PROPERTY);
	}

	@action
	saveToken(token) {
		if (token) {
			localStorage.setItem(TOKEN_PROPERTY, token);
			this.isAuth = true;
		} else {
			this.removeToken();
		}
	}

	@action
	removeToken() {
		localStorage.removeItem(TOKEN_PROPERTY);
		this.isAuth = false;
	}

	getUserInfo() {
		return this.isAuth
			? jwt.decode(this.getToken(), '', true).princ
				: null;
	}
}

export let authStore = new AuthStore();
