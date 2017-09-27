import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import loginState from '../login/loginState';
import './TopRite.css';

const TopRite = (props) => {
	return (
		<div id="TopRite-wrap">
			<div id="TopRite-userInfo">{props.userName}</div>
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

export default loginState.subscribe(TopRite);
