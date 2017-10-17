import {httpSgu} from '_util';

class HttpHierarquiaTipos {
	getTipos() {
		return httpSgu.doGet('/tipo-unidade');
	}
}

export default new HttpHierarquiaTipos();
