import { FC } from 'react';
import Breadcrumb from 'react-bootstrap/esm/Breadcrumb';
import { Link, Outlet } from 'react-router-dom';
import { FaGithubSquare, FaGithub, FaNpm, FaYarn } from 'react-icons/fa';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export const ReactJSHooksLayout: FC = () => {
    const libname = 'reactjs-hooks';
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>React JS Hooks</Breadcrumb.Item>
            </Breadcrumb>

            <Row className="align-items-center">
                <Col>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <FaNpm size={30} />{' '}
                            <input
                                style={{ width: 300 }}
                                type="text"
                                value={`npm i @crystallize/${libname}`}
                                readOnly
                            />
                        </li>
                        <li className="list-group-item">
                            <FaYarn size={30} />{' '}
                            <input
                                style={{ width: 300 }}
                                type="text"
                                value={`yarn add @crystallize/${libname}`}
                                readOnly
                            />
                        </li>
                    </ul>
                </Col>
                <Col className="text-center">
                    <img
                        src={`https://img.shields.io/npm/l/@crystallize/${libname}?style=flat-square`}
                        alt="npm license"
                    />{' '}
                    <img
                        src={`https://img.shields.io/npm/v/@crystallize/${libname}?style=flat-square`}
                        alt="npm version"
                    />{' '}
                    <img
                        src={`https://img.shields.io/npm/dw/@crystallize/${libname}?style=flat-square`}
                        alt="npm downloads"
                    />
                </Col>
                <Col>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <FaGithubSquare size={30} />{' '}
                            <a
                                href={`https://github.com/CrystallizeAPI/${libname}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Documentation
                            </a>
                        </li>
                        <li className="list-group-item">
                            <FaGithub size={30} />{' '}
                            <a
                                href={`https://github.com/CrystallizeAPI/libraries`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contribution
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>

            <hr />

            <Outlet />
        </div>
    );
};
