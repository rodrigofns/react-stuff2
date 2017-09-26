import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { getStyles } from 'material-ui/AppBar/AppBar';
import './TopRite.css';

const TopRite = () => {
	return (
		<div>
			<div id="TopRite-userInfo">Fulano de Tal</div>
			<FlatButton id="TopRite-logoff" label="Logoff"/>
		</div>
	);
};

export default TopRite;
