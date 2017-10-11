import React from 'react';
import PropTypes from 'prop-types';

export default class Detalhes extends React.Component {
	static propTypes = {
		idArea: PropTypes.string
	};

	render() {
		return !this.props.idArea ? null : (
			<div>{this.props.idArea}</div>
		);
	}
}
