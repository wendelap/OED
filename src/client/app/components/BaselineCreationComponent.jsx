/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';


export default class BaselineCreationComponent extends React.Component {

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Baseline Period Start:
					<input
						type="date" value={this.state.baselineDate.start}
						onChange={this.handleDateStartChange}
					/>

					Baseline Period End:
					<input
						type="date"
						value={this.state.baselineDate.end}
						onChange={this.handleDateEndChange}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
