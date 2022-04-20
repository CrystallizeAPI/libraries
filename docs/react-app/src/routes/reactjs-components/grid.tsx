import { useCrystallize } from '@crystallize/reactjs-hooks';
import { catalogueFetcherGraphqlBuilder } from '@crystallize/js-api-client';
import { Image } from '@crystallize/reactjs-components/dist/image';
import { GridRenderer, GridRenderingType } from '@crystallize/reactjs-components/dist/grid';
import { FC, useEffect, useState } from 'react';
import { Code } from '../../components/Code';

export const CrystallizeGrid: FC = () => {
    const { state, helpers } = useCrystallize();
    const fetch = helpers.catalogueFetcher;
    const [grid, setGrid] = useState<any>(null);
    useEffect(() => {
        (async () => {
            const builder = catalogueFetcherGraphqlBuilder;
            const query = {
                grid: {
                    __args: {
                        id: '5ea19e7aba5038001c0180b6',
                        language: 'en'
                    },
                    id: true,
                    name: true,
                    rows: {
                        columns: {
                            layout: {
                                rowspan: true,
                                colspan: true
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
                                                        url: true
                                                    }
                                                }
                                            }
                                        }
                                    )
                                ]
                            }
                        }
                    }
                }
            };
            const response = await fetch<any>(query);
            setGrid(response.grid);
        })();
    }, [state.configuration.tenantIdentifier]);

    const usageCode = `import { GridRenderer, GridRenderingType } from '@crystallize/reactjs-components/dist/grid';
    // fetch data and then
    <h2>CSS Grid</h2>
    {grid && <GridRenderer grid={grid} type={GridRenderingType.Div} cellComponent={Cell} />}

    <h2>Table Grid</h2>
    {grid && <GridRenderer grid={grid} type={GridRenderingType.Table} cellComponent={Cell} />}
`;

    return (
        <div>
            <h1>Grid Component</h1>
            <Code language="javascript">{usageCode}</Code>

            <h2>CSS Grid</h2>
            {grid && <GridRenderer grid={grid} type={GridRenderingType.Div} cellComponent={Cell} />}

            <h2>Table Grid</h2>
            {grid && <GridRenderer grid={grid} type={GridRenderingType.Table} cellComponent={Cell} />}
        </div>
    );
};

const Cell: FC<{ cell: any }> = ({ cell }) => {
    // console.log(cell);
    if (!cell.item) {
        return null;
    }
    return (
        <div>
            <Image className="img-fluid" {...cell.item.defaultVariant?.firstImage} />
            {cell.item.name}
        </div>
    );
};
