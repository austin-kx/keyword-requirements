# Storing Version and PR Information Using Actions

There are 2 workflows in this repo.

### pre-merge-checks

_check--version.js | check_keywords.js_

This runs each time a PR is created that attempts to merge into master. Right now it just checks to ensure that the VERSION defined in [VERSION](./VERSION) is greater than the one in main. It could also check to ensure that keywords were included if we take that approach.

### post-merge-sync

_sync-main-merge.js_

This runs each time a PR is merged into main. It extracts information from the PR and is ready to send it off to a database. It utilizes a **repository secret** which would be shared between the API and this repo.
