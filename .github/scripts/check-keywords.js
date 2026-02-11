const prBody = process.env.PR_BODY || "";

// One of these must be included, preferably some from both groups
const broadKeywords = ["new-feature", "bug-fix", "redesign"];
const screens = ["main", "shop", "settings", "goals"];
const targets = ["auth", "game-logic", "payments", "visuals", "devops"];
const keywords = [...broadKeywords, ...screens];

const foundKeywords = keywords.filter((k) => {
    const regex = new RegExp(`\\b${k}\\b`, "i");
    return regex.test(prBody);
});

if (foundKeywords.length === 0) {
    console.error(
        `Keyword Check: PR body must include keywords describing changes. Include a broad keyword ${broadKeywords}, with a screen ${screens}, or targets ${targets}`,
    );
    process.exit(1);
}

console.log(`Keyword Check: Keywords ${keywords} found`);

// --- TODO: Store the PR information, and keywords into the app database ---

process.exit(0);
