import { ViolationsTypes } from './constants';

const initialState = {
    loading: false,
    error: null,
    awsServices: {},
    policiesAndTable: {},
};

export const violationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ViolationsTypes.VIOLATIONS_LOADING:
            return {
                ...state,
                loading: true,
            };

        case ViolationsTypes.VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                awsServices: action.payload,
                policiesAndTable: {},
                error: null,
            };
        case ViolationsTypes.POLICIES_AND_TABLE_VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                policiesAndTable: action.payload,
                error: null,
            };

        case ViolationsTypes.VIOLATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
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
