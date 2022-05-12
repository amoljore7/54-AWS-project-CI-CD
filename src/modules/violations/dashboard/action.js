import { DashboardViolationsTypes } from './constants';

export const getDashboardViolation = (dateObject) => {
    return {
        type: DashboardViolationsTypes.DASHBOARD_VIOLATIONS_REQUEST,
        payload: dateObject,
    };
};

export const successDashboardViolations = (data) => {
    return {
        type: DashboardViolationsTypes.DASHBOARD_VIOLATIONS_SUCCESS,
        payload: data,
    };
};

export const failureDashboardViolations = (error) => {
    return {
        type: DashboardViolationsTypes.DASHBOARD_VIOLATIONS_FAILURE,
        payload: error,
    };
};
