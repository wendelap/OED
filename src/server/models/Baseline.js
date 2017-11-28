/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */


const database = require('./database');
const TimeInterval = require('../../common/TimeInterval');
const _ = require('lodash');

const db = database.db;
const sqlFile = database.sqlFile;

class Baseline {

	constructor(meterID, applyStart, applyEnd, calcStart, calcEnd, baselineValue = null) {
		this.meterID = meterID;
		this.applyRange = new TimeInterval(applyStart, applyEnd);
		this.calcRange = new TimeInterval(calcStart, calcEnd);
		this.baselineValue = baselineValue;
	}

	static createTable() {
		return db.none(sqlFile('baseline/create_baseline_table.sql'));
	}

	static formatTSRange(rangeString) {
		// todo: this is a hack that I intend to replace
		return _.split(rangeString.substring(1, rangeString.length - 1), ',').map(s => _.trim(s, ' "'));
	}

	static mapRow(row) {
		const applyRange = Baseline.formatTSRange(row.apply_range);
		const calcRange = Baseline.formatTSRange(row.calc_range);
		return new Baseline(row.meter_id, applyRange[0], applyRange[1], calcRange[0], calcRange[1], row.baseline_value);
	}

	async insert(conn = db) {
		this.baselineValue = await conn.one(sqlFile('baseline/new_baseline.sql'), {
			meter_id: this.meterID,
			apply_start: this.applyRange.startTimestamp,
			apply_end: this.applyRange.endTimestamp,
			calc_start: this.calcRange.startTimestamp,
			calc_end: this.calcRange.endTimestamp
		});
	}

	static async getAllForMeterID(meterID, conn = db) {
		const rows = await conn.any(sqlFile('baseline/get_baselines_by_meter_id.sql'), { meter_id: meterID });
		console.log(rows);
		return rows.map(row => Baseline.mapRow(row));
	}

	static async getAllBaselines(conn = db) {
		const rows = await conn.any(sqlFile('baseline/get_baselines_by_ids.sql'));
		return rows.map(row => Baseline.mapRow(row));
	}

}

module.exports = Baseline;
