import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';

import jsonMapas from './mapas-2d.json';
import css from './NavegadorZoom.module.css';

const NavegadorZoom = ({ idAreas, pontoSelecionado, nomeHover, className, onClick }) => (
	<div className={classes(css.wrap, className)}>
		{idAreas.map((idArea, i) =>
			(i >= 1 &&
				<div className={classes(css.itemNav, css.navegaAcima)} key={i} onClick={() => onClick(i)}>
					{jsonMapas.areas[idAreas[i - 1]].nome}
				</div>
			)
		)}
		{pontoSelecionado &&
			<div className={classes(css.itemNav, css.navegaAcima)} onClick={() => onClick(idAreas.length)}>
				{jsonMapas.areas[idAreas.last].nome}
			</div>
		}
		{!pontoSelecionado && !idAreas.empty &&
			<div className={classes(css.itemNav, css.nivelAtual)}>
				{jsonMapas.areas[idAreas.last].nome}
			</div>
		}
		{pontoSelecionado &&
			<div className={classes(css.itemNav, css.nivelAtual)}>{pontoSelecionado}</div>
		}
		{nomeHover &&
			<div className={classes(css.itemNav, css.nivelHover)}>{nomeHover}</div>
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
