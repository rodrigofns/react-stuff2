import {action, computed, observable, isObservableArray} from 'mobx';

import {removeAcentos} from '_util';

class HierarquiaTiposStore {
	@observable tipos = [];
	@observable filtro = '';
	@observable tipoAtual = null; // clone do objeto atualmente selecionado
	@observable processando = false; // flag que indica que uma chamada ao servidor está em curso

	@action
	processandoDados(v) {
		this.processando = v;
	}

	@action
	carregaTipos(tipos) {
		this.tipos = tipos;
		this.tipoAtual = null;
	}

	@action
	defineFiltro(texto) {
		this.filtro = texto; // filtra os tipos exibidos na lista
	}

	@action
	selecionaTipo(idTipo) {
		if (idTipo) {
			// Clona-se o tipo do array, este clone pode
			// ser alterado sem mexer no original.
			let tipo = this.tipos.find(t => t.id === idTipo);
			this.tipoAtual = {...tipo};
			this.tipoAtual.filhos = [...this.tipoAtual.filhos];
		} else {
			this.tipoAtual = null;
		}
	}

	@action
	replicaTipoAtualNoArrayOriginal() {
		// Após as alterações no tipo clonado serem encerradas, o
		// array original é atualizado. Isto mantém a consistência
		// da página sem precisar recarregá-la.
		let idx = this.tipos.findIndex(t => t.id === this.tipoAtual.id);
		this.tipos[idx] = {...this.tipoAtual};
		this.tipos[idx].filhos = [...this.tipoAtual.filhos];
	}

	@action
	alteraTipoAtual(propriedades) {
		// Modifica uma ou mais propriedades no tipo clonado.
		if (this.tipoAtual) {
			for (const p of Object.keys(propriedades)) {
				this.tipoAtual[p] = propriedades[p];
			}
		}
	}

	@action
	descartaAlteracoesDoTipoAtual() {
		this.selecionaTipo(this.tipoAtual.id);
	}

	@action
	moveFilhoAcima(idx) {
		this.tipoAtual.filhos.splice(idx - 1, 0, this.tipoAtual.filhos.splice(idx, 1)[0]);
	}

	@action
	moveFilhoAbaixo(idx) {
		this.tipoAtual.filhos.splice(idx + 1, 0, this.tipoAtual.filhos.splice(idx, 1)[0]);
	}

	@action
	removeFilho(idx) {
		this.tipoAtual.filhos.splice(idx, 1);
	}

	@action
	adicionaFilho(idTipo) {
		const possuiReferenciaCircular = (idNovoFilho) => {
			if (idNovoFilho === this.tipoAtual.id) return true;
			let novoFilho = this.tipos.find(t => t.id === idNovoFilho);
			for (let i = 0; i < novoFilho.filhos.length; ++i) {
				if (novoFilho.filhos[i] === this.tipoAtual.id ||
					possuiReferenciaCircular(novoFilho.filhos[i])) return true;
			}
			return false;
		};
		if (!!this.tipoAtual.filhos.find(idFilho => idFilho === idTipo)) {
			let filhoExist = this.tipos.find(t => t.id === idTipo);
			return {
				status: false,
				msg: `O tipo "${filhoExist.nome}" já é filho.`
			};
		} else if (possuiReferenciaCircular(idTipo)) {
			let filhoCirc = this.tipos.find(t => t.id === idTipo);
			return {
				status: false,
				msg: `O tipo "${filhoCirc.nome}" não pode ser incluído como filho, ` +
					'pois gera uma referência circular.'
			};
		} else {
			this.tipoAtual.filhos.push(idTipo);
			return { status: true };
		}
	}

	@computed
	get tipoAtualComFilhos() {
		// Os filhos do tipo são um simples array com os IDs,
		// este método retorna um clone do tipo com os filhos
		// preenchidos. Isto é usado para montar a árvore.
		if (this.tipoAtual) {
			let tipo = {...this.tipoAtual};
			tipo.filhos = [...tipo.filhos];
			let preencheFilhos = (t) => {
				for (let i = 0; i < t.filhos.length; ++i) {
					let idFilho = t.filhos[i];
					let filho = this.tipos.find(t => t.id === idFilho);
					t.filhos[i] = {
						id: idFilho, // demais propriedades não são usadas
						nome: filho.nome,
						filhos: [...filho.filhos]
					};
					preencheFilhos(t.filhos[i]);
				}
			};
			preencheFilhos(tipo);
			return tipo;
		}
		return null; // não há tipo atualmente selecionado
	}

	@computed
	get tiposFiltrados() {
		if (this.filtro) {
			return this.tipos.filter(t =>
				removeAcentos(t.nome).toLowerCase()
					.indexOf(removeAcentos(this.filtro).toLowerCase()) !== -1);
		} else {
			return this.tipos;
		}
	}

	@computed
	get tipoAtualMudou() {
		// Compara o tipo atualmente selecionado com o original.
		if (this.tipoAtual) {
			let tipoOrig = this.tipos.find(t => t.id === this.tipoAtual.id);
			for (let k of Object.keys(this.tipoAtual)) {
				if (!isObservableArray(tipoOrig[k]) && tipoOrig[k] !== this.tipoAtual[k]) {
					return true;
				}
			}
			if (tipoOrig.filhos.length !== this.tipoAtual.filhos.length) {
				return true;
			}
			for (let i = 0; i < tipoOrig.filhos.length; ++i) {
				if (tipoOrig.filhos[i] !== this.tipoAtual.filhos[i]) {
					return true;
				}
			}
		}
		return false;
	}
}

export default new HierarquiaTiposStore();
