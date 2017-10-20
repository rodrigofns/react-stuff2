/**
 * Barra de progresso indefinido, puramente visual.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {LinearProgress} from 'material-ui';

import tema from '_layout/tema';

export const WaitBar = ({ show }) => (
	show &&
		<LinearProgress mode="indeterminate" color={tema.palette.accent1Color}/>
);

WaitBar.propTypes = {
	show: PropTypes.bool.isRequired
};
