import { Footer } from './components/layout/Footer';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Home } from './routes/home';
import { CallAPI } from './routes/js-api-client/call-api';
import { NavigationFetcher } from './routes/js-api-client/navigation-fetcher';
import { FC } from 'react';
import { JSAPIClientLayout } from './routes/js-api-client/layout';
import { CrystallizeProvider } from '@crystallize/reactjs-hooks';
import { useLocalStorage } from '@rehooks/local-storage';
import Container from 'react-bootstrap/esm/Container';
import { Header } from './components/layout/Header';
import { ReactJSHooksLayout } from './routes/reactjs-hooks/layout';
import { CrystallizeHook } from './routes/reactjs-hooks/crystallize-hook';
import { Hydrater } from './routes/js-api-client/hydrater';

const App: FC = () => {
    const [tenant] = useLocalStorage<string>('tenant', 'furniture');
    return (
        <CrystallizeProvider language="en" tenantIdentifier={tenant}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="js-api-client" element={<JSAPIClientLayout />}>
                        <Route path="call-api" element={<CallAPI />} />
                        <Route
                            path="navigation-fetcher/by/:what"
                            element={<NavigationFetcher />}
                        />
                        <Route
                            path="hydrater/by/:what"
                            element={<Hydrater />}
                        />
                    </Route>
                    <Route
                        path="reactjs-hooks"
                        element={<ReactJSHooksLayout />}
                    >
                        <Route
                            path="use-crystallize"
                            element={<CrystallizeHook />}
                        />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <p>
                            404 - <a href="/libraries">Go there</a>
                        </p>
                    }
                />
            </Routes>
        </CrystallizeProvider>
    );
};

export const Layout: FC = () => {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
};

export default App;
