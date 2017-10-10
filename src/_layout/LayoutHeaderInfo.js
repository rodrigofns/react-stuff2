import React from 'react';
import {withRouter} from 'react-router-dom';
import {RaisedButton} from 'material-ui';
import {useProp, authStore} from '_util';

import './LayoutHeaderInfo.sass';

@useProp({ authStore })
class LayoutHeaderInfo extends React.Component {
	render() {
		let { authStore, history } = this.props;
		return (
			<div id="LayoutHeaderInfo">
				<div className="headerUserInfo">{authStore.nomeUsuario}</div>
				<RaisedButton
					secondary
					id="TopRite-logoff"
					label="Logoff"
					onClick={() => {
						authStore.logoff();
						history.push('/');
					}}/>
			</div>
		);
	}
}

export default withRouter(LayoutHeaderInfo);
