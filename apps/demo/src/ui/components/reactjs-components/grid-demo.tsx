import { catalogueFetcherGraphqlBuilder, createCatalogueFetcher, createClient } from '@crystallize/js-api-client';
import { GridRenderer, GridRenderingType, Image } from '@crystallize/reactjs-components';

export const GridDemo = async () => {
    const apiClient = createClient({
        tenantIdentifier: 'furniture',
    });
    const fetcher = createCatalogueFetcher(apiClient);
    const builder = catalogueFetcherGraphqlBuilder;
    const query = {
        grid: {
            __args: {
                id: '5ea19e7aba5038001c0180b6',
                //id: '626ea0599161f671155db9a9',
                // id: '62a23c5e860bd16784ae5bec',
                // id: '62a23c5e860bd16784ae5bec',
                language: 'en',
            },
            id: true,
            name: true,
            rows: {
                columns: {
                    layout: {
                        rowspan: true,
                        colspan: true,
                        colIndex: true,
                        rowIndex: true,
                    },
                    item: {
                        __on: [
                            builder.onItem(),
                            builder.onProduct(
                                {},
                                {
                                    onDefaultVariant: {
                                        price: true,
                                        firstImage: {
                                            url: true,
                                            variants: {
                                                width: true,
                                                url: true,
                                            },
                                        },
                                    },
                                },
                            ),
                        ],
                    },
                },
            },
        },
    };
    const response = await fetcher<any>(query);
    const grid = response.grid;
    return (
        <div>
            <h3>CSS Grid</h3>
            {grid && <GridRenderer grid={grid} type={GridRenderingType.Div} cellComponent={Cell} />}

            <hr />
            <h3>Table Grid</h3>
            {grid && <GridRenderer grid={grid} type={GridRenderingType.Table} cellComponent={Cell} />}

            <hr />
            <h3>Row Span</h3>
            {grid && <GridRenderer grid={grid} type={GridRenderingType.RowCol} cellComponent={Cell} />}
        </div>
    );
};

const Cell = ({ cell }: { cell: any }) => {
    if (!cell.item) {
        return null;
    }
    return (
        <div>
            <Image className="w-50" {...cell.item.defaultVariant?.firstImage} />
            {cell.item.name}
        </div>
    );
};
