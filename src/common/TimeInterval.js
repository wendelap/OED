/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const moment = require('moment');

class TimeInterval {
	constructor(startTimestamp, endTimestamp) {
		this.startTimestamp = startTimestamp && moment.utc(startTimestamp);
		this.endTimestamp = endTimestamp && moment.utc(endTimestamp);
		this.isBounded = (this.startTimestamp !== null) && (this.endTimestamp !== null);
	}

	toString() {
		if (this.isBounded) {
			// Using '_' as a separator character since it doesn't appear in ISO dates
			return `${this.startTimestamp.format()}_${this.endTimestamp.format()}`;
		}
		return 'all';
	}

	equals(other) {
		return (other instanceof TimeInterval) && this.toString() === other.toString();
	}

	/**
	 * Test if this time interval is contains another.
	 * Intervals are considered to contain equal intervals.
	 * @param other
	 * @return {boolean}
	 */
	contains(other) {
		if (!(other instanceof TimeInterval)) {
			throw new Error('TimeInterval objects can only be compared to other TimeInterval objects');
		}
		/* The logic here is:
		 *
		 * THIS starts at -∞ OR not after OTHER
		 * AND
		 * THIS ends at +∞ OR not before OTHER
		 */
		return (
			((this.startTimestamp === null) || (this.startTimestamp <= other.startTimestamp))
			&&
			((this.endTimestamp === null) || (this.endTimestamp >= other.endTimestamp))
		);
	}

	/**
	 * Returns TimeInterval.toString() so that using a time interval as an object key will
	 * have reasonable behaviour.
	 * @return {*}
	 */
	valueOf() {
		return this.toString();
	}

	/**
	 * Creates a new unbounded time interval
	 * @return {TimeInterval}
	 */
	static unbounded() {
		return new TimeInterval(null, null);
	}

	/**
	 * Creates a new TimeInterval from its string representation
	 * @param {string} stringified the string representation
	 * @return {TimeInterval}
	 */
	static fromString(stringified) {
		if (stringified === 'all') {
			return TimeInterval.unbounded();
		}
		// Using '_' as a separator character since it doesn't appear in ISO dates
		const [startTimestamp, endTimestamp] = stringified.split('_').map(timestamp => moment(timestamp));
		return new TimeInterval(startTimestamp, endTimestamp);
	}
}

module.exports = TimeInterval;
