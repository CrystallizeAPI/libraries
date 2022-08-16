import { useCrystallize } from '@crystallize/reactjs-hooks';
import { FC, useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import { Code } from '../../components/Code';

export const CallAPI: FC = () => {
    const { state, apiClient } = useCrystallize();
    const [result, setResult] = useState('');
    const [form, setForm] = useState(`query {
    catalogue(language: "en", path: "/") {
        name
            children {
            name
        }
    }
}`);

    useEffect(() => {
        (async () => {
            const response = await apiClient.catalogueApi(form);
            setResult(JSON.stringify(response, null, 2));
        })();
        // eslint-disable-next-line
    }, [state.configuration.tenantIdentifier, form]);

    const usageCode = `import { createClient } from '@crystallize/js-api-client';

const apiClient = createClient({
    tenantIdentifier: '${state.configuration.tenantIdentifier}'
});
const response = await apiClient.catalogueApi(event.target.value);`;

    return (
        <div>
            <h1>Using the Client</h1>
            <Code language="javascript">{usageCode}</Code>
            <Row>
                <Col>
                    <h2>Query</h2>
                    <InputGroup>
                        <InputGroup.Text>GraphQL</InputGroup.Text>
                        <FormControl
                            as="textarea"
                            aria-label="GraphQL"
                            rows={15}
                            className="border-2"
                            defaultValue={form}
                            onChange={(event) => {
                                setForm(event.target.value);
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
