import {action, computed, observable} from 'mobx';

class HierarquiaTiposStore {
	@observable tipos = [];
	@observable filtro = '';
	@observable tipoAtual = null; // clone do objeto atualmente selecionado
	@observable processando = false;

	@action
	carregaTipos(tipos) {
		this.tipos = tipos;
		this.tipoAtual = null;
	}

	@action
	filtra(texto) {
		// O filtro é simplesmente guardado aqui, a
		// filtragem da lista acontece no componente.
		this.filtro = texto;
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
	atualizaArrayOriginal() {
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

	@action
	processandoDados(v) {
		this.processando = v; // seta o flag observado pelos componentes
	}
}

export default new HierarquiaTiposStore();
