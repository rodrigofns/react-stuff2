import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from './mapas-2d.json';
import './Navegador.scss';

const Navegador = ({ idAreas, nomeInicial, onClick }) => (
	<div id="Navegador">
		{idAreas.map((idArea, i) =>
			{(i >= 1) &&
				<div className="navegaAcima" key={i} onClick={() => onClick(i)}>
					{i === 1 ?
						nomeInicial :
						jsonMapas.areas[ idAreas[i - 1] ].nome
					}
				</div>
			}
		)}
		<div className="nivelAtual">
			{idAreas.length === 1 ?
				nomeInicial :
				jsonMapas.areas[ idAreas[idAreas.length - 1] ].nome
			}
		</div>
	</div>
);

Navegador.propTypes = {
	idAreas: PropTypes.array.isRequired,
	nomeInicial: PropTypes.string.isRequired,
	onClick: PropTypes.func
};

export default Navegador;
