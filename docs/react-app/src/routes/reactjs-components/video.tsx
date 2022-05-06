import { useCrystallize } from '@crystallize/reactjs-hooks';
import { Video } from '@crystallize/reactjs-components/dist/video';
import '@crystallize/reactjs-components/assets/video/styles.css';
import { FC, useEffect, useState } from 'react';
import { Code } from '../../components/Code';

export const CrystallizeVideo: FC = () => {
    const { state, helpers } = useCrystallize();
    const [videos, setVideos] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const fetch = helpers.catalogueFetcher;
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
            const response = await fetch<any>(query);
            console.log(response);
            setVideos(response.catalogue.videos.content.videos);
        })();
    }, [state.configuration.tenantIdentifier]); // eslint-disable-line react-hooks/exhaustive-deps

    const usageCode = ``;

    return (
        <div>
            <h1>Video</h1>
            <Code language="javascript">{usageCode}</Code>
            {videos.map((video: any, index: number) => (
                <div key={index}>
                    <Video {...video} />
                </div>
            ))}
        </div>
    );
};
