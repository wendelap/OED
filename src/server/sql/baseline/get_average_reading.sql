/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

-- todo: this should be replaced by asking the original compressed readings function for 1 point over the time range

SELECT avg(reading) FROM readings
WHERE start_timestamp >= ${start}
			AND end_timestamp <= ${end}
			AND meter_id = ${meter_id};
