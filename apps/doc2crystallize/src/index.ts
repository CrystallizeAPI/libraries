import { isFileExists, loadFile } from './fs-utils.js';
import md5 from 'md5';
import fetch from 'node-fetch';

const bossmanEndpoint = 'https://bossman.crystallize.com/md2crystal';

async function main(markdownFilePath: string) {
    if (!isFileExists(markdownFilePath)) {
        console.error(`File ${markdownFilePath} does not exist`);
        process.exit(1);
    }
    const markdown = await loadFile(markdownFilePath);
    const now = Math.floor(Date.now() / 1000);
    const key = md5(`${now}-X-${process.env.MARKDOWN_TO_CRYSTALLIZE_SHARED_KEY}`);
    const response = await fetch(bossmanEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'X-Secure-Value': now.toFixed(0),
            'X-Secure-Signature': key,
        },
        body: markdown,
    });
    const result: any = await response.json();
    if (result.status === 'ok') {
        console.log(
            `Publish to Crystallize: https://app.crystallize.com/@${result.tenantIdentifier}/en/catalogue/${result.type}/${result.objectId}`,
        );
    } else {
        console.error(`File was not correctly published to Crystallize`);
        if (result.error) {
            console.log(result.error);
        }
    }
}
main(process.argv[2]).catch(console.error);
