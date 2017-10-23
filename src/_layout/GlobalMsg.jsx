import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import {globalMsgStore, subscribeTo} from '_util';

import css from './GlobalMsg.module.css';

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
			<ul className={classes(css.lista, className)}>
				{globalMsgStore.msgs.map((msg, i) =>
					<li key={i} className={css.msg}>
						<div>{msg}</div>
						<div>
							<a className={css.link}
								href="dispensarMensagem"
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
