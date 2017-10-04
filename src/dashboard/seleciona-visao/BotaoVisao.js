import React from 'react';
import './BotaoVisao.scss';

export default class BotaoVisao extends React.Component {
	render() {
		let { selecionado, ...otherProps } = this.props;
		let cls = 'VisaoBotao' +
			(selecionado ? ' selec' : '');

		return (
			<div className={cls} {...otherProps}></div>
		);
	};
}
