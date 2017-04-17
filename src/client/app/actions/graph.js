/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { fetchNeededReadings } from './readings';
import TimeInterval from '../../../common/TimeInterval';


export const UPDATE_SELECTED_METERS = 'UPDATE_SELECTED_METERS';
export const SET_GRAPH_ZOOM = 'CHANGE_GRAPH_ZOOM';
export const REQUEST_BASELINE_DATA = 'REQUEST_BASELINE_DATA';
export const RECEIVE_BASELINE_DATA = 'RECEIVE_BASELINE_DATA';

export function requestBaselineData(meters) {
	return { type: REQUEST_BASELINE_DATA, meters };
}

export function receiveBaselineData(meters, baselines) {
	return { type: RECEIVE_BASELINE_DATA, meters, baselines };
}


function fetchBaselineData(meters) {
	return dispatch => {
		dispatch(requestBaselineData(meters));
		const stringifiedMeterIDs = meters.join(',');
	return axios.get('/api/baseline/values/${stringifiedMeterIDs}').then(response => dispatch(receiveBaselineData(meters, response.data)));
	};
}

export function updateSelectedMeters(meterIDs) {
	return { type: UPDATE_SELECTED_METERS, meterIDs };
}

export function changeSelectedMeters(meterIDs) {
	return (dispatch, state) => {
		dispatch(updateSelectedMeters(meterIDs));
		dispatch(fetchNeededReadings(meterIDs, state().graph.timeInterval));
		dispatch(fetchBaselineData(meterIDs));
		return Promise.resolve();
	};
}

function fetchNeededReadingsForGraph(meterIDs, timeInterval) {
	return dispatch => {
		dispatch(fetchNeededReadings(meterIDs, timeInterval));
		dispatch(fetchNeededReadings(meterIDs, TimeInterval.unbounded()));
	};
}

function setGraphZoom(timeInterval) {
	return { type: SET_GRAPH_ZOOM, timeInterval };
}

function shouldChangeGraphZoom(state, timeInterval) {
	return !state.graph.timeInterval.equals(timeInterval);
}

export function changeGraphZoomIfNeeded(timeInterval) {
	return (dispatch, getState) => {
		if (shouldChangeGraphZoom(getState())) {
			dispatch(setGraphZoom(timeInterval));
			dispatch(fetchNeededReadingsForGraph(getState().graph.selectedMeters, timeInterval));
		}
	};
}
