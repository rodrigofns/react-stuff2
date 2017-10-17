import axios from 'axios';
import {authStore} from './authStore';
import {globalMsgStore} from './globalMsgStore';

const API_URL = process.env.REACT_APP_API_URL; // veja arquivo ".env" na raiz do projeto
const TOKEN_HEADER_NAME = 'set-token';
const EXPIRED_HEADER_NAME = 'sessao-expirada';
const AUTH_HEADER_NAME = 'Authorization';
const AUTH_HEADER_VALUE_PREFIX = 'Token ';

class HttpSgu {
	doGet(path) {
		return this._doRequest(path, 'GET');
	}

	doPost(path, body) {
		return this._doRequest(path, 'POST', body);
	}

	doPut(path, body) {
		return this._doRequest(path, 'PUT', body);
	}

	doDelete(path) {
		return this._doRequest(path, 'DELETE');
	}

	_doRequest(path, method, body) {
		let headers = { 'Content-Type': 'application/json' };
		this._addToken(headers);

		return new Promise((resolve, reject) => {
			return axios({
				method: method,
				url: API_URL + path,
				headers: headers,
				data: body
			}).then(response => {
				if (path === '/auth') {
					globalMsgStore.clear(); // ao logar, todas as mensagens de erro são limpas
				}
				if (!this._handleExpired(response)) {
					this._saveToken(response); // sempre salva o token JWT a cada requisição
					resolve(response.data);
				}
			}).catch(err => reject(this._handleError(err)));
		});
	}

	_addToken(headers) {
		let token = authStore.getToken();
		if (token) {
			headers[AUTH_HEADER_NAME] = AUTH_HEADER_VALUE_PREFIX + token;
		}
	}

	_saveToken(response) {
		let token = response.headers[TOKEN_HEADER_NAME];
		authStore.saveToken(token);
	}

	_handleExpired(response) {
		if (response.headers[EXPIRED_HEADER_NAME]) {
			globalMsgStore.add('Sua sessão expirou.');
			authStore.removeToken(); // vai para a página de login imediatamente
			return true;
		}
		return false;
	}

	_handleError(err) {
		if (err.response) { // servidor respondeu com um status de erro
			globalMsgStore.add(`${err.response.status}: ${err.response.statusText} - ${err.response.data}`);
			console.error('SGU', err.response);
		} else if (err.request) { // nenhuma resposta recebida do servidor
			console.error('SGU', err.response);
		} else { // outro erro
			console.error('SGU', err);
		}
		return err;
	}
}

export let httpSgu = new HttpSgu();
