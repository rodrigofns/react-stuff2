/**
 * Renderiza uma estrutura hierárquia em forma de árvore.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';

import css from './Tree.module.css';

class TreeNode extends React.PureComponent {
	static propTypes = {
		node: PropTypes.object.isRequired,
		level: PropTypes.number.isRequired,
		pxIdent: PropTypes.number,
		nameField: PropTypes.string,
		childrenField: PropTypes.string
	};

	static defaultProps = {
		pxIdent: 18,
		nameField: 'name',
		childrenField: 'children'
	};

	state = {
		expanded: false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.node !== this.props.node) {
			this.setState({ expanded: false });
		}
	}

	ident(node) {
		const { childrenField } = this.props;
		if (node[childrenField] && !node[childrenField].empty) {
			return this.state.expanded
				? <i className={classes('fa fa-minus-square-o', css.plusMinus)}></i>
				: <i className={classes('fa fa-plus-square-o', css.plusMinus)}></i>;
		}
		return <div className={css.blankIdent}></div>;
	}

	render() {
		const { node, level, pxIdent, nameField, childrenField } = this.props;
		const { expanded } = this.state;
		return (
			<div className={css.wrap}>
				<div
					className={css.row}
					style={{ paddingLeft: (level * pxIdent) + 'px' }}
					onClick={() => this.setState({ expanded: !expanded })}>
					{this.ident(node)}
					<div className={css.name}>{node[nameField]}</div>
				</div>
				{expanded && node[childrenField] && node[childrenField].map((child, i) =>
					<TreeNode key={i} node={child} level={level + 1} pxIdent={pxIdent}
						nameField={nameField} childrenField={childrenField}/>
				)}
			</div>
		);
	}
}

export const Tree = ({ rootNode, className, pxIdent, nameField, childrenField }) => (
	<div className={className}>
		<TreeNode node={rootNode} level={0} pxIdent={pxIdent}
			nameField={nameField} childrenField={childrenField}/>
	</div>
);

Tree.propTypes = {
	rootNode: PropTypes.object.isRequired,
	className: PropTypes.string,
	pxIdent: PropTypes.number,
	nameField: PropTypes.string,
	childrenField: PropTypes.string
};
