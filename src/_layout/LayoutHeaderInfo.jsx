import React from 'react';
import {withRouter} from 'react-router-dom';
import {RaisedButton} from 'material-ui';
import {authStore, withStore} from '_util';

import './LayoutHeaderInfo.sass';

@withRouter
@withStore({ authStore })
class LayoutHeaderInfo extends React.Component {
	render() {
		const { authStore, history } = this.props;
		const usr = authStore.getUserInfo();

		return (
			<div id="LayoutHeaderInfo">
				<div className="headerUserInfo">{usr.nome}</div>
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
	}
}

export default LayoutHeaderInfo;
