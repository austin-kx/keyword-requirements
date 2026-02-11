const prBody = process.env.PR_BODY || "";

const prJson = JSON.parse(process.env.PR_JSON);

if (!prJson || prJson.length === 0) {
    console.error("Failed to load prJson");
    process.exit(1);
}

const prInfo = {
    title: prJson.title,
    body: prJson.body,
    author: prJson.user.login,
    mergedBy: prJson.merged_by.login,
    url: prJson.html_url,
    mergedAt: prJson.merged_at,
};

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
    prInfo: prInfo,
};

console.log(
    `Sending HTTP request of ${JSON.stringify(dataPackage)} to backend using key ${backendSecretKey}`,
);
process.exit(0);
