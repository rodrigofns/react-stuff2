import React from 'react';
import PropTypes from 'prop-types';
import {DialogBase} from '_util';

import ListaTipos from './ListaTipos';
import css from './AdicionaFilho.module.css';

export default class AdicionaFilho extends React.PureComponent {
	static propTypes = {
		tipos: PropTypes.array.isRequired
	};

	dlgBase = null;
	idTipo = null;

	show(callback) {
		this.dlgBase.show(resp => {
			if (resp) {
				callback(this.idTipo);
			}
		});
	}

	render() {
		return (
			<DialogBase okFocus={false} width="310px" ref={elem => this.dlgBase = elem}>
				<div className={css.titulo}>Adicionar tipo filho</div>
				<ListaTipos tipos={this.props.tipos}
					onSelecionaTipo={idTipo => this.idTipo = idTipo}/>
			</DialogBase>
		);
	}
}
