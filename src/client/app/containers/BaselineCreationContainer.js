/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { connect } from 'react-redux';
import { newBaseline } from '../actions/baselines';
import BaselineCreationComponent from '../components/BaselineCreationComponent';


function mapDispatchToProps(dispatch) {
	return {
		createNewBaseline: newBaselineInfo => dispatch(newBaseline(newBaselineInfo))
	};
}

export default connect(mapDispatchToProps)(BaselineCreationComponent);
