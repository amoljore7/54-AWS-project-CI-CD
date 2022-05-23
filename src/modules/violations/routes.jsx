import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import ViolationsDetails from './violations/ViolationsDetails';

const DashboardRoutes = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.url} component={Dashboard} />
            <Route path={`${match.url}details`} component={ViolationsDetails} />
            {/* {TODO: Add routes here} */}
        </Switch>
    );
};

DashboardRoutes.propTypes = {
    history: PropTypes.any,
    match: PropTypes.any,
};

export default withRouter(DashboardRoutes);
