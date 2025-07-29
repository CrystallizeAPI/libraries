import { ContentTransformer, type NodeProps } from '@crystallize/reactjs-components';
import { createCatalogueFetcher, createClient } from '@crystallize/js-api-client';

export const ContentTransformerDemo = async () => {
    const apiClient = createClient({
        tenantIdentifier: 'furniture',
    });
    const fetcher = createCatalogueFetcher(apiClient);
    const query = {
        catalogue: {
            __args: {
                path: '/shop/decoration/shelves-in-wood-hey',
                language: 'en',
            },
            description: {
                __aliasFor: 'component',
                __args: {
                    id: 'description',
                },
                content: {
                    __on: {
                        __typeName: 'ParagraphCollectionContent',
                        paragraphs: {
                            body: {
                                json: true,
                            },
                        },
                    },
                },
            },
        },
    };
    const response = await fetcher<{
        catalogue: {
            description: {
                content: {
                    paragraphs: Array<{
                        body: {
                            json: NodeProps | NodeProps[] | undefined;
                        };
                    }>;
                };
            };
        };
    }>(query);
    const paragraphs = response.catalogue.description.content.paragraphs;
    return (
        <div>
            {paragraphs
                .filter((paragraph) => paragraph?.body)
                .map((paragraph, index: number) => (
                    <div key={index}>
                        <ContentTransformer json={paragraph.body.json} />
                    </div>
                ))}
        </div>
    );
};
