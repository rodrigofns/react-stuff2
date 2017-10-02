import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import loginState from '../login/loginState';
import './LayoutLoginInfo.css';

const LayoutLoginInfo = ({ usuario }) => {
	return (
		<div id="LayoutLoginInfo-wrap">
			<div id="LayoutLoginInfo-userInfo">{usuario}</div>
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

LayoutLoginInfo.propTypes = {
	usuario: PropTypes.string.isRequired
};

export default loginState.subscribe(LayoutLoginInfo);
