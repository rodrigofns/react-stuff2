import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

const ListNav = (props) => (
	<ListItem onClick={() => props.history.push(props.to)}>
		{props.children}
	</ListItem>
);

ListNav.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	to: PropTypes.string.isRequired
};

export default withRouter(ListNav);
