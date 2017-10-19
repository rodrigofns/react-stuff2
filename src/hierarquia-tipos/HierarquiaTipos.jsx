import React from 'react';
import {Card, TextField} from 'material-ui';
import {CircleButton, DialogInput, subscribeTo} from '_util';

import ListaTipos from './ListaTipos';
import FormTipo from './FormTipo';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import './HierarquiaTipos.sass';

@subscribeTo({ htStore })
export default class HierarquiaTipos extends React.Component {
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
					.then(this.recarregaTipos);
			}
		});
	}

	render() {
		const { htStore } = this.props;
		return (
			<div id="HierarquiaTipos">
				<Card>
					<div id="card1">
						<div id="card1Top">
							<div>
								<div id="card1Top-titulo">Tipos ({htStore.tipos.length})</div>
								<TextField fullWidth
									disabled={htStore.processando} value={htStore.filtro}
									floatingLabelText="Filtro" onChange={ev => htStore.defineFiltro(ev.target.value)}/>
							</div>
							<CircleButton icon="plus" tooltip="Novo tipo..." onClick={this.adicionaTipo}/>
						</div>
						<div>
							<ListaTipos className="listaTipos" disabled={htStore.processando}
								tipos={htStore.tiposFiltrados.slice()}
								onSelecionaTipo={idTipo => htStore.selecionaTipo(idTipo)}/>
						</div>
					</div>
				</Card>
				<div className="entreCards"></div>
				{htStore.tipoAtual ? (
					<Card>
						<FormTipo className="card2" onDeletaTipo={this.recarregaTipos}/>
					</Card>
				) : (
					<div id="card2-oculto"></div>
				)}
				<DialogInput label="Nome do tipo" ref={elem => this.dlgInput = elem}/>
			</div>
		);
	}
}
