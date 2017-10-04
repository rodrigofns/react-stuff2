import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {subscribe} from 'react-app-state';

import {RaisedButton} from '../_util/material';
import loginState from '../login/loginState';
import './LayoutHeaderInfo.scss';

@subscribe(loginState)
class LayoutHeaderInfo extends React.Component {
	static propTypes = {
		usuario: PropTypes.string.isRequired
	}

	render() {
		let { usuario, history } = this.props;
		return (
			<div id="LayoutHeaderInfo">
				<div className="headerUserInfo">{usuario}</div>
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
	}
}

export default withRouter(LayoutHeaderInfo);
