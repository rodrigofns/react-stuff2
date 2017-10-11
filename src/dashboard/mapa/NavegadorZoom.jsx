import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from './mapas-2d.json';
import './NavegadorZoom.sass';

const NavegadorZoom = ({ idAreas, pontoSelecionado, nomeHover, className, onClick }) => (
	<div id="Navegador" className={className}>
		{idAreas.map((idArea, i) =>
			(i >= 1 &&
				<div className="navegaAcima" key={i} onClick={() => onClick(i)}>
					{jsonMapas.areas[idAreas[i - 1]].nome}
				</div>
			)
		)}
		{pontoSelecionado &&
			<div className="navegaAcima" onClick={() => onClick(idAreas.length)}>
				{jsonMapas.areas[idAreas.last].nome}
			</div>
		}
		{!pontoSelecionado && !idAreas.empty &&
			<div className="nivelAtual">
				{jsonMapas.areas[idAreas.last].nome}
			</div>
		}
		{pontoSelecionado &&
			<div className="nivelAtual">{pontoSelecionado}</div>
		}
		{nomeHover &&
			<div className="nivelHover">{nomeHover}</div>
		}
	</div>
);

NavegadorZoom.propTypes = {
	idAreas: PropTypes.array.isRequired,
	pontoSelecionado: PropTypes.string,
	nomeHover: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func
};

export default NavegadorZoom;
