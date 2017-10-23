/**
 * Pequeno botão com fundo transparente e tooltip automático.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import {FontIcon, IconButton} from 'material-ui';

import css from './MiniIconButton.module.css';

export const MiniIconButton = ({ className, icon, tooltip, tooltipPosition, onClick }) => (
	<div className={classes(css.wrap, className)}>
		<IconButton
			tooltip={tooltip}
			tooltipPosition={tooltipPosition}
			tooltipStyles={{ fontSize: '9pt' }}
			onClick={onClick}>
			<FontIcon className={classes(`fa fa-${icon}`, css.fontIcon)}/>
		</IconButton>
	</div>
);

MiniIconButton.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.string.isRequired, // fontawesome
	tooltip: PropTypes.string,
	tooltipPosition: PropTypes.oneOf(['bottom-center', 'top-center', 'bottom-right', 'top-right', 'bottom-left', 'top-left']),
	onClick: PropTypes.func
};
