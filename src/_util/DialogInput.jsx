/**
 * Caixa de diálogo modal com um campo texto, e os botões "OK" e "Cancelar".
 */

import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'material-ui'

import {DialogBase} from './DialogBase';

export class DialogInput extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		width: PropTypes.string
	};

	dlgBase = null;
	text = '';

	show(callback) {
		this.dlgBase.show(status => {
			if (callback && status) callback(this.text);
			if (callback && !status) callback();
		});
	}

	handleKeyPress = (ev) => {
		if (ev.key === 'Enter') {
			this.dlgBase.forceClose(true);
		}
	}

	render() {
		return (
			<DialogBase width={this.props.width} okFocus={false} ref={elem => this.dlgBase = elem}>
				<TextField fullWidth autoFocus
					id="DialogInput-textField"
					floatingLabelText={this.props.label}
					onKeyPress={this.handleKeyPress}
					onChange={ev => this.text = ev.target.value}/>
			</DialogBase>
		);
	}
}
