import React from 'react';
import {withRouter} from 'react-router-dom';
import {RaisedButton} from 'material-ui';
import {authStore, subscribeTo} from '_util';

import './LayoutHeaderInfo.sass';

@withRouter
@subscribeTo({ authStore })
export default class LayoutHeaderInfo extends React.PureComponent {
	render() {
		const { authStore, history } = this.props;
		return (
			<div id="LayoutHeaderInfo">
				<div className="headerUserInfo">{authStore.userInfo.nome}</div>
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
