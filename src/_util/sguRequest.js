const noop = () => { };

class SguRequest {
	doGet(url, callback) {
		this._requisita(url, 'GET', callback);
	}

	// doPost(url, dados, callback) {
	// 	this._requisita(url, 'POST', callback);
	// }

	doPost(url, dados, callback) {
		console.log('doPost() recebeu...', dados);
		setTimeout(() => callback ? callback({ status: true }) : noop, 1000);
	}

	_requisita(url, metodo, callback, dados = { }) {
		let opcoes = { method: metodo, redirect: 'follow' };
		if (Object.keys(dados).length) {
			let formData = new FormData();
			formData.append('json', JSON.stringify(dados));
			opcoes.body = formData;
		}
		fetch(url, opcoes)
			.then(response => response.json())
			.then(d => callback ? callback(d) : noop)
			.catch(err => console.log(err));
	}
}

export default new SguRequest();
