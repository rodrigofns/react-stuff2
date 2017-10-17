import React from 'react';
import {Card, TextField} from 'material-ui';
import {subscribeTo} from '_util';

import ListaTipos from './ListaTipos';
import FormTipo from './FormTipo';
import htStore from './hierarquiaTiposStore';
import httpHierarquiaTipos from './httpHierarquiaTipos';
import './HierarquiaTipos.sass';

@subscribeTo({ htStore })
export default class HierarquiaTipos extends React.Component {
	componentWillMount() {
		htStore.carregaTipos([]);
		htStore.selecionaTipo(null);
	}

	componentDidMount() {
		httpHierarquiaTipos.getTipos()
			.then(tipos => htStore.carregaTipos(tipos));
	}

	render() {
		let { htStore } = this.props;

		return (
			<div id="HierarquiaTipos">
				<Card>
					<div id="card1">
						<div>Tipos ({htStore.tipos.length})</div>
						<div>
							<TextField fullWidth
								value={htStore.filtro}
								onChange={ev => htStore.filtra(ev.target.value)}
								floatingLabelText="Filtro"/>
						</div>
						<div>
						<ListaTipos/>
						</div>
					</div>
				</Card>
				<div className="entreCards"></div>
				{htStore.tipoAtual ? (
					<Card>
						<FormTipo className="card2"/>
					</Card>
				) : (
					<div id="card2-oculto"></div>
				)}
			</div>
		);
	}
}
