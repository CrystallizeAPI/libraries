import { OperationsSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Mass Operations - Check sets of files', {}, async () => {
    const validFilesDir = path.join(__dirname, './valid-files');
    const files = fs.readdirSync(validFilesDir);
    files.forEach((file) => {
        it(`${file} should pass`, () => {
            const filePath = path.join(validFilesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const structure = JSON.parse(content);
            const op = OperationsSchema.safeParse(structure);
            if (!op.success) {
                console.dir({ error: op.error }, { depth: null });
            }

            expect(op.success).toBe(true);
        });
    });
});
