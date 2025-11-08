import { OperationsSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Mass Operations - Check sets of files', {}, async () => {
    const validFilesDir = path.join(__dirname, './valid-files');
    const files = fs.readdirSync(validFilesDir);
    files.forEach((file) => {
        // const file = 'mass-ops9.json';
        it(`${file} should pass without altering content`, () => {
            const filePath = path.join(validFilesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const structure = JSON.parse(content);
            const result = OperationsSchema.safeParse(structure);

            if (!result.success) {
                console.dir({ error: result.error }, { depth: null });
            }
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(structure);
            }
        });
    });
});
