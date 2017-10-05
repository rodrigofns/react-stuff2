import React from 'react';
import {Card} from '../_util/material';

import Card1 from './Card1';
import Card2 from './Card2';
import './Dashboard.scss';

export default class Dashboard extends React.Component {
	render() {
		return (
			<div id="Dashboard">
				<Card id="Dashboard-card1">
					<Card1/>
				</Card>
				<Card id="Dashboard-card2">
					<Card2/>
				</Card>
			</div>
		);
	}
}