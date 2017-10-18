import React from 'react';
import {Checkbox, RaisedButton, TextField} from 'material-ui';
import {CircleButton, DialogYesNo, subscribeTo, Tree, WaitBar} from '_util';

import ListaFilhos from './ListaFilhos';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import './FormTipo.sass';

@subscribeTo({ htStore })
export default class FormTipo extends React.Component {
	dlg = null;

	salvaTipo = (ev) => {
		ev.preventDefault();
		htStore.processandoDados(true);
		httpHierarquiaTipos.putTipo(htStore.tipoAtual)
			.then(() => {
				htStore.atualizaArrayOriginal();
				htStore.processandoDados(false);
			});
	}

	deletaTipo = (ev) => {
		this.dlg.show(`Deseja deletar permanentemente o tipo "${htStore.tipoAtual.nome}"?`, resp => {
			if (resp) {

			}
		});
	}

	adicionaFilho = (ev) => {

	}

	render() {
		const { htStore, className } = this.props;
		return (
			<form id="FormTipo" className={className}>
				<div id="formCol1">
					<div id="formCol1-row1">
						<div>
							<Checkbox label="Ativo"
								disabled={htStore.processando} checked={htStore.tipoAtual.ativo}
								onCheck={() => htStore.alteraTipoAtual({ ativo: !htStore.tipoAtual.ativo })}/>
						</div>
						<div>
							<CircleButton icon="trash-o" tooltip="Deletar este tipo" onClick={this.deletaTipo}/>
						</div>
					</div>
					<div>
						<TextField floatingLabelText="Nome do tipo"
							disabled={htStore.processando} value={htStore.tipoAtual.nome}
							onChange={ev => htStore.alteraTipoAtual({ nome: ev.target.value })}/>
					</div>
					<div>
						<TextField floatingLabelText="Descrição do tipo"
							disabled={htStore.processando} value={htStore.tipoAtual.descricao}
							onChange={ev => htStore.alteraTipoAtual({ descricao: ev.target.value })}/>
					</div>
					<div>
						<CircleButton className="btnAdiciona" icon="plus" tooltip="Adicionar filho..." onClick={this.adicionaFilho}/>
						<div className="tituloCampo">Filhos do tipo ({htStore.tipoAtual.filhos.length})</div>
						<ListaFilhos className="listaFilhos"/>
					</div>
				</div>
				<div id="formCol2">
					<div>Visualização da hierarquia completa</div>
					<Tree className="arvore" rootNode={htStore.tipoAtualComFilhos}
						nameField="nome" childrenField="filhos"/>
					<div id="finalButtons">
						<WaitBar show={htStore.processando}/>
						<RaisedButton primary type="submit" label="Salvar"
							disabled={htStore.processando} onClick={this.salvaTipo}/>
					</div>
				</div>
				<DialogYesNo ref={elem => this.dlg = elem}/>
			</form>
		);
	}
}