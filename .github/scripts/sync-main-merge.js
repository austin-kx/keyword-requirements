const prBody = process.env.PR_BODY || "";

const prJson = JSON.parse(process.env.PR_JSON);

if (!prJson || prJson.length === 0) {
    console.error("Failed to load prJson");
    process.exit(1);
}

const newVersion = process.env.NEW_VERSION || "";
const oldVersion = process.env.OLD_VERSION || "";

const backendSecretKey = process.env.BACKEND_SECRET || "";

if (backendSecretKey === "") {
    console.error("Backend secret not found.");
    process.exit(1);
}

// prettier-ignore
const dataPackage = {
    secretKey: backendSecretKey,

    version: newVersion,                // String such as 1.0.0
    oldVersion: oldVersion,             // String such as 0.6.2
    repository: process.env.GITHUB_REPOSITORY,
    baseBranch: prInfo.baseBranch,
    targetBranch: prInfo.targetBranch,

    title: prJson.title,                // String
    body: prJson.body,                  // String, can be quite long
    author: prJson.user.login,          // String, Github username
    mergedBy: prJson.merged_by.login,   // String, Github username
    url: prJson.html_url,               // Url
    mergedAt: prJson.merged_at,         // Timestamp, UTC time such as 2026-02-11T18:40:57Z
};

console.log(
    `Sending HTTP request of ${JSON.stringify(dataPackage)} to backend.`,
);

const res = await fetch("https://api.staging.klimagotchi.com/api/merge", {
    method: "POST",
    body: JSON.stringify(dataPackage),
})
    .then((res) => {
        console.log(`✅ Received status code: ${res.status}`);
    })
    .catch((e) => {
        console.error("❌ Error: ", e);
    });

process.exit(0);
