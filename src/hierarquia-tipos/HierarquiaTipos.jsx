import React from 'react';
import {Card, TextField} from 'material-ui';
import {CircleButton, DialogInput, subscribeTo, Toast} from '_util';

import ListaTipos from './ListaTipos';
import FormTipo from './FormTipo';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import css from './HierarquiaTipos.module.css';

@subscribeTo({ htStore })
export default class HierarquiaTipos extends React.Component {
	toast = null;
	dlgInput = null;

	componentWillMount() {
		htStore.carregaTipos([]);
		htStore.selecionaTipo(null);
	}

	componentDidMount() {
		this.recarregaTipos();
	}

	recarregaTipos = () => {
		htStore.carregaTipos([]); // limpa para recarregar tudo
		httpHierarquiaTipos.listaTipos()
			.then(tipos => htStore.carregaTipos(tipos));
	}

	adicionaTipo = (ev) => {
		this.dlgInput.show(nome => {
			if (nome) {
				httpHierarquiaTipos.criaTipo(nome)
					.then(() => {
						this.recarregaTipos();
						this.toast.show('Tipo adicionado.');
					});
			}
		});
	}

	tipoFoiDeletado = (ev) => {
		this.recarregaTipos();
		this.toast.show('Tipo deletado.');
	}

	render() {
		const { htStore } = this.props;
		return (
			<div className={css.wrap}>
				<Card>
					<div className={css.card1}>
						<div className={css.card1Top}>
							<div>
								<div className={css.card1TopTitulo}>Tipos ({htStore.tipos.length})</div>
								<TextField fullWidth
									disabled={htStore.processando} value={htStore.filtro}
									floatingLabelText="Filtro" onChange={ev => htStore.defineFiltro(ev.target.value)}/>
							</div>
							<CircleButton icon="plus" tooltip="Novo tipo..."
								disabled={htStore.tipoAtualMudou} onClick={this.adicionaTipo}/>
						</div>
						<div>
							<ListaTipos className={css.listaTipos}
								disabled={htStore.processando || htStore.tipoAtualMudou}
								tipos={htStore.tiposFiltrados.slice()}
								onSelecionaTipo={idTipo => htStore.selecionaTipo(idTipo)}/>
						</div>
					</div>
				</Card>
				<div className={css.entreCards}></div>
				{htStore.tipoAtual ? (
					<Card>
						<FormTipo className={css.card2} onDeletaTipo={this.tipoFoiDeletado}/>
					</Card>
				) : (
					<div className={css.card2Oculto}></div>
				)}
				<Toast ref={elem => this.toast = elem}/>
				<DialogInput label="Nome do tipo" ref={elem => this.dlgInput = elem}/>
			</div>
		);
	}
}
