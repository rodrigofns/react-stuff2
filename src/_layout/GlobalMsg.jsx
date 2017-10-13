import React from 'react';
import {globalMsgStore, withStore} from '_util';

import './GlobalMsg.sass';

const GlobalMsg = ({ globalMsgStore }) => (
	<ul id="GlobalMsg">
		{globalMsgStore.msgs.map((msg, i) =>
			<li key={i} className="erro">{msg}</li>
		)}
	</ul>
);

export default withStore({ globalMsgStore })(GlobalMsg);
