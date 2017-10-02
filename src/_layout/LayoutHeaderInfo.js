import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import loginState from '../login/loginState';
import './LayoutHeaderInfo.css';

const LayoutHeaderInfo = ({ usuario }) => {
	return (
		<div id="LayoutHeaderInfo-wrap">
			<div id="LayoutHeaderInfo-userInfo">{usuario}</div>
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

LayoutHeaderInfo.propTypes = {
	usuario: PropTypes.string.isRequired
};

export default loginState.subscribe(LayoutHeaderInfo);