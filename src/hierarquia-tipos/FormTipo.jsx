import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import {Checkbox, RaisedButton, TextField} from 'material-ui';
import {CircleButton, DialogInfo, DialogOkCancel, subscribeTo, Toast, Tree, WaitBar} from '_util';

import ListaFilhos from './ListaFilhos';
import AdicionaFilho from './AdicionaFilho';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import css from './FormTipo.module.css';

@subscribeTo({ htStore })
export default class FormTipo extends React.Component {
	static propTypes = {
		onDeletaTipo: PropTypes.func.isRequired
	};

	toast = null;
	dlgOkCanc = null;
	dlgInfo = null;
	dlgAdicionaFilho = null;

	deletaTipo = (ev) => {
		this.dlgOkCanc.show(`Deseja deletar permanentemente o tipo "${htStore.tipoAtual.nome}"?`,
			resp => {
				if (resp) {
					httpHierarquiaTipos.deletaTipo(htStore.tipoAtual.id)
						.then(this.props.onDeletaTipo);
				}
			});
	}

	adicionaFilho = (ev) => {
		this.dlgAdicionaFilho.show(idTipo => {
			let res = htStore.adicionaFilho(idTipo);
			if (!res.status) {
				this.dlgInfo.show(res.msg);
			} else {
				this.toast.show('Filho adicionado.');
			}
		});
	}

	salvaTipo = (ev) => {
		ev.preventDefault();
		htStore.processandoDados(true);
		httpHierarquiaTipos.salvaTipo(htStore.tipoAtual)
			.then(() => {
				htStore.replicaTipoAtualNoArrayOriginal();
				htStore.processandoDados(false);
				this.toast.show('Alterações salvas.');
			});
	}

	descartaAlteracoes = (ev) => {
		this.dlgOkCanc.show(`Deseja descartar as alterações feitas no tipo "${htStore.tipoAtual.nome}"?`,
			resp => {
				if (resp) {
					htStore.descartaAlteracoesDoTipoAtual();
					this.toast.show('Alterações descartadas.');
				}
			});
	}

	render() {
		const { htStore, className } = this.props;
		return (
			<form className={classes(css.formTipo, className)}>
				<div className={css.col1}>
					<div className={css.col1Row1}>
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
						<CircleButton className={css.btnAdicionaFilho} icon="plus"
							tooltip="Adicionar filho..." onClick={this.adicionaFilho}/>
						<div className={css.tituloCampo}>Filhos do tipo ({htStore.tipoAtual.filhos.length})</div>
						<ListaFilhos className={css.listaFilhos}/>
					</div>
				</div>
				<div className={css.col2}>
					<div>Visualização da hierarquia completa</div>
					<Tree className={css.arvore} rootNode={htStore.tipoAtualComFilhos}
						nameField="nome" childrenField="filhos"/>
					<div className={css.botoesFinais}>
						<WaitBar show={htStore.processando}/>
						<RaisedButton primary type="submit" label="Salvar"
							disabled={htStore.processando || !htStore.tipoAtualMudou}
							onClick={this.salvaTipo}/>{' '}
						<RaisedButton type="button" label="Descartar alterações"
							disabled={htStore.processando || !htStore.tipoAtualMudou}
							onClick={this.descartaAlteracoes}/>
					</div>
				</div>
				<Toast ref={elem => this.toast = elem}/>
				<DialogOkCancel ref={elem => this.dlgOkCanc = elem}/>
				<DialogInfo ref={elem => this.dlgInfo = elem}/>
				<AdicionaFilho tipos={htStore.tipos.slice()} ref={elem => this.dlgAdicionaFilho = elem}/>
			</form>
		);
	}
}
