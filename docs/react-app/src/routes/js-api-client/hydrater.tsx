import { useCrystallize } from '@crystallize/reactjs-hooks';
// eslint-disable-next-line
import {
    createProductHydraterByPaths,
    createProductHydraterBySkus
} from '@crystallize/js-api-client';
import type { ProductHydrater } from '@crystallize/js-api-client';

import { FC, useEffect, useState } from 'react';
import { Code } from '../../components/Code';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/esm/Alert';

export const Hydrater: FC = () => {
    const { what } = useParams();
    const { state, apiClient } = useCrystallize();
    const [form, setForm] = useState({
        items: ['b-1628520141076', 'b-1628514494819']
    });
    const [result, setResult] = useState('');

    let hydrater: ProductHydrater;
    let creator: string;
    switch (what) {
        case 'skus':
            hydrater = createProductHydraterBySkus(apiClient);
            creator = 'createProductHydraterBySkus';
            break;
        default:
            hydrater = createProductHydraterByPaths(apiClient);
            creator = 'createProductHydraterByPaths';
    }

    useEffect(() => {
        (async () => {
            const response = await hydrater(form.items, 'en');
            setResult(JSON.stringify(response, null, 2));
        })();
        // eslint-disable-next-line
    }, [state.configuration.tenantIdentifier, form, what]);

    const usageCode = `import { ${creator} } from '@crystallize/js-api-client';
const apiClient = createClient({
    tenantIdentifier: '${state.configuration.tenantIdentifier}'
});
const hydrater = ${creator}(apiClient);
const response = await hydrater([${form.items
        .map((e) => `'${e}'`)
        .join(',')}], 'en');`;

    const advanceUsageCode = `function hydrater(items:string[], language:string, extraQuery: any, (item: string, index: number) => any);`;

    return (
        <div>
            <h1>
                Use the By {what?.charAt(0)?.toUpperCase()}
                {what?.slice(1)} hydrater
            </h1>
            <Code language="javascript">{usageCode}</Code>

            <Alert variant="info">
                <Alert.Heading>There is more!</Alert.Heading>
                <p>
                    You can customize 100% of the underlaying GraphQL query that
                    is made for you by the helper.
                </p>
                <Code language="typescript">{advanceUsageCode}</Code>
                <hr />
                It's using <em>json-to-graphql-query</em> behind this scene to
                convert the object to GraphQL query!{' '}
                <Alert.Link href="https://github.com/CrystallizeAPI/js-api-client#Hydrater">
                    Check the documentation!
                </Alert.Link>
            </Alert>
            <Row>
                <Col md={3}>
                    <h2>Query</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            {what}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Path"
                            aria-label="Path"
                            value={form.items.join(',')}
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    items: event.target.value.split(',')
                                });
                            }}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <h2>Results</h2>
                    <Code language="json">{result}</Code>
                </Col>
            </Row>
        </div>
    );
};
