import axios from 'axios';
import {authStore} from './authStore';
import {globalMsgStore} from './globalMsgStore';

const API_URL = process.env.REACT_APP_API_URL; // veja arquivo ".env" na raiz do projeto
const TOKEN_HEADER_NAME = 'set-token';
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

		return axios({
			method: method,
			url: API_URL + path,
			headers: headers,
			data: body
		}).then(resp => {
			this._saveToken(resp); // sempre salva o token JWT a cada requisição
			return resp.data;
		}).catch(err => {
			this._handleError(err);
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

	_handleError(err) {
		// authStore.removeToken();
		if (err.response) { // servidor respondeu com um status de erro
			globalMsgStore.msgs.push(`${err.response.status}: ${err.response.statusText} - ${err.response.data}`);
			console.error('SGU', err.response);
			throw err;
		} else if (err.request) { // nenhuma resposta recebida do servidor
			console.error('SGU', err.response);
		} else { // outro erro
			console.error('SGU', err);
		}
	}
}

export let httpSgu = new HttpSgu();
