import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import loginState from '../login/loginState';
import './TopRite.css';

const TopRite = ({ userName }) => {
	return (
		<div id="TopRite-wrap">
			<div id="TopRite-userInfo">{userName}</div>
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

TopRite.propTypes = {
	userName: PropTypes.string.isRequired
};

export default loginState.subscribe(TopRite, 'userName');
