import React from 'react';
import {observer} from 'mobx-react';

export function useProp(stores) {
	return function(Component) {
		let Wrapped = observer(Component);
		return function MobXUseProp(props) {
			return <Wrapped {...stores} {...props}/>;
		};
	};
}
