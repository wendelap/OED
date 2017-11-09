/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const express = require('express');
const Baseline = require('../models/Baseline');
const log = require('../log');

const router = express.Router();


router.get('/values', async (req, res) => {
	try {
		const rawBaselines = await Baseline.getBaselines();
		res.send(rawBaselines);
	} catch (err) {
		log(`Error while getting baselines for meters: ${err}`, 'error');
	}
});

router.post('/newBaseline', async (req, res) => {
	console.error(req.body);
	try {
		const average = await Baseline.getAverage(req.body.toSend.date);
		req.body.toSend.baselineInfo.baseline_value = average.avg;
		await Baseline.newBaseline(req.body.toSend.baselineInfo);
		res.send(average);
	} catch (err) {
		log(`Error while adding baseline: ${err}`, 'error');
	}
});

router.post('/average', async (req, res) => {
	try {
		const average = await Baseline.getAverage(req.body);
		res.send(average);
	} catch (err) {
		log(`Error while calculating average: ${err}`, 'error');
	}
});

module.exports = router;
