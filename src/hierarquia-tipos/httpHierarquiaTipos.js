import {httpSgu} from '_util';

class HttpHierarquiaTipos {
	getTipos() {
		return httpSgu.doGet('/tipo-unidade');
	}

	putTipo(tipo) {
		return httpSgu.doPut('/tipo-unidade', tipo);
	}
}

export default new HttpHierarquiaTipos();
