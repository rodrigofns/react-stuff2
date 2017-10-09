import {httpSgu} from '_util';

class HttpDashboard {
	orgaosFederais() {
		return httpSgu.doGet('/dashboard/justicaFederal')
			.then(dados =>
				dados.filter(d => d.municipio) // remove órgãos com município null
					.map(d => ({ regiao: 'trf'+d.regiaoFederal, ...d }))
			);
	}
}

export default new HttpDashboard();
