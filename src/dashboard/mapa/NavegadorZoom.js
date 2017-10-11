import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from './mapas-2d.json';
import './NavegadorZoom.sass';

export default class NavegadorZoom extends React.Component {
	static propTypes = {
		idAreas: PropTypes.array.isRequired,
		nomeInicial: PropTypes.string.isRequired,
		pontoSelecionado: PropTypes.string,
		nomeHover: PropTypes.string,
		className: PropTypes.string,
		onClick: PropTypes.func
	};

	render() {
		let { idAreas, nomeInicial, pontoSelecionado, nomeHover, className, onClick } = this.props;
		return (
			<div id="Navegador" className={className}>
				{idAreas.map((idArea, i) =>
					(i >= 1 &&
						<div className="navegaAcima" key={i} onClick={() => onClick(i)}>
							{i === 1 ? nomeInicial : jsonMapas.areas[idAreas[i - 1]].nome}
						</div>
					)
				)}

				{pontoSelecionado ? (
					<div className="navegaAcima" onClick={() => onClick(idAreas.length)}>
						{idAreas.length < 2 ? nomeInicial : jsonMapas.areas[ idAreas.last ].nome}
					</div>
				) : (
					<div className="nivelAtual">
						{idAreas.length < 2 ? nomeInicial : jsonMapas.areas[ idAreas.last ].nome}
					</div>
				)}

				{pontoSelecionado &&
					<div className="nivelAtual">{pontoSelecionado}</div>
				}
				{nomeHover &&
					<div className="nivelHover">{nomeHover}</div>
				}
			</div>
		);
	}
}
