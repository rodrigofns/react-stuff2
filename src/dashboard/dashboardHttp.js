import {sguHttp} from '_util';

class DashboardHttp {
	orgaosFederais() {
		return sguHttp.doGet('/dashboard/justicaFederal')
			.then(dados =>
				dados.filter(d => d.municipio) // remove órgãos com município null
					.map(d => ({ regiao: 'trf'+d.regiaoFederal, ...d }))
			);
	}
}

export default new DashboardHttp();
