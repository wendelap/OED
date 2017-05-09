/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const express = require('express');
const _ = require('lodash');
const Meter = require('../models/Meter');
const Reading = require('../models/Reading');
const Baseline = require('../models/Baseline');
const TimeInterval = require('../../common/TimeInterval');

const router = express.Router();


router.get('/values', async (req, res) => {
	try {
		const rawBaselines = await Baseline.getBaselines();
		res.send(rawBaselines);
	} catch (err) {
		console.error(`Error while getting baselines for meters: ${err}`);
	}
});

router.post('/newBaseline', async (req, res) => {
	console.error(req.body);	
	try {
		const average = await Baseline.getAverage(req.body.toSend.date);		
		req.body.toSend.baselineInfo['baseline_value'] = average.avg;		
		await Baseline.newBaseline(req.body.toSend.baselineInfo);
		res.send(average);
	} catch (err) {
		console.error(`Error while adding baseline: ${err}`);
	}
});

router.post('/average', async (req, res) => {
	try {
		const average = await Baseline.getAverage(req.body);
		res.send(average);
	} catch (err) {
		console.error(`Error while calculating average: ${err}`);
	}
});

module.exports = router;
