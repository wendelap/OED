/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from 'react-redux';
import DashboardComponent from '../components/DashboardComponent';
import { fetchAllBaselines } from '../actions/baselines';

function mapStateToProps(state) {
	return {
		chartToRender: state.graph.chartToRender,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchAllBaselines: () => dispatch(fetchAllBaselines())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
