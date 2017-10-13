/**
 * Cria um HOC injetando um objeto MobX diretamente no componente.
 */

import React from 'react';
import {observer} from 'mobx-react';

export function withStore(stores) {
	return function(Component) {
		let Wrapped = observer(Component);
		return function MobXWithStore(props) {
			return <Wrapped {...stores} {...props}/>;
		};
	};
}
