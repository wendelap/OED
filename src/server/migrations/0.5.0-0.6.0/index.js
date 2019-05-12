/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('../../models/database');
const sqlFile = database.sqlFile;

module.exports = {
	fromVersion: '0.5.0',
	toVersion: '0.6.0',
	up: async db => {
		await db.none(sqlFile('../migrations/0.5.0-0.6.0/sql/preferences/create_timezone_types_enum.sql'));
		await db.none(sqlFile('../migrations/0.5.0-0.6.0/sql/preferences/add_timezone_column.sql'));
	}
};
