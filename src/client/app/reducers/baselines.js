/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as _ from 'lodash';
import TimeInterval from '../../../common/TimeInterval';
import * as baselinesActions from '../actions/baselines';


const defaultState = {
	newBaseline: {
		meterID: null,
		calcStart: '',
		calcEnd: '',
		applyStart: '',
		applyEnd: '',
		submitted: false,
		dirty: false,
	},
	byMeterID: null,
	isFetching: false,
	dirty: true
};

export default function baselines(state = defaultState, action) {
	switch (action.type) {
		case baselinesActions.CREATE_NEW_BASELINE:
			return state;

		case baselinesActions.MARK_NEW_BASELINE_SUBMITTED:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					submitted: true
				}
			};

		case baselinesActions.MARK_NEW_BASELINE_NOT_SUBMITTED:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					submitted: false
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_CALC_START:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					calcStart: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_CALC_END:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					calcEnd: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_APPLY_START:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					applyStart: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_APPLY_END:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					applyEnd: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_METER_ID:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					meterID: action.id
				}
			};

		case baselinesActions.RECEIVE_ALL_BASELINES: {
			console.log(action.data);
			const newBaselines = action.data.map(baseline => ({
				...baseline,
				applyRange: new TimeInterval(baseline.applyRange.startTimestamp, baseline.applyRange.endTimestamp),
				calcRange: new TimeInterval(baseline.calcRange.startTimestamp, baseline.calcRange.endTimestamp),
				readings: [
					[
						Math.round(new Date(baseline.applyRange.startTimestamp).getTime()),
						baseline.baselineValue
					],
					[
						Math.round(new Date(baseline.applyRange.endTimestamp).getTime()),
						baseline.baselineValue
					]
				]
			}));
			/*
			 * newBaselines is a list of baseline objects.
			 * This next transformation does 2 things:
			 * 1. Group baseline objects into an object containing arrays of baselines keyed by the meter ID to which they apply
			 * 2. Turn each baseline object in these arrays into an object keyed by the string representation of its application range
			 *
			 * Start: [ {baseline}, {baseline}, ...]
			 * =(1)=> { id: [ baselines ], id: [ baselines ], ...}
			 * =(2)=> {
			 * 			id: { 'applicationRange': {baseline}, ... },
			 * 			id: { 'applicationRange': {baseline}, ... },
			 * 			...
			 * 		}
			 */
			const newByMeterID = _.mapValues(
				_.groupBy(newBaselines, 'meterID'), baselinesOfMeter =>
					_.keyBy(baselinesOfMeter, baseline => baseline.applyRange.toString()
				));
			console.log(newByMeterID);
			return {
				...state,
				byMeterID: newBaselines
			};
		}

		default:
			return state;
	}
}

