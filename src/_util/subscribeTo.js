/**
 * Cria um HOC injetando um objeto MobX diretamente no componente.
 */

import React from 'react';
import {observer} from 'mobx-react';

export function subscribeTo(stores) {
	return function(Component) {
		let Wrapped = observer(Component);
		return function MobxSubscriber(props) {
			return <Wrapped {...stores} {...props}/>;
		};
	};
}
