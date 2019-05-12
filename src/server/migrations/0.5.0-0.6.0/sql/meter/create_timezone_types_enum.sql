/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

DO $$ BEGIN
    CREATE TYPE timezone_type AS ENUM('et', 'ct', 'mt', 'pt');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;