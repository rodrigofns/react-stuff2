import authToken from './authToken';

const API_URL = ''; // '/sgu/api' trocar quando o servidor voltar !!!
const TOKEN_HEADER_NAME = 'Set-Token';
const AUTH_HEADER_NAME = 'Authorization';
const AUTH_HEADER_VALUE_PREFIX = 'Token ';

class SguHttpRequest {
	doGet(path) {
		return this._doRequest(path, 'GET');
	}

	doPost(path, body) {
		// return this._doRequest(path, 'POST', body);
		return this.doGet(path); // desfazer quando servidor voltar !!!
	}

	_doRequest(path, method, body) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		this._addAuthHeader(headers);

		let options = { method, headers };

		if (body && Object.keys(body).length) {
			let formData = new FormData();
			formData.append('json', JSON.stringify(body));
			options.body = formData;
		}

		return new Promise((resolve, reject) => {
			fetch(API_URL + path + '.json', options) // remover o .json quando o servidor voltar !!!
			.then(response => {
				this._saveToken(response);
				return response.json();
			})
			.then(json => resolve(json))
			.catch(err => reject(err));
		});
	}

	_addAuthHeader(headers) {
		let token = authToken.read();
		if (token) {
			headers.set(AUTH_HEADER_NAME, AUTH_HEADER_VALUE_PREFIX + token);
		}
	}

	_saveToken(response) {
		let token = response.headers.get(TOKEN_HEADER_NAME);
		if (token) {
			authToken.save(token);
		}
	}
}

export let sguHttpRequest = new SguHttpRequest();
