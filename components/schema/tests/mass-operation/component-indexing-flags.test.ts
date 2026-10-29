import { OperationSchema } from '../../src/mass-operation/index';
import { ShapeSchema } from '../../src/pim/index';
import { describe, expect, it } from 'vitest';

/**
 * The four Discovery indexing flags were added to the component base config in crystallize-backend
 * (ab0c4e40b0, #940). The mass-operations worker runs a file through `OperationsSchema.safeParse` and
 * hands the PARSED data to the converters, so a key this schema does not declare is silently stripped
 * (zod strips unknown keys) and never reaches the API. These tests pin that the flags survive at every
 * level a component config can appear, and that an unset flag stays unset: the backend reads
 * `undefined` as "on", and `false` is the whole point.
 */
const INDEXING_FLAGS = ['searchable', 'filterable', 'sortable', 'facetable'] as const;

const allOff = { searchable: false, filterable: false, sortable: false, facetable: false };
const mixed = { searchable: false, filterable: true, sortable: false, facetable: true };

const expectRoundTrip = (operation: unknown) => {
    const result = OperationSchema.safeParse(operation);
    if (!result.success) {
        console.dir({ error: result.error }, { depth: null });
    }
    expect(result.success).toBe(true);
    expect(result.data).toEqual(operation);
};

describe('Mass Operations - Component indexing flags', () => {
    it('minimal: keeps the four flags on one shape component without altering the operation', () => {
        expectRoundTrip({
            intent: 'shape/upsert',
            type: 'product',
            identifier: 'chair',
            name: 'Chair',
            components: [
                {
                    id: 'title',
                    name: 'Title',
                    type: 'singleLine',
                    config: { singleLine: { required: true, discoverable: true, ...mixed } },
                },
            ],
        });
    });

    it('keeps the flags on every component type, whichever way its config schema derives from the base', () => {
        expectRoundTrip({
            intent: 'shape/create',
            type: 'document',
            identifier: 'kitchen-sink',
            name: 'Kitchen sink',
            components: [
                { id: 'boolean', name: 'Boolean', type: 'boolean', config: { boolean: { ...allOff } } },
                { id: 'datetime', name: 'Datetime', type: 'datetime', config: { datetime: { ...mixed } } },
                { id: 'location', name: 'Location', type: 'location', config: { location: { ...allOff } } },
                {
                    id: 'rich-text',
                    name: 'Rich text',
                    type: 'richText',
                    config: { richText: { min: 1, max: 3, ...mixed } },
                },
                {
                    id: 'single-line',
                    name: 'Single line',
                    type: 'singleLine',
                    config: { singleLine: { pattern: '^[a-z]+$', ...allOff } },
                },
                { id: 'images', name: 'Images', type: 'images', config: { images: { ...mixed } } },
                { id: 'videos', name: 'Videos', type: 'videos', config: { videos: { ...allOff } } },
                {
                    id: 'files',
                    name: 'Files',
                    type: 'files',
                    config: { files: { maxFileSize: { size: 10, unit: 'MiB' }, ...mixed } },
                },
                { id: 'grids', name: 'Grids', type: 'gridRelations', config: { gridRelations: { ...allOff } } },
                {
                    id: 'numeric',
                    name: 'Numeric',
                    type: 'numeric',
                    config: { numeric: { decimalPlaces: 2, units: ['cm'], ...mixed } },
                },
                {
                    id: 'specs',
                    name: 'Specs',
                    type: 'propertiesTable',
                    config: { propertiesTable: { sections: [{ title: 'Dimensions', keys: ['width'] }], ...allOff } },
                },
                { id: 'colors', name: 'Colors', type: 'colors', config: { colors: { requireLabel: true, ...mixed } } },
                {
                    id: 'material',
                    name: 'Material',
                    type: 'selection',
                    config: { selection: { options: [{ key: 'oak', value: 'Oak' }], ...allOff } },
                },
                {
                    id: 'related',
                    name: 'Related',
                    type: 'itemRelations',
                    config: { itemRelations: { acceptedShapeIdentifiers: ['chair'], ...mixed } },
                },
                {
                    id: 'story',
                    name: 'Story',
                    type: 'paragraphCollection',
                    config: { paragraphCollection: { multilingual: ['body'], ...allOff } },
                },
                { id: 'seo', name: 'SEO', type: 'piece', config: { piece: { identifier: 'seo', ...mixed } } },
            ],
        });
    });

    it('keeps the flags on structural components, on what they nest, and on variant components', () => {
        expectRoundTrip({
            intent: 'shape/upsert',
            type: 'product',
            identifier: 'chair',
            name: 'Chair',
            components: [
                {
                    id: 'dimensions',
                    name: 'Dimensions',
                    type: 'contentChunk',
                    config: {
                        contentChunk: {
                            repeatable: true,
                            ...mixed,
                            components: [
                                { id: 'width', name: 'Width', type: 'numeric', config: { numeric: { ...allOff } } },
                            ],
                        },
                    },
                },
                {
                    id: 'hero',
                    name: 'Hero',
                    type: 'componentChoice',
                    config: {
                        componentChoice: {
                            ...allOff,
                            choices: [
                                { id: 'image', name: 'Image', type: 'images', config: { images: { ...mixed } } },
                                { id: 'video', name: 'Video', type: 'videos', config: { videos: { ...allOff } } },
                            ],
                        },
                    },
                },
                {
                    id: 'blocks',
                    name: 'Blocks',
                    type: 'componentMultipleChoice',
                    config: {
                        componentMultipleChoice: {
                            allowDuplicates: false,
                            ...mixed,
                            choices: [
                                {
                                    id: 'banner',
                                    name: 'Banner',
                                    type: 'singleLine',
                                    config: { singleLine: { ...allOff } },
                                },
                                { id: 'quote', name: 'Quote', type: 'richText', config: { richText: { ...mixed } } },
                            ],
                        },
                    },
                },
            ],
            variantComponents: [
                { id: 'color', name: 'Color', type: 'colors', config: { colors: { ...mixed } } },
                {
                    id: 'size',
                    name: 'Size',
                    type: 'selection',
                    config: { selection: { options: [{ key: 's', value: 'S' }], ...allOff } },
                },
            ],
        });
    });

    it("keeps the flags on a piece operation's components", () => {
        expectRoundTrip({
            intent: 'piece/upsert',
            identifier: 'seo',
            name: 'SEO',
            components: [
                {
                    id: 'meta-title',
                    name: 'Meta title',
                    type: 'singleLine',
                    config: { singleLine: { required: true, ...mixed } },
                },
            ],
        });
    });

    it('leaves an unset flag unset: no default is injected, so the backend keeps reading it as "on"', () => {
        const result = OperationSchema.safeParse({
            intent: 'shape/create',
            type: 'document',
            identifier: 'page',
            name: 'Page',
            components: [
                { id: 'title', name: 'Title', type: 'singleLine', config: { singleLine: { required: true } } },
            ],
        });
        expect(result.success).toBe(true);
        if (!result.success || result.data.intent !== 'shape/create') {
            throw new Error('Expected a parsed shape/create operation');
        }
        const config = result.data.components?.[0]?.config?.singleLine;
        expect(config).toEqual({ required: true });
        for (const flag of INDEXING_FLAGS) {
            expect(config).not.toHaveProperty(flag);
        }
    });

    it('keeps false distinguishable from unset', () => {
        const result = OperationSchema.safeParse({
            intent: 'shape/create',
            type: 'document',
            identifier: 'page',
            name: 'Page',
            components: [
                { id: 'title', name: 'Title', type: 'singleLine', config: { singleLine: { searchable: false } } },
            ],
        });
        expect(result.success).toBe(true);
        if (!result.success || result.data.intent !== 'shape/create') {
            throw new Error('Expected a parsed shape/create operation');
        }
        expect(result.data.components?.[0]?.config?.singleLine).toEqual({ searchable: false });
    });

    it.each(INDEXING_FLAGS)('rejects a non-boolean %s, null included: null is not "unset"', (flag) => {
        // null is rejected like it is for `required` and `discoverable`; omit the key to leave a flag unset.
        for (const value of ['yes', 'false', 1, null]) {
            const result = OperationSchema.safeParse({
                intent: 'shape/create',
                type: 'document',
                identifier: 'page',
                name: 'Page',
                components: [
                    { id: 'title', name: 'Title', type: 'singleLine', config: { singleLine: { [flag]: value } } },
                ],
            });
            expect(result.success).toBe(false);
        }
    });

    it('is also kept by the read-side Shape schema (output types)', () => {
        const shape = {
            identifier: 'chair',
            name: 'Chair',
            type: 'product',
            components: [{ id: 'title', name: 'Title', type: 'singleLine', config: { required: true, ...mixed } }],
        };
        const result = ShapeSchema.safeParse(shape);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(shape);
    });
});
