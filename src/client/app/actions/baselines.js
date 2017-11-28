/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


import axios from 'axios';

export const CREATE_NEW_BASELINE = 'CREATE_NEW_BASELINE';

export const MARK_NEW_BASELINE_SUBMITTED = 'MARK_NEW_BASELINE_SUBMITTED';
export const MARK_NEW_BASELINE_NOT_SUBMITTED = 'MARK_NEW_BASELINE_NOT_SUBMITTED';

export const EDIT_NEW_BASELINE_CALC_START = 'EDIT_NEW_BASELINE_CALC_START';
export const EDIT_NEW_BASELINE_CALC_END = 'EDIT_NEW_BASELINE_CALC_END';

export const EDIT_NEW_BASELINE_APPLY_START = 'EDIT_NEW_BASELINE_APPLY_START';
export const EDIT_NEW_BASELINE_APPLY_END = 'EDIT_NEW_BASELINE_APPLY_END';

export const EDIT_NEW_BASELINE_METER_ID = 'EDIT_NEW_BASELINE_METER_ID';

export const RECEIVE_ALL_BASELINES = 'RECEIVE_ALL_BASELINES';

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

export function editNewBaselineApplyStart(timestamp) {
	return { type: EDIT_NEW_BASELINE_APPLY_START, timestamp };
}

export function editNewBaselineApplyEnd(timestamp) {
	return { type: EDIT_NEW_BASELINE_APPLY_END, timestamp };
}

export function editNewBaselineMeterID(id) {
	return { type: EDIT_NEW_BASELINE_METER_ID, id: parseInt(id) };
}

function shouldSubmitBaseline(state) {
	return !state.baselines.newBaseline.submitted;
}

export function submitNewBaselineIfNeeded() {
	return (dispatch, getState) => {
		if (shouldSubmitBaseline(getState())) {
			const newBaseline = getState().baselines.newBaseline;
			const params = {
				meterID: newBaseline.meterID,
				calcStart: newBaseline.calcStart,
				calcEnd: newBaseline.calcEnd,
				applyStart: newBaseline.applyStart,
				applyEnd: newBaseline.applyEnd
			};
			return axios.post('/api/baselines/new', params)
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

function shouldFetchAllBaselines(state) {
	return state.baselines.details === null && !state.baselines.isFetching;
}

export function receiveAllBaselines(data) {
	return { type: 'RECEIVE_ALL_BASELINES', data };
}

export function fetchAllBaselines() {
	return (dispatch, getState) => {
		if (shouldFetchAllBaselines(getState())) {
			return axios.get('api/baselines/')
				.then(response => {
					dispatch(receiveAllBaselines(response.data));
				})
				.catch(console.error);
		}
		return Promise.resolve();
	};
}
