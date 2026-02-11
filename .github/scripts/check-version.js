const pr_ver = process.env.PR_VERSION || "";
const main_ver = process.env.MAIN_VERSION || "";

if (main_ver === "") {
    console.error("Error: main branch is missing VERSION");
    process.exit(1);
}

if (pr_ver === "") {
    console.error("Error: PR is missing VERSION");
    process.exit(1);
}

function isHigher(v1, v2) {
    const p1 = v1.split(".").map(Number);
    const p2 = v2.split(".").map(Number);

    for (let i = 0; i < 3; i++) {
        if (p1[i] > p2[i]) return true;
        if (p1[i] < p2[i]) return false;
    }
    return false;
}

if (!isHigher(pr_ver, main_ver)) {
    console.error(
        `Error: PR version ${pr_ver} is not higher than main version ${main_ver}`,
    );
    process.exit(1);
}

console.log(`Version check passed, ${main_ver} -> ${pr_ver}`);
