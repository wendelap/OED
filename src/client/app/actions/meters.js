/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import axios from 'axios';

export const REQUEST_METERS_DETAILS = 'REQUEST_METERS_DETAILS';
export const RECEIVE_METERS_DETAILS = 'RECEIVE_METERS_DETAILS';
export const REQUEST_BASELINE_DATA = 'REQUEST_BASELINE_DATA';
export const RECEIVE_BASELINE_DATA = 'RECEIVE_BASELINE_DATA';

export function requestMetersDetails() {
	return { type: REQUEST_METERS_DETAILS };
}

export function receiveMetersDetails(data) {
	return { type: RECEIVE_METERS_DETAILS, data };
}

export function requestBaselineData() {
	return { type: REQUEST_BASELINE_DATA };
}

export function receiveBaselineData(baselines) {
	return { type: RECEIVE_BASELINE_DATA, baselines };
}

function fetchMetersDetails() {
	return dispatch => {
		dispatch(requestMetersDetails());
		return axios.get('/api/meters')
			.then(response => {
				dispatch(receiveMetersDetails(response.data));
			});
	};
}

/**
 * @param {State} state
 */
function shouldFetchMetersDetails(state) {
	return !state.meters.isFetching && state.meters.meters === undefined;
}

export function fetchMetersDetailsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchMetersDetails(getState())) {
			dispatch(fetchMetersDetails());
		}
		return Promise.resolve();
	};
}
