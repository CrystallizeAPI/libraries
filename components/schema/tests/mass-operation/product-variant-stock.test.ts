import { OperationSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Product variant stock', () => {
    const operation = {
        intent: 'product/variant/stock/modify',
        sku: 'chair-001',
        stockLocationIdentifier: 'default',
        operation: 'overwrite',
    };

    it('accepts overwriting the stock with 0', () => {
        expect(OperationSchema.safeParse({ ...operation, quantity: 0 }).success).toBe(true);
    });

    it('rejects a negative quantity', () => {
        expect(OperationSchema.safeParse({ ...operation, quantity: -1 }).success).toBe(false);
    });

    it('rejects a non-integer quantity', () => {
        expect(OperationSchema.safeParse({ ...operation, quantity: 1.5 }).success).toBe(false);
    });
});
