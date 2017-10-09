/**
 * Base para todas as requisições HTTP.
 */

import axios from 'axios';
import authToken from './authToken';

const API_URL = process.env.REACT_APP_API_URL; // veja arquivo ".env" na raiz do projeto
const TOKEN_HEADER_NAME = 'Set-Token';
const AUTH_HEADER_NAME = 'Authorization';
const AUTH_HEADER_VALUE_PREFIX = 'Token ';

class SguHttp {
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
		return this._doRequest(path, 'PUT');
	}

	_doRequest(path, method, body) {
		let headers = { 'Content-Type': 'application/json' };
		this._addAuthHeader(headers);

		return axios({
			method: method,
			url: API_URL + path,
			headers: headers,
			data: body
		}).then(resp => resp.data)
			.catch(err => console.error(err)); // TODO: tratamento de erro
	}

	_addAuthHeader(headers) {
		let token = authToken.read();
		if (token) {
			headers[AUTH_HEADER_NAME] = AUTH_HEADER_VALUE_PREFIX + token;
		}
	}

	_saveToken(response) {
		let token = response.headers.get(TOKEN_HEADER_NAME);
		if (token) {
			authToken.save(token);
		}
	}
}

export let sguHttp = new SguHttp();
