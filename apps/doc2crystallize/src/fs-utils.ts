import fs from 'fs';

export function isFileExists(path: string): boolean {
    return fs.existsSync(path);
}

export function loadFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(content);
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
}
