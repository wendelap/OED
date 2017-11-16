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
		this.editApplyStart = this.editApplyStart.bind(this);
		this.editApplyEnd = this.editApplyEnd.bind(this);
		this.editMeterID = this.editMeterID.bind(this);
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

	editApplyStart(e) {
		this.props.editApplyStart(e.target.value);
	}

	editApplyEnd(e) {
		this.props.editApplyEnd(e.target.value);
	}

	editMeterID(e) {
		this.props.editMeterID(e.target.value);
	}

	render() {
		const someStyle = {
			marginTop: '40px'
		};
		const datePairStyle = {
			marginBottom: '20px'
		};
		return (
			<div style={someStyle}>
				Meter ID to baseline:
				<input
					type="number"
					onChange={this.editMeterID}
				/>
				<div style={datePairStyle}>
					Baseline Calculation Period Start:
					<input
						type="date"
						placeholder=""
						onChange={this.editCalcStart}
					/>
					Baseline Calculation Period End:
					<input
						type="date"
						placeholder=""
						onChange={this.editCalcEnd}
					/>
				</div>
				<div style={datePairStyle}>
					Baseline Application Period Start:
					<input
						type="date"
						placeholder=""
						onChange={this.editApplyStart}
					/>
					Baseline Application Period End:
					<input
						type="date"
						placeholder=""
						onChange={this.editApplyEnd}
					/>
				</div>
				<button type="submit" onClick={this.handleSubmit}>Submit</button>
			</div>
		);
	}
}
