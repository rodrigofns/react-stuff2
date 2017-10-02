import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import loginState from '../login/loginState';
import './DetalhesSessao.css';

const DetalhesSessao = ({ usuario }) => {
	return (
		<div id="TopRite-wrap">
			<div id="TopRite-userInfo">{usuario}</div>
			<RaisedButton
				secondary
				id="TopRite-logoff"
				label="Logoff"
				onClick={() => {
					loginState.logoff();
				}}/>
		</div>
	);
};

DetalhesSessao.propTypes = {
	usuario: PropTypes.string.isRequired
};

export default loginState.subscribe(DetalhesSessao);
