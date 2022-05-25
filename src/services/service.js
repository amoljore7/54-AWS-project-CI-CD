import ApiServices from '../utils/api-service';
/* eslint-disable */
/***** GET : Get Violation on landing page Api Call */
export const fetchDashboardViolationsRecords = async ({ payload }) => {
    if (payload?.date && payload?.time) {
        const response = await ApiServices.get(`/aws/summary?time=${payload.time}&date=${payload.date}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // return response;
    } else if (payload?.date) {
        const response = await ApiServices.get(`/aws/summary?date=${payload.date}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // return response;
    } else {
        const response = await ApiServices.get(`/aws/summary`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // return response;
    }
    const myResponse = {
        data: {
            policyStats: {
                violation_count: {
                    total: 823,
                    new: 1,
                    existing: 822,
                    fixed: 0,
                },
                compliance: 71.43,
                historyId: '628c9d2dfb3e325ba7509a08',
            },
            timestamps: ['08:54:05'],
            totalPolicies: 112,
            recordFound: true,
        },
    };
    return myResponse;
};

/***** GET : Get AWS account details Api Call */
export const fetchAwsAccountDetails = async () => {
    const response = await ApiServices.get(`/aws/accounts`, {
        headers: {
            'content-type': 'application/json',
        },
    });
    // return response;
    const myResponse = {
        data: {
            name: 'Amol',
            type: 'aws',
            details: {
                userId: 'AIDAR7EDCACTQ5QDDFCHN',
                accountId: '123',
                arn: 'amoljore7@gmail.com',
            },
        },
    };
    return myResponse;
};

/***** GET : Get Services Api Call */
export const fetchServicesViolations = async ({ payload }) => {
    if (payload?.date && payload?.time) {
        const response = await ApiServices.get(
            `/aws/service?date=${payload?.date}&time=${payload?.time}&violation_type=${payload?.type}`,
            {
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
        // return response;
    } else if (payload?.date) {
        const response = await ApiServices.get(`/aws/service?date=${payload?.date}&violation_type=${payload?.type}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        // return response;
    }
    const myResponse = {
        data: {
            service: [
                {
                    name: 'Storage',
                    count: 6,
                    percent: 66.7,
                },
                {
                    name: 'Identity, Governance and Compliance',
                    count: 3,
                    percent: 33.3,
                },
                {
                    name: 'other',
                    count: 0,
                    percent: 0,
                },
            ],
            policyStats: {
                violation_count: {
                    total: 817,
                    new: 19,
                    existing: 798,
                    fixed: 0,
                },
                compliance: 14.29,
                capturedAt: '2022-05-10T08:22:36.958Z',
                historyId: '627a20ccf5f4d5273dbdd57d',
            },
            timestamps: ['08:22:36'],
            recordFound: true,
        },
    };
    return myResponse;
};

/***** GET : Get Policies Api Call */
export const fetchPoliciesViolations = async ({ payload }) => {
    const response = await ApiServices.get(
        `/aws/service/policyviolation?service_type=${encodeURIComponent(payload?.service_type)}&violation_type=${
            payload?.violation_type
        }&historyId=${payload?.historyId}`,
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    // return response;

    const myResponse = {
        data: {
            policies: [
                {
                    name: 'S3_Bucket_Access_by_IP_limit_not_enabled',
                    violationCount: 3,
                    percentage: 15.8,
                },
                {
                    name: 'S3_Bucket_serverside_encryption_not_enabled',
                    violationCount: 3,
                    percentage: 15.8,
                },
                {
                    name: 'S3_Bucket_Replication_not_enabled',
                    violationCount: 3,
                    percentage: 15.8,
                },
                {
                    name: 'S3_Bucket_logging_not_enabled',
                    violationCount: 3,
                    percentage: 15.8,
                },
                {
                    name: 'S3_Bucket_SSL_policy_not_enabled',
                    violationCount: 3,
                    percentage: 15.8,
                },
                {
                    name: 'other',
                    violationCount: 1,
                    percentage: 5.3,
                },
            ],
            recordFound: true,
        },
    };
    return myResponse;
};

/***** GET : Get Table data Api Call */
export const fetchTableData = async ({ payload }) => {
    const response = await ApiServices.get(
        `aws/service/policy/details?service_type=${encodeURIComponent(payload?.service_type)}&historyId=${
            payload?.historyId
        }&violation_type=${payload?.violation_type}&policy_name=${payload?.policy_name}`,
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    // return response;
    const myResponse = {
        data: {
            policyName: 'S3_Bucket_Access_by_IP_limit_not_enabled',
            recordFound: true,
            policyDetails: [
                {
                    'Bucket Name': 'sujeettmpbucket',
                    'IP Limit Status': 'False',
                    Location: 'us-west-2',
                    Owner: 'sysad',
                    'Owner Id': 'f9dc844f221703fb942fedff587121839178fff78be4b1815efd203264630095',
                },
                {
                    'Bucket Name': 'template2-s3bucketforwebsitecontent-1mu15tzdzvx1o',
                    'IP Limit Status': 'False',
                    Location: 'NA',
                    Owner: 'sysad',
                    'Owner Id': 'f9dc844f221703fb942fedff587121839178fff78be4b1815efd203264630095',
                },
                {
                    'Bucket Name': 'tf-test-state-ajay01',
                    'IP Limit Status': 'False',
                    Location: 'ap-south-1',
                    Owner: 'NA',
                    'Owner Id': 'f9dc844f221703fb942fedff587121839178fff78be4b1815efd203264630095',
                },
            ],
        },
    };
    return myResponse;
};
