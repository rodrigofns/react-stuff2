import React from 'react';
import {RaisedButton, TextField} from '../_util/material';

const AddAlbum = () => (
	<div>
		<h2>Add album</h2>
		<div style={{width:'240px'}}>
			<TextField
				fullWidth
				defaultValue=""
				floatingLabelText="Artist"/>
		</div>
		<div style={{width:'240px', display:'inline-block'}}>
			<TextField
				fullWidth
				defaultValue=""
				floatingLabelText="Album name"/>
		</div>
		<div style={{width:'80px', marginLeft:'12px', display:'inline-block'}}>
			<TextField
				maxLength="4"
				fullWidth
				defaultValue=""
				floatingLabelText="Year"/>
		</div>
		<div style={{marginTop:'16px'}}>
			<RaisedButton primary label="Insert"/>
		</div>
	</div>
);

export default AddAlbum;
