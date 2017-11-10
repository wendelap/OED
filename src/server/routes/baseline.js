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
		const rawBaselines = await Baseline.getAllBaselines();
		res.send(rawBaselines);
	} catch (err) {
		log(`Error while getting baselines for meters: ${err}`, 'error');
	}
});

router.post('/new', async (req, res) => {
	/* this function doesn't do what a reasonable person would expect --- it lies about when the average was calculated
	 * todo: Fix that.
	 */
	try {
		const average = await Baseline.getAverage(req.body.toSend.date); // date is what the user entered
		// avg over date range, give it to the weird other info from state
		req.body.toSend.baselineInfo.baselineValue = average.avg;
		// make new baseline using avg over user's date, but say it was calculated over the dates that were displayed on the graph at the time
		await Baseline.newBaseline(req.body.toSend.baselineInfo);
		res.send(average); // send back avg over user's entered date range
	} catch (err) {
		log(`Error while adding baseline: ${err}`, 'error');
	}
});

// todo: decide if this route should exist (it's weird!)
router.post('/average', async (req, res) => {
	try {
		// todo: this definitely should not be just forwarding the entire request body
		const average = await Baseline.getAverage(req.body);
		res.send(average);
	} catch (err) {
		log(`Error while calculating average: ${err}`, 'error');
	}
});

module.exports = router;
