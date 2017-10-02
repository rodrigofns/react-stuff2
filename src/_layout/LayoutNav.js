import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {ListItem} from '../_util/material';

const LayoutNav = ({ history, to, children, onClick }) => (
	<ListItem
		onClick={() => {
			history.push(to);
			if (onClick) onClick();
		}}>
		{children}
	</ListItem>
);

LayoutNav.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	to: PropTypes.string.isRequired,
	children: PropTypes.node,
	onClick: PropTypes.func
};

export default withRouter(LayoutNav);
