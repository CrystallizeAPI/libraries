import { useCrystallize } from '@crystallize/reactjs-hooks';
import { FC, useEffect, useState } from 'react';
import { ContentTransformer } from '@crystallize/reactjs-components';
import { Code } from '../../components/Code';

export const CrystallizeContentTransformer: FC = () => {
    const { state, helpers } = useCrystallize();
    const [paragraphs, setParagraphs] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const fetch = helpers.catalogueFetcher;
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
            const response = await fetch<any>(query);
            setParagraphs(response.catalogue.description.content.paragraphs);
        })();
    }, [state.configuration.tenantIdentifier]); // eslint-disable-line react-hooks/exhaustive-deps

    const usageCode = `import { ContentTransformer } from '@crystallize/reactjs-components/dist/content-transformer';
{paragraphs.filter((paragraph: any) => paragraph?.body).map((paragraph: any, index: number) => (
    <div key={index}><ContentTransformer json={paragraph.body.json} /></div>
))}
    `;
    return (
        <div>
            <h1>Content Transformer</h1>
            <Code language="javascript">{usageCode}</Code>
            {paragraphs
                .filter((paragraph: any) => paragraph?.body)
                .map((paragraph: any, index: number) => (
                    <div key={index}>
                        <ContentTransformer json={paragraph.body.json} />
                    </div>
                ))}
        </div>
    );
};
