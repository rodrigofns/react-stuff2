import {httpSgu, globalMsgStore} from '_util';

class HttpLogin {
	login(usuario, senha) {
		return httpSgu.doPost('/auth', { usuario, senha });
	}
}

export default new HttpLogin();
