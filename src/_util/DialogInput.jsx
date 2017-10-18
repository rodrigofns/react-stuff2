import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class DialogInput extends React.PureComponent {
	static propTypes = {
		width: PropTypes.string
	};

	static defaultProps = {
		width: '400px'
	};

	state = {
		open: false,
		label: ''
	};

	text = '';
	callback = null;

	show(label, callback) {
		this.callback = callback;
		this.setState({ open: true, label });
	}

	clickYes = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(this.text);
		});
	}

	clickNo = () => {
		this.setState({ open: false }, () => {
			if (this.callback) this.callback(false);
		});
	}

	handleKeyPress = (ev) => {
		if (ev.key === 'Enter') {
			this.clickYes();
		}
	}

	render() {
		return (
			<Dialog modal={false} contentStyle={{ width: this.props.width }}
				open={this.state.open} onRequestClose={this.clickNo}
				actions={[
					<FlatButton label="OK" onClick={this.clickYes} primary/>,
					<FlatButton label="Cancelar" onClick={this.clickNo} secondary/>
				]}>
				<TextField fullWidth autoFocus
					id="DialogInput-textField"
					floatingLabelText={this.state.label}
					onKeyPress={this.handleKeyPress}
					onChange={ev => this.text = ev.target.value}/>
			</Dialog>
		);
	}
}
