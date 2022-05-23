import ApiServices from '../utils/api-service';

/***** GET : Get Violation on landing page Api Call */
export const fetchDashboardViolationsRecords = async ({ payload }) => {
    if (payload?.date && payload?.time) {
        const response = await ApiServices.get(`/aws/summary?time=${payload.time}&date=${payload.date}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        return response;
    } else if (payload?.date) {
        const response = await ApiServices.get(`/aws/summary?date=${payload.date}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        return response;
    } else {
        const response = await ApiServices.get(`/aws/summary`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        return response;
    }
};

/***** GET : Get AWS account details Api Call */
export const fetchAwsAccountDetails = async () => {
    const response = await ApiServices.get(`/aws/accounts`, {
        headers: {
            'content-type': 'application/json',
        },
    });
    return response;
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
        return response;
    } else if (payload?.date) {
        const response = await ApiServices.get(`/aws/service?date=${payload?.date}&violation_type=${payload?.type}`, {
            headers: {
                'content-type': 'application/json',
            },
        });
        return response;
    }
};

/***** GET : Get Policies Api Call */
export const fetchPoliciesViolations = async ({ payload }) => {
    const response = await ApiServices.get(
        `/aws/service/policyviolation?service_type=${payload?.service_type}&violation_type=${payload?.violation_type}&historyId=${payload?.historyId}`,
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
};

/***** GET : Get Table data Api Call */
export const fetchTableData = async ({ payload }) => {
    // const response = await ApiServices.get(`/aws/policy=${payload}`, {
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    // });
    // return response;
    console.log(payload);

    const myResponse = {
        data: {
            originalRows: [
                {
                    policyName: 'SQA_Queue_Encrypted_1',
                    section: 'storage',
                    categories: 'IAM',
                    newViolation: 10,
                    fixedViolation: 10,
                    existingViolation: 10,
                    details: [
                        {
                            queueUrl: 'https://ap-south-1',
                            arn: 'arn:aws',
                            encryption: 'null',
                            region: 'ap-south-1',
                            owner: 'NA',
                        },
                        {
                            queueUrl: 'https://ap-south-2',
                            arn: 'arn:aws',
                            encryption: 'null',
                            region: 'ap-south-1',
                            owner: 'NA',
                        },
                    ],
                },
                {
                    policyName: 'SQB_Queue_Encrypted_2',
                    section: 'storage',
                    categories: 'IDM',
                    newViolation: 20,
                    fixedViolation: 20,
                    existingViolation: 20,
                    details: [
                        {
                            queueUrl: 'https://ap-south-1',
                            arn: 'arn:aws',
                            encryption: 'null',
                            region: 'ap-south-1',
                            owner: 'NA',
                        },
                        {
                            queueUrl: 'https://ap-south-2',
                            arn: 'arn:aws',
                            encryption: 'null',
                            region: 'ap-south-1',
                            owner: 'NA',
                        },
                    ],
                },
            ],
        },
    };
    return myResponse;
};
