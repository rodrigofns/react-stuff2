/**
 * Caixa de diálogo modal que exibe uma pergunta e os botões "OK" e "Cancelar".
 */

import React from 'react';
import PropTypes from 'prop-types';

import {DialogBase} from './DialogBase';

export class DialogOkCancel extends React.PureComponent {
	static propTypes = {
		width: PropTypes.string
	};

	static defaultProps = {
		width: '400px'
	};

	state = {
		text: ''
	};

	dlgBase = null;

	show(text, callback) {
		this.setState({ text },
			() => this.dlgBase.show(callback));
	}

	render() {
		return (
			<DialogBase width={this.props.width} ref={elem => this.dlgBase = elem}>
				<div>{this.state.text}</div>
			</DialogBase>
		);
	}
}
