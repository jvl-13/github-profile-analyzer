const axios = require("axios");

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json"
};

async function getRepo(owner, repo) {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    return res.data;
}

async function getLanguages(owner, repo) {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
    return res.data;
}

// Dùng /contents thay vì recursive tree để tránh repo lớn bị 403
async function getFileTree(owner, repo, branch = "main") {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`, { headers });
    return res.data;
}

async function getReadme(owner, repo) {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
    const buff = Buffer.from(res.data.content, "base64");
    return buff.toString("utf-8");
}

module.exports = { getRepo, getLanguages, getFileTree, getReadme };