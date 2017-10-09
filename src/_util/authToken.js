/**
 * Armazenamento do token JWT no cliente.
 */

const TOKEN_PROPERTY = process.env.REACT_APP_TOKEN_PROPERTY; // veja arquivo ".env" na raiz do projeto

class AuthToken {
	save(token) {
		localStorage.setItem(TOKEN_PROPERTY, token);
	}

	read() {
		localStorage.getItem(TOKEN_PROPERTY);
	}

	hasToken() {
		return !!this.read();
	}

	remove() {
		localStorage.removeItem(TOKEN_PROPERTY);
	}
}

export default new AuthToken();
