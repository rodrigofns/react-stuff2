import {httpSgu} from '_util';

class HttpHierarquiaTipos {
	listaTipos() {
		return httpSgu.doGet('/tipo-unidade');
	}

	salvaTipo(tipo) {
		return httpSgu.doPut('/tipo-unidade', tipo);
	}

	criaTipo(nome) {
		let tipoSemId = {
			nome: nome,
			descricao: '',
			ativo: true,
			filhos: []
		};
		return httpSgu.doPost('/tipo-unidade', tipoSemId);
	}

	deletaTipo(idTipo) {
		return httpSgu.doDelete(`/tipo-unidade/${idTipo}`);
	}
}

export default new HttpHierarquiaTipos();
