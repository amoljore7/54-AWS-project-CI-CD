import { ViolationsTypes } from './constants';

// ********** {TODO: Actions Request for services data} ***//
export const getViolation = (payload = '') => {
    return {
        type: ViolationsTypes.SERVICES_VIOLATIONS_REQUEST,
        payload,
    };
};

export const successServicesViolations = (data) => {
    return {
        type: ViolationsTypes.SERVICES_VIOLATIONS_SUCCESS,
        payload: data,
    };
};

export const failureServicesViolations = (error) => {
    return {
        type: ViolationsTypes.SERVICES_VIOLATIONS_FAILURE,
        payload: error,
    };
};

// ********** {TODO: Actions Request for policies data}***//
export const getPoliciesViolation = (payload = '') => {
    return {
        type: ViolationsTypes.POLICIES_VIOLATIONS_REQUEST,
        payload,
    };
};

export const successPoliciesViolations = (data) => {
    return {
        type: ViolationsTypes.POLICIES_VIOLATIONS_SUCCESS,
        payload: data,
    };
};

export const failurePoliciesViolations = (error) => {
    return {
        type: ViolationsTypes.POLICIES_VIOLATIONS_FAILURE,
        payload: error,
    };
};

// ********** {TODO: Actions Request for table data}***//
export const getTableDetails = (payload = '') => {
    return {
        type: ViolationsTypes.TABLE_DETAILS_REQUEST,
        payload,
    };
};

export const successTableDetails = (data) => {
    return {
        type: ViolationsTypes.TABLE_DETAILS_SUCCESS,
        payload: data,
    };
};

export const failureTableDetails = (error) => {
    return {
        type: ViolationsTypes.TABLE_DETAILS_FAILURE,
        payload: error,
    };
};

// ********** {TODO: Add func here}  ***//
