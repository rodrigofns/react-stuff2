import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

const ListNav = ({ history, to, children }) => (
	<ListItem onClick={() => history.push(to)}>
		{children}
	</ListItem>
);

ListNav.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	to: PropTypes.string.isRequired,
	children: PropTypes.node
};

export default withRouter(ListNav);
