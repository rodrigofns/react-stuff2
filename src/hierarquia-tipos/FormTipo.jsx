import React from 'react';
import {Checkbox, RaisedButton, TextField} from 'material-ui';
import {subscribeTo, Tree, WaitBar} from '_util';

import ListaFilhos from './ListaFilhos';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import './FormTipo.sass';

const FormTipo = ({ htStore, className }) => (
	<form id="FormTipo" className={className}>
		<div id="formCol1">
			<div>
				<Checkbox label="Ativo"
					disabled={htStore.processando}
					checked={htStore.tipoAtual.ativo}
					onCheck={() => htStore.alteraTipoAtual({ ativo: !htStore.tipoAtual.ativo })}/>
			</div>
			<div>
				<TextField floatingLabelText="Nome do tipo"
					disabled={htStore.processando}
					value={htStore.tipoAtual.nome}
					onChange={ev => htStore.alteraTipoAtual({ nome: ev.target.value })}/>
			</div>
			<div>
				<TextField floatingLabelText="Descrição do tipo"
					disabled={htStore.processando}
					value={htStore.tipoAtual.descricao}
					onChange={ev => htStore.alteraTipoAtual({ descricao: ev.target.value })}/>
			</div>
			<div>
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
					disabled={htStore.processando}
					onClick={ev => {
						ev.preventDefault();
						htStore.processandoDados(true);
						httpHierarquiaTipos.putTipo(htStore.tipoAtual)
							.then(() => {
								htStore.atualizaArrayOriginal();
								htStore.processandoDados(false);
							});
					}}/>
			</div>
		</div>
	</form>
);

export default subscribeTo({ htStore })(FormTipo);
