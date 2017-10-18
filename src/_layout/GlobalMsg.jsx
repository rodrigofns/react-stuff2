import React from 'react';
import PropTypes from 'prop-types';
import {globalMsgStore, subscribeTo} from '_util';

import './GlobalMsg.sass';

@subscribeTo({ globalMsgStore })
export default class GlobalMsg extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string
	};

	render() {
		const { className, globalMsgStore } = this.props;

		if (globalMsgStore.msgs.empty) {
			return null;
		}

		return (
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
	}
}
