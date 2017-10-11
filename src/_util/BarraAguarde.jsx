import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

import cores from '_layout/cores';

export const BarraAguarde = ({ visivel }) => (
	visivel &&
		<LinearProgress mode="indeterminate" color={cores.palette.accent1Color}/>
);

BarraAguarde.propTypes = {
	visivel: PropTypes.bool.isRequired
};
