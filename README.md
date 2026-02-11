# Storing Version and PR Information Using Actions

There are two different actions this repo performs. The first is a check that is run before allowing merges into the main branch (or any of your choosing), the second extracts the PR information from anything merged into main and sends it to our API.

## Setup

### Repository Structure

Within the repository which is implementing these actions you should have the following

1. At the root of your file structure paste the .github directory from this project.

2. Within the 2 yml files in the /.github/workflows directory there are a few places where the target branch is named. Currently it is set as **master** but can be changed to whatever you want. All of them must be changed. These are highlighted with a comment containing a big arrow like this one <--------.

3. At the root of your file structure create a file (with no extension) called VERSION. In this there must be a number of the format **1.2.3**. The action only cares that a given merge into main has a higher version number than what main currently has.

### Github Setup

#### Branch Rules

After doing the above the pre-merge action will run automatically whenever a PR is opened that targets master. In order to enforce that this action must pass before a merge is completed do the following:

1. Open the repository within a web browser and navigate to Settings/Branches

2. Click _Add branch ruleset_

3. Name it whatever you want, then set the **Enforcement status** to **Active**

4. Set the **Target branches** as **Include default branch**

5. Under **Branch Rules** enable **Require status checks to pass** and then under the additional settings which should open click **Require branches to be up to date before merging** finally click **Add checks** and type in **pre-merge-main** (this is the name of the action within the pre-merge-checks.yml file)

6. Press **Create**

#### Repository Secret

The post-merge action which submits information to the database will **not** work without adding a **Repository secret** to the repo. Follow these steps to do that

1. Open the repository within a web browser and navigate to Settings/Secrets and Variables/Actions

2. Click **New repository secret**

3. Name the secret **BACKEND_VERSION_KEY** and give it a value which matches the API
