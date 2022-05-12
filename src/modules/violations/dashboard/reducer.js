import { DashboardViolationsTypes } from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case DashboardViolationsTypes.DASHBOARD_VIOLATIONS_LOADING:
            return {
                ...state,
                loading: true,
                data: {},
            };

        case DashboardViolationsTypes.DASHBOARD_VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };

        case DashboardViolationsTypes.DASHBOARD_VIOLATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DashboardViolationsTypes.DASHBOARD_VIOLATIONS_FLUSH_DATA:
            return {
                ...state,
                ...initialState,
            };

        default:
            return state;
    }
};
