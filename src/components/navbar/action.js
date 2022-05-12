import { AwsAccountTypes } from './constants';

export const getAwsAccountDetails = () => {
    return {
        type: AwsAccountTypes.ACCOUNT_DETAILS_REQUEST,
    };
};

export const successAwsAccountDetails = (data) => {
    return {
        type: AwsAccountTypes.ACCOUNT_DETAILS_SUCCESS,
        payload: data,
    };
};

export const failureAwsAccountDetails = (error) => {
    return {
        type: AwsAccountTypes.ACCOUNT_DETAILS_FAILURE,
        payload: error,
    };
};
