import { ViolationsTypes } from './constants';

const initialState = {
    loading: false,
    error: null,
    services: {},
    policies: {},
    tableDetails: {},
};

export const violationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ViolationsTypes.VIOLATIONS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case ViolationsTypes.SERVICES_VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                services: action.payload,
                policies: {},
                tableDetails: {},
                error: null,
            };
        case ViolationsTypes.SERVICES_VIOLATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                services: {},
                policies: {},
                tableDetails: {},
            };
        case ViolationsTypes.POLICIES_VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                policies: action.payload,
                tableDetails: {},
                error: null,
            };
        case ViolationsTypes.POLICIES_VIOLATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                policies: {},
                tableDetails: {},
            };

        case ViolationsTypes.TABLE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                tableDetails: action.payload,
                error: null,
            };

        case ViolationsTypes.TABLE_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                tableDetails: {},
            };

        case ViolationsTypes.VIOLATIONS_FLUSH_DATA:
            return {
                ...state,
                ...initialState,
            };

        default:
            return state;
    }
};
