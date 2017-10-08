import React from 'react';
import {useProp} from '_util';

import VisaoLinha1 from './VisaoLinha1';
import VisaoLinha2 from './VisaoLinha2';
import visaoStore from './visaoStore';
import './SelecionaVisao.scss';

@useProp({ visaoStore })
export default class SelecionaVisao extends React.Component {
	render() {
		let { visaoStore } = this.props;
		return (
			<div id="SelecionaVisao">
				<div className="linhas">
					<VisaoLinha1/>
					{visaoStore.visaoAtual1 === 'EXTERNAS' ? (
						<VisaoLinha2/>
					) : null}
				</div>
			</div>
		);
	}
}
