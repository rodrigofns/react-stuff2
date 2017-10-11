import {httpSgu, removeAcentos} from '_util';

class HttpDashboard {
	getOrgaosFederais() {
		return httpSgu.doGet('/dashboard/justicaFederal')
			.then(dados =>
				dados.filter(d => d.municipio) // remove órgãos com município null
					.map(d => ({ regiao: 'trf'+d.regiaoFederal, ...d }))
			);
	}

	getAbrangenciaFederal(idOrgao) {
		return httpSgu.doGet(`/dashboard/justicaFederal/${idOrgao}/abrangencia`)
			.then(dados => {
				[dados.unidadesPGFN,
					dados.orgaosJusticaEleitoral,
					dados.orgaosJusticaTrabalhista,
					dados.municipios
				].forEach(arr => { // ordena cada array alfabeticamente
					arr.sort((a, b) => removeAcentos(a.nome) < removeAcentos(b.nome) ? -1 : 1);
				});
				return dados;
			});
	}
}

export default new HttpDashboard();
