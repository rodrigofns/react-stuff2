import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './TopRite.css';

const TopRite = () => {
	return (
		<div id="TopRite-wrap">
			<div id="TopRite-userInfo">Fulano de Tal</div>
			<RaisedButton primary id="TopRite-logoff" label="Logoff"/>
		</div>
	);
};

export default TopRite;
