/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('./database');

const db = database.db;
const sqlFile = database.sqlFile;

class Conversion {
	/**
	 * @param id should be undefined when creating a new migration
	 * @param fromVersion current version
	 * @param toVersion version want to update to
	 * @param updateTime time when migrate database
	 */
	constructor(id, resourceType, unitName, conversionFactor) {
		this.id = id;
		this.resourceType = resourceType;
		this.unitName = unitName;
		this.conversionFactor = conversionFactor;
	}

	/**
	 * Returns a promise to create the migration table.
	 * @return {Promise.<>}
	 */
	static async createTable() {
		await db.none(sqlFile('conversion/create_conversion_table.sql'));
		await db.none(sqlFile('conversion/insert_default_conversions.sql'));
	}

	static createResourceTypesEnum() {
		return db.none(sqlFile('conversion/create_resource_types_enum.sql'));
	}

	static async insert(conn = db) {
		const conversion = this;
		if (conversion.id !== undefined) {
			throw new Error('Attempt to insert conversion that already has an id.')
		}
		const resp = await conn.one(sqlFile('conversion/insert_new_conversion.sql'), conversion);
		this.id = resp.id;
	}

	/**
	 * Returns a promise to get all of the conversions from the database
	 * @returns {Promise.<Conversion>}
	 */
	static async getAll() {
		const rows = await db.any(sqlFile('migration/get_all_conversions.sql'));
		if (rows.length > 0) {
			return rows.map(row => new Conversion(row.id, row.resourct_type, row.unit_name, row.conversion_factor));
		} else {
			throw new Error('There is no item in conversion table or table does not exists');
		}
	}

	/**
	 * Returns a promise to retrieve the meter with the given id from the database.
	 * @param id the id of the meter to retrieve
	 * @returns {Promise.<Conversion>}
	 */
	static async getAllByResource(resourceType) {
		const rows = await conn.any(sqlFile('conversion/get_conversions_by_type.sql'), { resourceType: resourceType});
		return rows.map(Conversion.mapRow)
	}

	static async getConversionByResourceAndUnit(resourceType, unitName) {
		const row = await conn.one(sqlFile('conversion/get_conversion_by_type_and_unit.sql'),
			{resource_type: resourceType, unit_name: unitName});
		return Conversion.mapRow(row);
	}

	static mapRow(row) {
		return new Conversion(row.id, row.resourceType, row.unitName, row.conversionFactor);
	}
}

Conversion.resourceType = {
	ENERGY: 'energy',
	TEMPERATURE: 'temperature',
	PRESSURE: 'pressure',
	VOLUME: 'volume',
	FLOW_RATE: 'flow_rate',
	MASS: 'mass',
	POWER: 'power'
};

module.exports = Conversion;
