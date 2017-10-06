import React from 'react';
import {withRouter} from 'react-router-dom';
import {subscribe} from 'react-app-state';

import {RaisedButton} from '../_util/material';
import authState from '../_auth/authState';
import './LayoutHeaderInfo.scss';

@subscribe(authState)
class LayoutHeaderInfo extends React.Component {
	render() {
		let { nomeUsuario, history } = this.props;
		return (
			<div id="LayoutHeaderInfo">
				<div className="headerUserInfo">{nomeUsuario}</div>
				<RaisedButton
					secondary
					id="TopRite-logoff"
					label="Logoff"
					onClick={() => {
						authState.logoff();
						history.push('/');
					}}/>
			</div>
		);
	}
}

export default withRouter(LayoutHeaderInfo);
