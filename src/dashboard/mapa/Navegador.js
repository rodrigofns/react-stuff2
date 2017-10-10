import React from 'react';
import PropTypes from 'prop-types';

import jsonMapas from './mapas-2d.json';
import './Navegador.sass';

export default class Navegador extends React.Component {
	static propTypes = {
		idAreas: PropTypes.array.isRequired,
		nomeInicial: PropTypes.string.isRequired,
		onClick: PropTypes.func
	};

	render() {
		let { idAreas, nomeInicial, onClick } = this.props;
		return (
			<div id="Navegador">
				{idAreas.map((idArea, i) =>
					(i >= 1 &&
						<div className="navegaAcima" key={i} onClick={() => onClick(i)}>
							{i === 1 ?
								nomeInicial :
								jsonMapas.areas[ idAreas[i - 1] ].nome
							}
						</div>
					)
				)}
				<div className="nivelAtual">
					{idAreas.length < 2 ?
						nomeInicial :
						jsonMapas.areas[ idAreas[idAreas.length - 1] ].nome
					}
				</div>
			</div>
		);
	}
}
