import React from 'react';
import './BotaoVisao.css';

const BotaoVisao = (props) => {
	let { selecionado, ...otherProps } = props;
	let cls = 'VisaoBotao' +
		(selecionado ? ' selec' : '');

	return (
		<div className={cls} {...otherProps}></div>
	);
};

export default BotaoVisao;
