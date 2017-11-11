/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from 'react-redux';
import { submitNewBaselineIfNeeded, editNewBaselineCalcStart, editNewBaselineCalcEnd } from '../actions/baselines';
import BaselineCreationComponent from '../components/BaselineCreationComponent';

function mapStateToProps() {
	return {
		nothing: 'nothing'
	};
}

function mapDispatchToProps(dispatch) {
	return {
		editCalcStart: timestamp => dispatch(editNewBaselineCalcStart(timestamp)),
		editCalcEnd: timestamp => dispatch(editNewBaselineCalcEnd(timestamp)),
		submitNewBaseline: () => dispatch(submitNewBaselineIfNeeded())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BaselineCreationComponent);
