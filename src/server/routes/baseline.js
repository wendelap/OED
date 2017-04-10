/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const express = require('express');
const _ = require('lodash');
const Meter = require('../models/Meter');
const Reading = require('../models/Reading');
const Reading = require('../models/Baseline');
const TimeInterval = require('../../common/TimeInterval');

const router = express.Router();

router.get('/value:meter_id', async (req, res) => {
	try {
		const baseline = await Baseline.getByID(req.params.meter_id);
		res.send(baseline.baseline_value);
	} catch (err) {
		console.error(`Error while performing get: ${err}`);

});
