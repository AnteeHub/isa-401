# Source and classroom adaptation

Source: https://github.com/nemozjh/SwimComposer/tree/135f1740a439e0308eacc33dd1d5dcf47c219d6a/swimcomposer_sourcecode

The complete interactive frontend, original authoring preset, bundled libraries and compact race assets are retained. The upstream data-generation pipeline and automated stamp-review environment are not needed for classroom exploration and are not bundled here. The original repository remains the source for those materials. This is not a new replication stamp or a claim of Windows validation.

One change in src/app/main.js makes Current State JSON export use the application's existing JSON download function on all browsers. The upstream native file picker uses an ID longer than Chromium's limit for this competition. This change also avoids needing that browser-specific picker. Nothing is written back into the preset automatically; download, then use Import JSON Settings to restore. UPSTREAM_MANIFEST.json records the original file hashes.

The original research repository and the simplified historical classroom copy were not edited. Preserve LICENSE and NOTICE.txt. Run this copy through ../serve_reference.py, not file://; its modules and data loading require HTTP. The supplied server supports media byte-range requests.
