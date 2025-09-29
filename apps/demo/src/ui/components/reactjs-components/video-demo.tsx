import { createCatalogueFetcher, createClient } from '@crystallize/js-api-client';
import { Video } from '@crystallize/reactjs-components';

export const VideoDemo = async () => {
    const apiClient = createClient({
        tenantIdentifier: 'furniture',
    });
    const fetcher = createCatalogueFetcher(apiClient);
    const query = {
        catalogue: {
            __args: {
                path: '/stories/color-is-back',
                language: 'en',
            },
            videos: {
                __aliasFor: 'component',
                __args: {
                    id: 'video',
                },
                content: {
                    __on: {
                        __typeName: 'VideoContent',
                        videos: {
                            playlists: true,
                            thumbnails: {
                                altText: true,
                                url: true,
                                variants: {
                                    width: true,
                                    url: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    };
    const response = await fetcher<any>(query);
    const videos = response.catalogue.videos.content.videos;
    return (
        <div>
            {videos.map((video: any, index: number) => (
                <div key={index}>
                    <Video {...video} />
                </div>
            ))}
        </div>
    );
};
