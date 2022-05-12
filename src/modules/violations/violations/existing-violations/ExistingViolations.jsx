import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Box, Link } from '@material-ui/core';
import ChartViolations from '../../../../components/chartReport/chartViolations';
import CircularProgressOverlay from '../../../../components/circular-progress-overlay';
import { getViolation, getPoliciesAndTableViolation } from '../action';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    container: {
        padding: '0 56px',
        height: '100%',
    },
    backLinkBox: {
        cursor: 'pointer',
        padding: '12px 0',
    },
    backLink: {
        color: '#022D6D !important',
        fontSize: '18px !important',
        textDecoration: 'underline',
    },
}));

const ExistingViolations = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [serviceValue, setServiceValue] = useState('');

    const { loading, awsServices, policiesAndTable } = useSelector((state) => state.violationReducer);

    useEffect(() => {
        dispatch(getViolation());
    }, []);

    useEffect(() => {
        if (serviceValue) {
            dispatch(getPoliciesAndTableViolation(serviceValue));
        }
    }, [serviceValue]);

    const TableDataObject = {
        searchPlaceholder: 'search by policy name...',
        tableHeader: ['Policy Name', 'Sections', 'Categories', 'New', 'Fixed', 'Existing'],
        tableDetailsHeader: ['Queue URL', 'Queue ARN', 'Encryption', 'Region', 'Owner'],
        originalRows: policiesAndTable?.originalRows,
    };

    const serviceClickHandler = (label, value) => {
        if (serviceValue !== label) {
            console.log('>>>Selected Label----->      ', label);
            console.log('>>>Selected value---->       ', value);
            setServiceValue(label);
        }
    };
    if (loading) {
        return (
            <div>
                <CircularProgressOverlay />
            </div>
        );
    } else {
        return (
            <div className={classes.container}>
                <Box className={classes.backLinkBox} onClick={() => history.back()}>
                    <Link className={classes.backLink}>Back to dashboard</Link>
                </Box>
                <Typography variant="h4">Existing Violation</Typography>

                <ChartViolations
                    chartOneTitle={'AWS Services'}
                    chartTwoTitle={'Policies'}
                    services={awsServices?.services}
                    policies={policiesAndTable?.policies}
                    TableDataObject={policiesAndTable?.originalRows && TableDataObject}
                    serviceClickHandler={serviceClickHandler}
                />
            </div>
        );
    }
};

ExistingViolations.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default ExistingViolations;
