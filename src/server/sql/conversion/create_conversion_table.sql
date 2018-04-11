/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

-- create conversion table
CREATE TABLE IF NOT EXISTS conversion (
	id SERIAL PRIMARY KEY,
	resource_type VARCHAR(20) NOT NULL,
	unit_name VARCHAR(20) NOT NULL,
	conversion_factor FLOAT NOT NULL
);
