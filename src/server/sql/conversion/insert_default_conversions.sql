/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

INSERT INTO conversions (resource_type, unit_name, conversion_factor)
VALUES ('energy', 'kwh', 1),
	('energy', 'btu', 0.0002930711111),
	('energy', 'kbtu', 0.2930711111);
/* Add more default conversions later. */
