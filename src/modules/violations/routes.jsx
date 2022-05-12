import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import AllViolationsReport from './violations/all-report';
import NewViolations from './violations/new-violations';
import FixedViolations from './violations/fixed-violations';
import ExistingViolations from './violations/existing-violations';

const DashboardRoutes = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.url} component={Dashboard} />
            <Route path={`${match.url}all-reports`} component={AllViolationsReport} />
            <Route path={`${match.url}new-violations`} component={NewViolations} />
            <Route path={`${match.url}fixed-violations`} component={FixedViolations} />
            <Route path={`${match.url}existing-violations`} component={ExistingViolations} />
            {/* {TODO: Add routes here} */}
        </Switch>
    );
};

DashboardRoutes.propTypes = {
    history: PropTypes.any,
    match: PropTypes.any,
};

export default withRouter(DashboardRoutes);
