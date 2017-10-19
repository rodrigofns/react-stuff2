import React from 'react';
import PropTypes from 'prop-types';

import {DialogBase} from './DialogBase';

export class DialogInfo extends React.PureComponent {
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
			<DialogBase hideCancel width={this.props.width} ref={elem => this.dlgBase = elem}>
				<div>{this.state.text}</div>
			</DialogBase>
		);
	}
}
