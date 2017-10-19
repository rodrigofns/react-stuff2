import React from 'react';
import PropTypes from 'prop-types'
import {Snackbar} from "material-ui";

export class Toast extends React.Component {
	static propTypes = {
		duration: PropTypes.number
	};

	static defaultProps = {
		duration: 3000
	};

	state = {
		open: false
	};

	text = '';

	show(text) {
		this.text = text;
		this.setState({ open: true });
	}

	render() {
		return (
			<Snackbar open={this.state.open} autoHideDuration={this.props.duration}
				message={this.text} onRequestClose={() => this.setState({ open: false })}/>
		);
	}
}
