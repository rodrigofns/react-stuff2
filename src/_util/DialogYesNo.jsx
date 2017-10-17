import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class DialogYesNo extends React.Component {
	static propTypes = {
		width: PropTypes.string
	};

	static defaultProps = {
		width: '400px'
	};

	state = {
		open: false,
		body: ''
	};

	callback = null;

	show(body, callback) {
		this.callback = callback;
		this.setState({ open: true, body });
	}

	clickYes = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(true);
		});
	}

	clickNo = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(false);
		});
	}

	render() {
		return (
			<Dialog
				open={this.state.open} contentStyle={{ width: this.props.width }}
				modal={false} onRequestClose={this.clickNo}
				actions={[
					<FlatButton label="Sim" onClick={this.clickYes} primary keyboardFocused/>,
					<FlatButton label="Não" onClick={this.clickNo} secondary/>
				]}>
				{this.state.body}
			</Dialog>
		);
	}
}