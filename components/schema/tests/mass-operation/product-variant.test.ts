import {
    AddProductVariantOperation,
    AddProductVariantOperationSchema,
    DeleteProductVariantOperation,
    DeleteProductVariantOperationSchema,
    UpdateProductVariantOperation,
    UpdateProductVariantOperationSchema,
    UpsertProductVariantOperation,
    UpsertProductVariantOperationSchema,
} from '../../src/mass-operation/product-variant';
import { describe, expect, it } from 'vitest';

describe('Mass Operations - Product Variant', {}, async () => {
    it('accepts a minimal add variant operation', () => {
        const operation: AddProductVariantOperation = {
            intent: 'product/variant/create',
            language: 'en',
            productId: '604f7655a16b91dea030895b',
            sku: 'sku-1',
            name: 'Variant 1',
        };
        expect(AddProductVariantOperationSchema.safeParse(operation)).toEqual({
            success: true,
            data: operation,
        });
    });

    it('accepts an add variant operation with references', () => {
        const operation: AddProductVariantOperation = {
            intent: 'product/variant/create',
            language: 'en',
            productId: '604f7655a16b91dea030895b',
            sku: 'sku-1',
            name: 'Variant 1',
            isDefault: true,
            attributes: [{ attribute: 'color', value: 'red' }],
            priceVariants: [{ identifier: 'default', price: 19.99 }],
            stockLocations: [{ identifier: 'warehouse-eu', stock: 10 }],
        };
        expect(AddProductVariantOperationSchema.safeParse(operation).success).toBe(true);
    });

    it('rejects an add variant operation without sku', () => {
        const invalid = {
            intent: 'product/variant/create',
            language: 'en',
            productId: '604f7655a16b91dea030895b',
            name: 'Variant 1',
        };
        expect(AddProductVariantOperationSchema.safeParse(invalid).success).toBe(false);
    });

    it('rejects an add variant operation without productId', () => {
        const invalid = {
            intent: 'product/variant/create',
            language: 'en',
            sku: 'sku-1',
            name: 'Variant 1',
        };
        expect(AddProductVariantOperationSchema.safeParse(invalid).success).toBe(false);
    });

    it('accepts a partial update variant operation', () => {
        const operation: UpdateProductVariantOperation = {
            intent: 'product/variant/update',
            language: 'en',
            sku: 'sku-1',
            priceVariants: [{ identifier: 'default', price: 24.99 }],
        };
        expect(UpdateProductVariantOperationSchema.safeParse(operation)).toEqual({
            success: true,
            data: operation,
        });
    });

    it('rejects an update variant operation without sku', () => {
        const invalid = {
            intent: 'product/variant/update',
            language: 'en',
            name: 'New name',
        };
        expect(UpdateProductVariantOperationSchema.safeParse(invalid).success).toBe(false);
    });

    it('accepts a minimal upsert variant operation', () => {
        const operation: UpsertProductVariantOperation = {
            intent: 'product/variant/upsert',
            language: 'en',
            productId: '604f7655a16b91dea030895b',
            sku: 'sku-1',
            name: 'Variant 1',
        };
        expect(UpsertProductVariantOperationSchema.safeParse(operation)).toEqual({
            success: true,
            data: operation,
        });
    });

    it('rejects an upsert variant operation without sku', () => {
        const invalid = {
            intent: 'product/variant/upsert',
            language: 'en',
            productId: '604f7655a16b91dea030895b',
            name: 'Variant 1',
        };
        expect(UpsertProductVariantOperationSchema.safeParse(invalid).success).toBe(false);
    });

    it('accepts a delete variant operation', () => {
        const operation: DeleteProductVariantOperation = {
            intent: 'product/variant/delete',
            sku: 'sku-1',
        };
        expect(DeleteProductVariantOperationSchema.safeParse(operation)).toEqual({
            success: true,
            data: operation,
        });
    });

    it('rejects a delete variant operation without sku', () => {
        const invalid = { intent: 'product/variant/delete' };
        expect(DeleteProductVariantOperationSchema.safeParse(invalid).success).toBe(false);
    });
});
