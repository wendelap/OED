/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


import axios from 'axios';

export const ADD_NEW_BASELINE = 'ADD_NEW_BASELINE';


export function addNewBaseline(baselineInfo) {
	return { type: ADD_NEW_BASELINE, baselineInfo };
}

function buildNewBaseline(date) {
	return {
		meterID: date.meterID, // todo
		applyStart: '1980-01-01',
		applyEnd: '2020-01-01',
		calcStart: date.start_timestamp, // todo
		calcEnd: date.end_timestamp // todo
	};
}

export function newBaseline(newBaselineInfo) {
	console.log(newBaselineInfo); // newBaseLineInfo: { start: "2017-11-01", end: "2017-11-08", meterID: 1 }
	return dispatch => {
		const baselineInfo = buildNewBaseline(newBaselineInfo);
		const toSend = { baselineInfo, date: newBaselineInfo };
		dispatch(addNewBaseline(newBaselineInfo));
		return axios.post('/api/baseline/new',
			{ toSend }
		).then(response => {
			console.log(response);
		});
	};
}
