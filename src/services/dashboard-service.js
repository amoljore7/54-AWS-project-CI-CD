import ApiServices from '../utils/api-service';

export const fetchDashboardViolationsRecords = async ({ payload }) => {
    const response = await ApiServices.get(`/aws/policy?time=${payload.time}&date=${payload.date}`, {
        headers: {
            'content-type': 'application/json',
        },
    });
    return response;
};

export const fetchAwsAccountDetails = async () => {
    const response = await ApiServices.get(`/aws/accounts`, {
        headers: {
            'content-type': 'application/json',
        },
    });
    return response;
};

export const fetchViolations = async ({ payload }) => {
    // const response = await ApiServices.get(`/aws/policy=${payload}`, {
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    // });
    // return response;
    console.log(payload);

    const myResponse = {
        data: {
            services: [
                ['Task', 'Hours per Day'],
                ['Security', 11],
                ['Compute', 2],
                ['CDN', 2],
                ['Storage', 2],
                ['Data Base', 7], // CSS-style declaration
            ],
        },
    };
    return myResponse;
};

export const fetchPoliciesAndTableViolations = async ({ payload }) => {
    // const response = await ApiServices.get(`/aws/policy=${payload}`, {
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    // });
    // return response;
    console.log(payload);

    const myResponse = {
        data: {
            policies: [
                ['Task', 'Hours per Day'],
                ['Violations', 5],
                ['SQS_Queue', 2],
                ['SSH_form', 2],
                ['Unrestricted', 2],
            ],
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
