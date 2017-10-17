import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import './IconBtn.sass';

export const IconBtn = ({ icon, tooltip, tooltipPosition, onClick }) => (
	<div className="IconBtn-wrap">
		<IconButton
			tooltip={tooltip}
			tooltipPosition={tooltipPosition}
			onClick={onClick}>
			<FontIcon className={`fa fa-${icon}`}/>
		</IconButton>
	</div>
);

IconBtn.propTypes = {
	icon: PropTypes.string.isRequired, // fontawesome
	tooltip: PropTypes.string,
	tooltipPosition: PropTypes.oneOf(['bottom-center', 'top-center', 'bottom-right', 'top-right', 'bottom-left', 'top-left']),
	onClick: PropTypes.func
};
