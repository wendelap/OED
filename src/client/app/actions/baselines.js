/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


import axios from 'axios';

export const CREATE_NEW_BASELINE = 'CREATE_NEW_BASELINE';
export const MARK_NEW_BASELINE_SUBMITTED = 'MARK_NEW_BASELINE_SUBMITTED';
export const MARK_NEW_BASELINE_NOT_SUBMITTED = 'MARK_NEW_BASELINE_NOT_SUBMITTED';
export const EDIT_NEW_BASELINE_CALC_START = 'EDIT_NEW_BASELINE_CALC_START';
export const EDIT_NEW_BASELINE_CALC_END = 'EDIT_NEW_BASELINE_CALC_END';

function markNewBaselineSubmitted() {
	return { type: MARK_NEW_BASELINE_SUBMITTED };
}

function markNewBaselineNotSubmitted() {
	return { type: MARK_NEW_BASELINE_NOT_SUBMITTED };
}

export function editNewBaselineCalcStart(timestamp) {
	return { type: EDIT_NEW_BASELINE_CALC_START, timestamp };
}

export function editNewBaselineCalcEnd(timestamp) {
	return { type: EDIT_NEW_BASELINE_CALC_END, timestamp };
}

function shouldSubmitBaseline(state) {
	return !state.baselines.newBaselineInfo.submitted;
}

export function submitNewBaselineIfNeeded() {
	return (dispatch, getState) => {
		if (shouldSubmitBaseline(getState())) {
			const newBaselineInfo = getState().baselines.newBaselineInfo;
			const params = {
				meterID: 1, // todo: this is a dummy value
				calcStart: newBaselineInfo.calcStart,
				calcEnd: newBaselineInfo.calcEnd,
				applyStart: '1970-01-01', // todo: this is a dummy value
				applyEnd: '2020-12-31' // todo: this is a dummy value
			};
			return axios.post('/api/baseline/new', params)
				.then(response => {
					console.log(response);
					dispatch(markNewBaselineSubmitted());
				})
				.catch(err => {
					console.error(err);
					dispatch(markNewBaselineNotSubmitted());
				});
		}
		return Promise.resolve();
	};
}
