/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const recreateDB = require('./common').recreateDB;
const Baseline = require('../../models/Baseline');
const Meter = require('../../models/Meter');
const Reading = require('../../models/Reading');
const mocha = require('mocha');
const moment = require('moment');

mocha.describe('Baselines', () => {
	mocha.beforeEach(recreateDB);
	mocha.it('can be saved and retrieved', async () => {
		// Need
		// a meter in the database
		const meter = new Meter(undefined, 'Larry', null, false, Meter.type.MAMAC);
		await meter.insert();

		const reading = new Reading(
			meter.id,
			1,
			moment('1850-01-01'),
			moment('1850-02-01')
		);
		await reading.insert();
		const baseline = new Baseline(
			meter.id,
			'1970-01-01',
			'2069-12-31',
			'1800-01-01',
			'1899-12-31'
		);
		await baseline.getAverage();
		await baseline.insert();
		const retrievedBaseline = await Baseline.getAllForMeterID(meter.id);
		console.log(retrievedBaseline);
		expect(retrievedBaseline).to.deep.equal(baseline);
	});
});
