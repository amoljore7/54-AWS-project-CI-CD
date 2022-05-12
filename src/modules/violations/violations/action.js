import { ViolationsTypes } from './constants';

export const getViolation = (payload = '') => {
    return {
        type: ViolationsTypes.VIOLATIONS_REQUEST,
        payload,
    };
};

export const successViolations = (data) => {
    return {
        type: ViolationsTypes.VIOLATIONS_SUCCESS,
        payload: data,
    };
};

export const failureViolations = (error) => {
    return {
        type: ViolationsTypes.VIOLATIONS_FAILURE,
        payload: error,
    };
};

export const getPoliciesAndTableViolation = (payload = '') => {
    return {
        type: ViolationsTypes.POLICIES_AND_TABLE_VIOLATIONS_REQUEST,
        payload,
    };
};

export const successPoliciesAndTableViolations = (data) => {
    return {
        type: ViolationsTypes.POLICIES_AND_TABLE_VIOLATIONS_SUCCESS,
        payload: data,
    };
};
