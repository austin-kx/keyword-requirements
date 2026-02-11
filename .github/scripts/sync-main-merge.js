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

// prettier-ignore
const dataPackage = {
    version: newVersion,            // String such as 1.0.0
    oldVersion: oldVersion,         // String such as 0.6.2
    repository: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF,

    title: prInfo.title,            // String
    body: prInfo.body,              // String, can be quite long
    author: prInfo.author,          // String, Github username
    mergedBy: prInfo.mergedBy,      // String, Github username
    url: prInfo.url,                // Url
    mergedAt: prInfo.mergedAt,      // Timestamp, UTC time such as 2026-02-11T18:40:57Z
};

console.log(
    `Sending HTTP request of ${JSON.stringify(dataPackage)} to backend using key ${backendSecretKey}`,
);

const res = await fetch("https://api.staging.klimagotchi.com/api/health")
    .then((res) => {
        console.log(`Received response of ${res.status}, body: ${res.body}`);
    })
    .catch((e) => {
        console.error("Failed to contact endpoint. Error: ", e);
    });

process.exit(0);
