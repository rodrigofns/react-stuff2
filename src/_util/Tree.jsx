import React from 'react';
import PropTypes from 'prop-types';

import './Tree.sass';

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

	ident(node) {
		let { childrenField } = this.props;
		if (node[childrenField] && !node[childrenField].empty) {
			return this.state.expanded
				? <i className="fa fa-minus-square-o plusMinus"></i>
				: <i className="fa fa-plus-square-o plusMinus"></i>;
		}
		return <div className="blankIdent"></div>;
	}

	render() {
		let { node, level, pxIdent, nameField, childrenField } = this.props;
		let { expanded } = this.state;

		return (
			<div className="TreeNode-wrap">
				<div
					className="row"
					style={{ paddingLeft: (level * pxIdent) + 'px' }}
					onClick={() => this.setState({ expanded: !expanded })}>
					{this.ident(node)}
					<div className="name">{node[nameField]}</div>
				</div>
				{expanded && node[childrenField] && node[childrenField].map((child, i) =>
					<TreeNode key={i} node={child} level={level + 1} pxIdent={pxIdent}
						nameField={nameField} childrenField={childrenField}/>
				)}
			</div>
		);
	}
}

const Tree = ({ rootNode, className, pxIdent, nameField, childrenField }) => (
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

export {Tree};
