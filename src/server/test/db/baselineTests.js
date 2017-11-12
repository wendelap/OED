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
const mocha = require('mocha');

mocha.describe('Groups', () => {
	mocha.beforeEach(recreateDB);
	mocha.it('can be saved and retrieved', async () => {

	});
});
