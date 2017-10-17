import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

import cores from '_layout/cores';

export const WaitBar = ({ show }) => (
	show &&
		<LinearProgress mode="indeterminate" color={cores.palette.accent1Color}/>
);

WaitBar.propTypes = {
	show: PropTypes.bool.isRequired
};