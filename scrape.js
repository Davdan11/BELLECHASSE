const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const https = require('https');

const baseURL = 'https://chauffagethermopompeclimatisation.ca/';
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Failed to get ${url} (${res.statusCode})`);
                resolve();
                return;
            }
            const fileStream = fs.createWriteStream(filename);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => {});
            console.error(`Error downloading ${url}: ${err.message}`);
            resolve();
        });
    });
};

const run = async () => {
    try {
        const response = await fetch(baseURL);
        const html = await response.text();
        const $ = cheerio.load(html);
        
        const downloads = [];
        
        $('img').each((i, el) => {
            let src = $(el).attr('src') || $(el).attr('data-src');
            if (src) {
                if (src.startsWith('/')) {
                    src = baseURL.slice(0, -1) + src;
                } else if (!src.startsWith('http')) {
                    src = baseURL + src;
                }
                
                const urlObj = new URL(src);
                const filename = path.basename(urlObj.pathname);
                if (filename) {
                    downloads.push(downloadImage(src, path.join(publicDir, filename)));
                }
            }
        });
        
        await Promise.allSettled(downloads);
        console.log('Finished downloading images.');
    } catch (e) {
        console.error(e);
    }
};

run();
