import { useCrystallize } from '@crystallize/reactjs-hooks';
// eslint-disable-next-line
import {
    createNavigationByFoldersFetcher,
    createNavigationByTopicsFetcher,
    TreeFetcher
} from '@crystallize/js-api-client';
import { FC, useEffect, useState } from 'react';
import { ListedNav } from '../../components/ListedNav';
import { Code } from '../../components/Code';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import FormControl from 'react-bootstrap/esm/FormControl';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/esm/Nav';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { useParams } from 'react-router-dom';
import { watch } from 'fs';

export const NavigationFetcher: FC = () => {
    const { what } = useParams();
    const { state, apiClient } = useCrystallize();
    const [form, setForm] = useState({
        path: '/',
        depth: 2
    });
    const [result, setResult] = useState<any>(null);

    let fetcher: TreeFetcher;
    let creator: string;
    switch (what) {
        case 'topics':
            fetcher = createNavigationByTopicsFetcher(apiClient);
            creator = 'createNavigationByTopicsFetcher';
            break;
        default:
            fetcher = createNavigationByFoldersFetcher(apiClient);
            creator = 'createNavigationByFoldersFetcher';
    }

    useEffect(() => {
        (async () => {
            const response = await fetcher(form.path, 'en', form.depth);
            setResult(response);
        })();
        // eslint-disable-next-line
    }, [state.configuration.tenantIdentifier, form]);

    const usageCode = `import { ${creator} } from '@crystallize/js-api-client';
const apiClient = createClient({
    tenantIdentifier: '${state.configuration.tenantIdentifier}'
});
const fetch = ${creator}(apiClient);
const response = await fetch('${form.path}', 'en', ${form.depth});`;

    let tree =
        result && result.tree && result.tree.children
            ? result.tree.children
            : [];
    if (what === 'topics') {
        if (form.path === '/' && result && result.tree) {
            tree = result.tree;
        }
    }

    return (
        <div>
            <h1>Use the {what} nav fetcher</h1>
            <Code language="javascript">{usageCode}</Code>
            <Row>
                <Col md={3}>
                    <h2>Query</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Path
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Path"
                            aria-label="Path"
                            value={form.path}
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    path: event.target.value
                                });
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Depth
                        </InputGroup.Text>
                        <FormControl
                            type="number"
                            placeholder="Depth"
                            min={1}
                            aria-label="Depth"
                            value={form.depth}
                            onChange={(event) => {
                                setForm({
                                    ...form,
                                    depth: parseInt(event.target.value)
                                });
                            }}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <h2>Results</h2>
                    <Navbar bg="light" variant="light">
                        <Nav>
                            {tree.map((item: any) => {
                                if (item.children) {
                                    return (
                                        <NavDropdown
                                            title={item.name}
                                            key={item.path}
                                        >
                                            {item.children.map((child: any) => {
                                                return (
                                                    <NavDropdown.Item
                                                        href={child.path}
                                                    >
                                                        {child.name}
                                                    </NavDropdown.Item>
                                                );
                                            })}
                                        </NavDropdown>
                                    );
                                }
                                return (
                                    <Nav.Link key={item.path} href={item.path}>
                                        {item.name}
                                    </Nav.Link>
                                );
                            })}
                        </Nav>
                    </Navbar>
                    <hr />
                    <div>
                        <ListedNav list={tree} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
