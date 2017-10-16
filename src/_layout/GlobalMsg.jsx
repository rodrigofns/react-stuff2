import React from 'react';
import {globalMsgStore, withStore} from '_util';

import './GlobalMsg.sass';

const GlobalMsg = ({ className, globalMsgStore }) =>
	globalMsgStore.msgs.empty ? null : (
		<ul id="GlobalMsg" className={className}>
			{globalMsgStore.msgs.map((msg, i) =>
				<li key={i} className="erro">{msg}</li>
			)}
		</ul>
	);

export default withStore({ globalMsgStore })(GlobalMsg);
