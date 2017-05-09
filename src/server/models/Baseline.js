/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('./database');
const Reading = require('./Reading');

const db = database.db;
const sqlFile = database.sqlFile;

class Baseline {

constructor(meter_id, apply_start, apply_end, calc_start, calc_end, baseline_value)
{
	this.meter_id = meter_id;
	this.apply_start=apply_start;
	this.apply_end = apply_end;
	this.calc_start = calc_start;
	this.calc_end = calc_end;
	this.baseline_value = baseline_value;

}

static createTable() {
	
	return db.none(sqlFile('baseline/create_baseline_table.sql'));

}

static async getByID(id, conn=db) {

	const row = await conn.one(sqlFile('baseline/get_baseline_by_id.sql'), {id: id});
	return Baseline.baselineRow(row);
}


static async getBaselines(conn=db) {
	const rows = await conn.any(sqlFile('baseline/get_baselines_by_ids.sql'));
	return rows.map(Baseline.baselineRow);
}

static async newBaseline(details, conn = db) {
	await conn.none(sqlFile('baseline/new_baseline.sql'), details);
}

static async getAverage(constraint, conn=db) {
	console.error(constraint);
	const value = await conn.one(sqlFile('baseline/get_average_reading.sql'), constraint);
	return value;
}

static baselineRow(row) {

	return new Baseline(row.meter_id, row.apply_start, row.apply_end, row.calc_start, row.calc_end, row.baseline_value);

}


};

module.exports = Baseline;
