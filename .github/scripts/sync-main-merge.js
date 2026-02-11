const prBody = process.env.PR_BODY || "";
const newVersion = process.env.NEW_VERSION || "";
const oldVersion = process.env.OLD_VERSION || "";

const backendSecretKey = process.env.BACKEND_SECRET || "";

if (backendSecretKey === "") {
    console.error("Backend secret not found.");
    process.exit(1);
}

const dataPackage = {
    version: newVersion,
    oldVersion: oldVersion,
    prBody: prBody,
    timestamp: new Date().toISOString(),
    mergedBy: process.env.GITHUB_ACTOR,
};

console.log(
    `Sending HTTP request of ${JSON.stringify(dataPackage)} to backend using key ${backendSecretKey}`,
);
process.exit(0);
