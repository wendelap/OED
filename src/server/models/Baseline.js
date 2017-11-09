/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const database = require('./database');

const db = database.db;
const sqlFile = database.sqlFile;

class Baseline {

	constructor(meterID, applyStart, applyEnd, calcStart, calcEnd, baselineValue) {
		this.meter_id = meterID;
		this.apply_start = applyStart;
		this.apply_end = applyEnd;
		this.calc_start = calcStart;
		this.calc_end = calcEnd;
		this.baseline_value = baselineValue;
	}

	static createTable() {
		return db.none(sqlFile('baseline/create_baseline_table.sql'));
	}

	static async getByID(id, conn = db) {
		const row = await conn.one(sqlFile('baseline/get_baseline_by_id.sql'), { id: id });
		return Baseline.baselineRow(row);
	}

	static async getBaselines(conn = db) {
		const rows = await conn.any(sqlFile('baseline/get_baselines_by_ids.sql'));
		return rows.map(Baseline.baselineRow);
	}

	static async newBaseline(details, conn = db) {
		await conn.none(sqlFile('baseline/new_baseline.sql'), details);
	}

	static async getAverage(constraint, conn = db) {
		console.error(constraint);
		return await conn.one(sqlFile('baseline/get_average_reading.sql'), constraint);
	}

	static baselineRow(row) {
		return new Baseline(row.meter_id, row.apply_start, row.apply_end, row.calc_start, row.calc_end, row.baseline_value);
	}

}

module.exports = Baseline;
