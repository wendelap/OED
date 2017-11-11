/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';


export default class BaselineCreationComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.editCalcStart = this.editCalcStart.bind(this);
		this.editCalcEnd = this.editCalcEnd.bind(this);
	}

	handleSubmit() {
		this.props.submitNewBaseline();
	}

	editCalcStart(e) {
		this.props.editCalcStart(e.target.value);
	}

	editCalcEnd(e) {
		this.props.editCalcEnd(e.target.value);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Baseline Period Start:
					<input
						type="date"
						placeholder=""
						onChange={this.editCalcStart}
					/>

					Baseline Period End:
					<input
						type="date"
						placeholder=""
						onChange={this.editCalcEnd}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}
