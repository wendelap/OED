/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { mocha, expect, testDB } = require('../common');
const moment = require('moment');
const path = require('path');
const Reading = require('../../models/Reading');
const Meter = require('../../models/Meter');
const loadMamacReadingsFromCsvFile = require('../../services/loadMamacReadingsFromCsvFile');

mocha.describe('Insert Mamac readings from a file', () => {
	let meter;
	mocha.beforeEach(async () => {
		conn = testDB.getConnection();
		await new Meter(undefined, 'Meter', null, false, true, Meter.type.MAMAC, Timezone.type.CENTRAL).insert(conn);
		meter = await Meter.getByName('Meter', conn);
	});

	mocha.it('loads the correct number of rows from a file', async () => {
		conn = testDB.getConnection();
		const testFilePath = path.join(__dirname, 'data', 'test-readings.csv');
		const readingDuration = moment.duration(1, 'hours');
		await loadMamacReadingsFromCsvFile(testFilePath, meter, readingDuration, conn);
		const count = await Reading.count(conn);
		expect(count).to.equal(20);
	});

	mocha.it('errors correctly on an invalid file', async () => {
		conn = testDB.getConnection();
		const testFilePath = path.join(__dirname, 'data', 'test-readings-invalid.csv');
		const readingDuration = moment.duration(1, 'hours');
		return expect(loadMamacReadingsFromCsvFile(testFilePath, meter, readingDuration, conn)).to.eventually.be.rejected;
	});

	mocha.it('rolls back correctly when it rejects', async () => {
		conn = testDB.getConnection();
		const testFilePath = path.join(__dirname, 'data', 'test-readings-invalid.csv');
		const readingDuration = moment.duration(1, 'hours');
		try {
			await loadMamacReadingsFromCsvFile(testFilePath, meter, readingDuration, conn);
		} catch (e) {
			const count = await Reading.count(conn);
			expect(count).to.equal(0);
		}
	});
});
