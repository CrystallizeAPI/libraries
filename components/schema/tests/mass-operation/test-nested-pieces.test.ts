import { OperationsSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Mass Operations - Test parsing of Nested Piece', {}, async () => {
    it('should parse nested piece without errors and keep content', async () => {
        const validFilesDir = path.join(__dirname, './valid-files');
        const content = fs.readFileSync(`${validFilesDir}/nested-test.json`, 'utf-8');

        const structure = JSON.parse(content);
        const op = OperationsSchema.safeParse(structure);
        if (!op.success) {
            console.dir({ error: op.error }, { depth: null });
        }

        expect(op.success).toBe(true);

        expect(op.data?.operations).toHaveLength(1);

        if (!op.data) {
            throw new Error('No data found');
        }
        const operations = op.data.operations;

        const operation = operations[0];
        if (!operation) {
            throw new Error('No operation found');
        }

        expect(operation.intent).toBe('folder/create');
        if (operation.intent !== 'folder/create') {
            throw new Error('Invalid intent');
        }

        expect(operation.components).toHaveLength(1);

        const bannerPiece = operation.components?.[0]?.componentMultipleChoice?.[0]?.piece;
        expect(bannerPiece).toBeDefined();
        expect(bannerPiece?.identifier).toBe('banner');
        if (!bannerPiece) {
            throw new Error('No banner piece found');
        }

        expect(bannerPiece.components).toHaveLength(3);

        const calltoActionComp = bannerPiece.components[2];
        expect(calltoActionComp).toBeDefined();
        expect(calltoActionComp.componentId).toBe('call-to-action');
        expect(calltoActionComp.piece).toBeDefined();

        const calltoActionPiece = calltoActionComp.piece!;
        expect(calltoActionPiece.identifier).toBe('call-to-action');
        expect(calltoActionPiece.components).toHaveLength(1);
        expect(calltoActionPiece.components[0].componentId).toBe('action');
        expect(calltoActionPiece.components[0].contentChunk).toBeDefined();
    });
});
