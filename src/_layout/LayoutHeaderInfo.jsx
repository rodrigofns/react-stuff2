import React from 'react';
import {withRouter} from 'react-router-dom';
import {RaisedButton} from 'material-ui';
import {authStore, withStore} from '_util';

import './LayoutHeaderInfo.sass';

const LayoutHeaderInfo = ({ authStore, history }) => (
	<div id="LayoutHeaderInfo">
		<div className="headerUserInfo">{authStore.getUserInfo().nome}</div>
		<RaisedButton
			secondary
			id="TopRite-logoff"
			label="Logoff"
			onClick={() => {
				authStore.removeToken();
				history.push('/');
			}}/>
	</div>
);

export default withRouter(
	withStore({ authStore })(LayoutHeaderInfo)
);
