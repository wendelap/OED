/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

SELECT apply_start, apply_end, calc_start, calc_end, baseline_value FROM baseline WHERE meter_id=${id};
