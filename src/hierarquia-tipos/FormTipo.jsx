import React from 'react';
import {Checkbox, TextField} from 'material-ui';
import {subscribeTo, Tree} from '_util';

import ListaFilhos from './ListaFilhos';
import htStore from './hierarquiaTiposStore';
import './FormTipo.sass';

const FormTipo = ({ htStore, className }) => (
	<div id="FormTipo" className={className}>
		<div id="formCol1">
			<div>
				<Checkbox label="Ativo" checked={htStore.tipoAtual.ativo}/>
			</div>
			<div>
				<TextField value={htStore.tipoAtual.nome} floatingLabelText="Nome do tipo"/>
			</div>
			<div>
				<TextField value={htStore.tipoAtual.descricao} floatingLabelText="Descrição do tipo"/>
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
		</div>
	</div>
);

export default subscribeTo({ htStore })(FormTipo);
