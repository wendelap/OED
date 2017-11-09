/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import axios from 'axios';

import { fetchNeededLineReadings } from './lineReadings';
import { fetchNeededBarReadings, fetchNeededCompareReadings } from './barReadings';

export const UPDATE_SELECTED_METERS = 'UPDATE_SELECTED_METERS';
export const UPDATE_SELECTED_GROUPS = 'UPDATE_SELECTED_GROUPS';
export const UPDATE_BAR_DURATION = 'UPDATE_BAR_DURATION';
export const CHANGE_CHART_TO_RENDER = 'CHANGE_CHART_TO_RENDER';
export const CHANGE_BAR_STACKING = 'CHANGE_BAR_STACKING';
export const CHANGE_GRAPH_ZOOM = 'CHANGE_GRAPH_ZOOM';
export const ADD_NEW_BASELINE = 'ADD_NEW_BASELINE';
export const SET_GRAPH_ZOOM = 'CHANGE_GRAPH_ZOOM';

/**
 * @param {string} chartType is one of chartTypes
 * @returns {*} An action needed to change the chart type
 */
export function changeChartToRender(chartType) {
	return { type: CHANGE_CHART_TO_RENDER, chartType };
}

export function changeBarStacking() {
	return { type: CHANGE_BAR_STACKING };
}

export function updateSelectedMeters(meterIDs) {
	return { type: UPDATE_SELECTED_METERS, meterIDs };
}

export function updateSelectedGroups(groupIDs) {
	return { type: UPDATE_SELECTED_GROUPS, groupIDs };
}

export function updateBarDuration(barDuration) {
	return { type: UPDATE_BAR_DURATION, barDuration };
}

export function changeBarDuration(barDuration) {
	return (dispatch, getState) => {
		dispatch(updateBarDuration(barDuration));
		dispatch(fetchNeededBarReadings(getState().graph.timeInterval));
		return Promise.resolve();
	};
}

export function changeSelectedMeters(meterIDs) {
	return (dispatch, getState) => {
		dispatch(updateSelectedMeters(meterIDs));
		// Nesting dispatches to preserve that updateSelectedMeters() is called before fetching readings
		dispatch(dispatch2 => {
			dispatch2(fetchNeededLineReadings(getState().graph.timeInterval));
			dispatch2(fetchNeededBarReadings(getState().graph.timeInterval));
			dispatch2(fetchNeededCompareReadings(getState().graph.compareTimeInterval));
		});
		return Promise.resolve();
	};
}

export function changeSelectedGroups(groupIDs) {
	return (dispatch, getState) => {
		dispatch(updateSelectedGroups(groupIDs));
		// Nesting dispatches to preserve that updateSelectedGroups() is called before fetching readings
		dispatch(dispatch2 => {
			dispatch2(fetchNeededLineReadings(getState().graph.timeInterval));
			dispatch2(fetchNeededBarReadings(getState().graph.timeInterval));
		});
		return Promise.resolve();
	};
}

function fetchNeededReadingsForGraph(timeInterval) {
	return dispatch => {
		dispatch(fetchNeededLineReadings(timeInterval));
		dispatch(fetchNeededBarReadings(timeInterval));
	};
}

function changeGraphZoom(timeInterval) {
	return { type: CHANGE_GRAPH_ZOOM, timeInterval };
}

function shouldChangeGraphZoom(state, timeInterval) {
	return !state.graph.timeInterval.equals(timeInterval);
}

export function changeGraphZoomIfNeeded(timeInterval) {
	return (dispatch, getState) => {
		if (shouldChangeGraphZoom(getState())) {
			dispatch(changeGraphZoom(timeInterval));
			dispatch(fetchNeededReadingsForGraph(timeInterval));
		}
	};
}

export function addNewBaseline(baselineInfo) {
	return { type: ADD_NEW_BASELINE, baselineInfo };
}

function buildNewBaseline(state) {
	return {
		meterID: state.graph.selectedMeters[0],
		applyStart: '1980-01-01',
		applyEnd: '2020-01-01',
		calcStart: state.graph.timeInterval.startTimestamp,
		calcEnd: state.graph.timeInterval.endTimestamp
	};
}

export function newBaseline(date) {
	return (dispatch, getState) => {
		date.meterID = getState().graph.selectedMeters[0];
		const baselineInfo = buildNewBaseline(getState());
		const toSend = { baselineInfo, date };
		dispatch(addNewBaseline(date));
		return axios.post('/api/baseline/newBaseline/',
			{ toSend }
		).then(response => {
			console.log(response);
		});
	};
}
