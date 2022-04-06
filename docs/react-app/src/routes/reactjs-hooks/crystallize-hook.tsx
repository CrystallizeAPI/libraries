import { useCrystallize } from '@crystallize/reactjs-hooks';
import { FC } from 'react';
import { Code } from '../../components/Code';

export const CrystallizeHook: FC = () => {
    const { state } = useCrystallize();

    const usageCode = `import { createClient } from '@crystallize/reactjshooks';

<CrystallizeProvider language="${state.language}" tenantIdentifier='${state.configuration.tenantIdentifier}'}>
    <App />
</CrystallizeProvider>
///...

const { state, apiClient, helpers } = useCrystallize();
helpers.createNavigationByFoldersFetcher('/shop', 2);
helpers.createNavigationByTopicsFetcher('/specials', 3);
helpers.createProductHydraterByPaths(['/p1','/p2']);
helpers.createProductHydraterBySkus(['b-1628520141076','b-1628514494819']);
`;
    return (
        <div>
            <h1>Using the Hook</h1>
            <p>
                <em>useCrystallize()</em> hook provides a <em>Provider</em> that is going to wrap your app. So you get a{' '}
                <em>state</em> and other helpers from it.
            </p>

            <Code language="javascript">{usageCode}</Code>

            <p>Thanks to the provider Crystallize Hook maintains the configuration and the language.</p>
        </div>
    );
};
