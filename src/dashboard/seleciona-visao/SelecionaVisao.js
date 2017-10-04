import React from 'react';
import {subscribe} from 'react-app-state';
import VisaoLinha1 from './VisaoLinha1';
import VisaoLinha2 from './VisaoLinha2';
import visaoState from './visaoState';
import './SelecionaVisao.scss';

@subscribe(visaoState)
export default class SelecionaVisao extends React.Component {
	render() {
		let { visaoAtual1 } = this.props;
		return (
			<div id="SelecionaVisao">
				<div className="linhas">
					<VisaoLinha1/>
					{visaoAtual1 === 'EXTERNAS' ? (
						<VisaoLinha2/>
					) : null}
				</div>
			</div>
		);
	}
}
