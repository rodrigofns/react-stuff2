import {action, computed, observable} from 'mobx';

class HierarquiaTiposStore {
	@observable tipos = [];
	@observable filtro = '';
	@observable tipoAtual = null; // clone do objeto

	@action
	carregaTipos(tipos) {
		this.tipos = tipos;
		this.tipoAtual = null;
	}

	@action
	filtra(texto) {
		this.filtro = texto;
	}

	@action
	selecionaTipo(idTipo) {
		if (idTipo) {
			let tipo = this.tipos.find(t => t.id === idTipo);
			this.tipoAtual = {...tipo};
		} else {
			this.tipoAtual = null;
		}
	}

	@computed
	get tipoAtualComFilhos() {
		let tipo = {...this.tipoAtual};
		tipo.filhos = [...tipo.filhos];
		let preencheFilhos = (t) => {
			for (let i = 0; i < t.filhos.length; ++i) {
				let idFilho = t.filhos[i];
				let filho = this.tipoPorId(idFilho);
				t.filhos[i] = {
					id: idFilho,
					nome: filho.nome,
					filhos: [...filho.filhos]
				};
				preencheFilhos(t.filhos[i]);
			}
		};
		preencheFilhos(tipo);
		return tipo;
	}

	tipoPorId(idTipo) {
		return this.tipos.find(t => t.id === idTipo);
	}
}

export default new HierarquiaTiposStore();
