/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

-- create baseline table
CREATE TABLE baseline (
	meter_id INT NOT NULL REFERENCES meters (id),
	apply_start TIMESTAMP NOT NULL,
	apply_end TIMESTAMP,
	calc_start TIMESTAMP,
	calc_end TIMESTAMP,
	baseline_value DOUBLE PRECISION NOT NULL,
	PRIMARY KEY (meter_id, apply_start)
);
