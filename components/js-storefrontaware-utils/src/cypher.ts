import crypto from 'crypto';

export function encryptValue(value: string, secretKey: string, algorithm: string): string {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
    let encryptedData = cipher.update(value, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return `${initVector.toString('hex')}:${encryptedData}`;
}

export function decryptValue(value: string, secretKey: string, algorithm: string): string {
    if (value?.includes(':')) {
        const [initVector, encryptedData] = value.split(':');
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(initVector, 'hex'));
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }
    return value || '';
}

/**
 * Create encrypt/decrypt/decryptMape methods based on supplied escret
 */
export const cypher = (
    secret: string,
): {
    encrypt: (value: string) => string;
    decrypt: (value: string) => string;
    decryptMap: (map: { [key: string]: string }) => { [key: string]: string };
} => {
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
    const algorithm = 'aes-256-cbc';

    const encrypt = (value: string) => encryptValue(value, key, algorithm);
    const decrypt = (value: string) => decryptValue(value, key, algorithm);

    return {
        encrypt,
        decrypt,
        decryptMap: (map: { [key: string]: string }) => {
            let result = {};
            Object.keys(map).forEach((key: string) => {
                result = {
                    ...result,
                    [key]: decrypt(map[key]),
                };
            });
            return result;
        },
    };
};
