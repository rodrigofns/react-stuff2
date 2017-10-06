const TOKEN_PROPERTY = 'auth_token_sgu';

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
