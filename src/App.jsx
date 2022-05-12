import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Container, makeStyles } from '@material-ui/core';
import CircularProgressOverlay from './components/circular-progress-overlay';
const DashboardRoutes = lazy(() => import('./modules/violations/routes'));
const Navbar = lazy(() => import('./components/navbar'));

export const history = createBrowserHistory();

import './App.css';

const useStyles = makeStyles(() => ({
    MuiContainerRoot: {
        margin: '64px 0 0 0',
        padding: 0,
        height: 'calc(100vh - 64px)',
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth={false} className={classes.MuiContainerRoot}>
                <Router history={history}>
                    <Suspense fallback={<CircularProgressOverlay />}>
                        <Switch>
                            <Route path="/" component={DashboardRoutes} />
                        </Switch>
                    </Suspense>
                </Router>
            </Container>
        </div>
    );
};

export default App;
