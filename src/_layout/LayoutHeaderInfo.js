import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {RaisedButton} from '../_util/material';
import loginState from '../login/loginState';
import './LayoutHeaderInfo.css';

const LayoutHeaderInfo = ({ usuario, history }) => {
	return (
		<div id="LayoutHeaderInfo">
			<div className="userInfo">{usuario}</div>
			<RaisedButton
				secondary
				id="TopRite-logoff"
				label="Logoff"
				onClick={() => {
					loginState.logoff();
					history.push('/');
				}}/>
		</div>
	);
};

LayoutHeaderInfo.propTypes = {
	usuario: PropTypes.string.isRequired
};

export default withRouter(loginState.subscribe(LayoutHeaderInfo));
