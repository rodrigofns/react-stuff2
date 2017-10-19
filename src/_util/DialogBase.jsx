import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class DialogBase extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		okFocus: PropTypes.bool,
		hideCancel: PropTypes.bool,
		width: PropTypes.string
	};

	static defaultProps = {
		okFocus: true,
		hideCancel: false,
		width: '400px'
	};

	state = {
		open: false
	};

	callback = null;

	show(callback) {
		this.callback = callback;
		this.setState({ open: true });
	}

	forceClose(ok = true) {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(ok);
		});
	}

	clickOk = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(true);
		});
	}

	clickCancel = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(false);
		});
	}

	render() {
		const buttons = [
			<FlatButton label="OK" onClick={this.clickOk} primary keyboardFocused={this.props.okFocus}/>
		];
		if (!this.props.hideCancel) {
			buttons.push(
				<FlatButton label="Cancelar" onClick={this.clickCancel} secondary/>
			);
		}

		return (
			<Dialog modal={false} contentStyle={{ width: this.props.width }}
				open={this.state.open} onRequestClose={this.clickCancel} actions={buttons}>
				{this.props.children}
			</Dialog>
		);
	}
}
