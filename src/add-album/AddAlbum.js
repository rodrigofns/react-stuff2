import React from 'react';
import TextField from 'material-ui/TextField';

const AddAlbum = () => (
	<div>
		<h1>Add album</h1>
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
	</div>
);

export default AddAlbum;
