/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const database = require('./database');

const db = database.db;
const sqlFile = database.sqlFile;

class Baseline {

	constructor(meterID, applyStart, applyEnd, calcStart, calcEnd) {
		this.meterID = meterID;
		this.applyStart = applyStart;
		this.applyEnd = applyEnd;
		this.calcStart = calcStart;
		this.calcEnd = calcEnd;
	}

	static createTable() {
		return db.none(sqlFile('baseline/create_baseline_table.sql'));
	}

	static mapRow(row) {
		return new Baseline(row.meter_id, row.apply_start, row.apply_end, row.calc_start, row.calc_end, row.baseline_value);
	}

	async insert(conn = db) {
		await conn.none(sqlFile('baseline/new_baseline.sql'), {
			meter_id: this.meterID,
			apply_start: this.applyStart,
			apply_end: this.applyEnd,
			calc_start: this.calcStart,
			calc_end: this.calcEnd,
			baseline_value: this.baselineValue
		});
	}

	static async getAllForMeterID(meterID, conn = db) {
		const row = await conn.any(sqlFile('baseline/get_baselines_by_meter_id.sql'), { meter_id: meterID });
		return Baseline.mapRow(row);
	}

	static async getAllBaselines(conn = db) {
		const rows = await conn.any(sqlFile('baseline/get_baselines_by_ids.sql'));
		return rows.map(Baseline.mapRow);
	}

	async getAverage(conn = db) {
		const average = await conn.one(sqlFile('baseline/get_average_reading.sql'), {
			meter_id: this.meterID,
			start: this.calcStart,
			end: this.calcEnd
		});
		// average is of the form { avg: '2.7925725' }, hence this line
		const parsedAvg = parseInt(average.avg);
		if (isNaN(parsedAvg)) {
			throw Error(`Returned average reading for baseline could not be parsed as a number ${average}`);
		}
		this.baselineValue = parseInt(average.avg);
	}

}

module.exports = Baseline;
