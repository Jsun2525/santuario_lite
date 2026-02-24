const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
    { name: 'StyleGuide', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzI1YTM4ODBkMDVhMTQ5N2NiYWQ5ZWJlN2E3YjA2NWM1EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Dashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RkZWQ1MTdlNmE5MTQzZjA5ODAyOWJiZTlkMWE1YjE0EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'JapaMala', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2YxYmJjYWE5ZjVmMzQ2YzhhZDU4MGM1MWM3ZWMxZGY2EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Auth', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Q0NDUzYTUwZDY3ZDQwYzg5MDkyZWE1ODI4ZmNhYTU1EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Journal', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzRjYmM0NDMyMmI0MjRjMGFiNzZhNjM0MTk1ZWIwNGZjEgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Oracle', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FhYzI3NWFlM2VjMTQzZTBhNWI2Y2QyYjI2YWQ0ZGZlEgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Library', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2E4MmE0MDM3ZjE1YjRkZjViMGY2OTJlOTA5NDQyMzczEgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Profile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzUyY2Q3NDA1MzMyMTRjODBhNzNjNGRlOWQxZDEzMDU1EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Gratitude', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzJmNWE4OWYxY2FmNTQxMmFiZTkzYWZjOTJhOTIzYTE5EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' },
    { name: 'Binaural', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzgzOGFjOTZiNzg2OTRhNTRhOTgzNWY3YWRmOTg5M2U2EgsSBxCb1eLmmwwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNDU1MDM2OTUxNjEyOTMxOQ&filename=&opi=89354086' }
];

const download = (screen) => {
    return new Promise((resolve, reject) => {
        const dest = path.join(__dirname, 'stitch_screens', `${screen.name}.html`);
        const file = fs.createWriteStream(dest);
        https.get(screen.url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const run = async () => {
    if (!fs.existsSync(path.join(__dirname, 'stitch_screens'))) {
        fs.mkdirSync(path.join(__dirname, 'stitch_screens'));
    }
    for (const s of screens) {
        console.log(`Downloading ${s.name}...`);
        await download(s);
        console.log(`Finished ${s.name}`);
    }
};

run().catch(console.error);
