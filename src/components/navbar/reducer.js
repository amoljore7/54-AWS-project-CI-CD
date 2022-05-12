import { AwsAccountTypes } from './constants';

const initialState = {
    loading: false,
    error: null,
    data: {},
};

export const awsAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case AwsAccountTypes.ACCOUNT_DETAILS_LOADING:
            return {
                ...state,
                loading: true,
                data: {},
            };

        case AwsAccountTypes.ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };

        case AwsAccountTypes.ACCOUNT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case AwsAccountTypes.ACCOUNT_DETAILS_FLUSH_DATA:
            return {
                ...state,
                ...initialState,
            };

        default:
            return state;
    }
};
