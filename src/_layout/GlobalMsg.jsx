import React from 'react';
import {globalMsgStore, withStore} from '_util';

import './GlobalMsg.sass';

const GlobalMsg = ({ className, globalMsgStore }) =>
	globalMsgStore.msgs.empty ? null : (
		<ul id="GlobalMsg" className={className}>
			{globalMsgStore.msgs.map((msg, i) =>
				<li key={i} className="erro">
					<div>{msg}</div>
					<div>
						<a href="dispensarMensagem"
							title="Dispensar mensagem"
							onClick={ev => {
								ev.preventDefault();
								globalMsgStore.remove(i);
							}}>x</a>
					</div>
				</li>
			)}
		</ul>
	);

export default withStore({ globalMsgStore })(GlobalMsg);
