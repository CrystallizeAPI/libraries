import { FC } from 'react';
import { useCrystallize } from '@crystallize/reactjs-hooks';
import Navbar from 'react-bootstrap/esm/Navbar';
import Container from 'react-bootstrap/esm/Container';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { Link } from 'react-router-dom';
import icon from '../../images/favicon.png';

export const Header: FC = () => {
    const { state } = useCrystallize();

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <img
                        alt="Crystallize Logo"
                        src={icon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    <Navbar.Brand as={Link} to="/">
                        <h1 className="fs-3 d-inline">Demo</h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <NavDropdown title="js-api-client">
                            <NavDropdown.Item
                                as={Link}
                                to={'/js-api-client/call-api'}
                            >
                                Simple API Call
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                as={Link}
                                to={
                                    '/js-api-client/navigation-fetcher/by/folders'
                                }
                            >
                                Navigation By Folders
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to={
                                    '/js-api-client/navigation-fetcher/by/topics'
                                }
                            >
                                Navigation By Topics
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="reactjs-hooks">
                            <NavDropdown.Item
                                as={Link}
                                to={'/reactjs-hooks/use-crystallize'}
                            >
                                useCrystallize
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                    <Navbar.Text className="justify-content-end">
                        Tenant: {state.configuration.tenantIdentifier}
                    </Navbar.Text>
                </Container>
            </Navbar>
        </header>
    );
};
