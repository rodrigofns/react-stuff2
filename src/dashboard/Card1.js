import React from 'react';
import {subscribe} from 'react-app-state';

import SelecionaVisao from './seleciona-visao/SelecionaVisao';
import Internas from './visoes/Internas';
import visaoState from './seleciona-visao/visaoState';

@subscribe(visaoState)
export default class Card1 extends React.Component {
	render() {
		let { visaoAtual1 } = this.props;

		return (
			<div id="Card1">
				<SelecionaVisao/>
				{visaoAtual1 === 'INTERNAS' ? (
					<Internas/>
				) : null}
			</div>
		);
	}
}
