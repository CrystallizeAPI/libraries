import { OperationSchema } from '../../src/mass-operation/index';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Price list selected product variants', () => {
    it('accepts empty lists', () => {
        expect(
            OperationSchema.safeParse({
                intent: 'pricelist/selectedProductVariants/upsert',
                identifier: 'pl-eur-spring',
                variants: [],
            }).success,
        ).toBe(true);
        expect(
            OperationSchema.safeParse({
                intent: 'pricelist/selectedProductVariants/remove',
                identifier: 'pl-eur-spring',
                skus: [],
            }).success,
        ).toBe(true);
    });

    it('rejects a remove with an empty sku', () => {
        const result = OperationSchema.safeParse({
            intent: 'pricelist/selectedProductVariants/remove',
            identifier: 'pl-eur-spring',
            skus: [''],
        });
        expect(result.success).toBe(false);
    });
});
