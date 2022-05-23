import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography, Box, Link, Paper } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { isEmpty } from 'lodash';
import { getViolation, getPoliciesViolation, getTableDetails } from './action';
import CollapsibleTable from '../../../components/table/table';
import Chart from '../../../components/chartReport/Chart';
import CircularProgressOverlay from '../../../components/circular-progress-overlay';

import { RenderIf, currentDate, serviceChartOptions, policiesChartOptions } from '../../../utils/common-utils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        padding: '0 56px',
        height: '100%',
        fontFamily: 'Open Sans sans-serif',
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
    datePickerWrapper: {
        display: 'flex',
        marginTop: '20px',
    },
    tileBox: {
        width: '100%',
        marginTop: '20px',
        cursor: 'pointer',
    },
    tileItem: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#022D6D',
        opacity: 1,
    },
    count_1: {
        padding: '10px',
        background: '#EBF3FF 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    count_2: {
        padding: '10px',
        background: '#FF946F 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    count_3: {
        padding: '10px',
        background: '#FFEE00 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    count_4: {
        padding: '10px',
        background: '#299D21 0% 0% no-repeat padding-box',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    chartPaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1, 2, 1),
        width: '100%',
        marginTop: '2.5rem',
        textAlign: 'center',
    },
    tablePaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1, 2, 1),
        width: '100%',
        marginTop: '1.5rem',
        textAlign: 'center',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ViolationsDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const location = useLocation();
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(null);
    const [timeStamp, setTimeStamp] = useState('');
    const [selectedTile, setSelectedTile] = useState('');
    const [serviceValue, setServiceValue] = useState('');
    const [policiesValue, setPoliciesValue] = useState('');

    const { loading, services, policies, tableDetails } = useSelector((state) => state?.violationReducer);

    useEffect(() => {
        setValue(location?.state?.detail?.selectedViolation);
        setDate(currentDate(location?.state?.detail?.capturedAt));
    }, [location]);
    useEffect(() => {
        const payload = {
            date,
            time: timeStamp,
            type: selectedTile,
        };
        if (date && selectedTile) dispatch(getViolation(payload));
    }, [date, timeStamp, selectedTile]);

    useEffect(() => {
        const payload = {
            service_type: serviceValue,
            historyId: services?.historyId,
            violation_type: selectedTile,
        };
        if (serviceValue) dispatch(getPoliciesViolation(payload));
    }, [serviceValue]);

    useEffect(() => {
        if (serviceValue && policiesValue) dispatch(getTableDetails(policiesValue));
    }, [policiesValue]);

    useEffect(() => {
        if (value == 0) setSelectedTile('total');
        if (value == 1) setSelectedTile('new');
        if (value == 2) setSelectedTile('existing');
        if (value == 3) setSelectedTile('fixed');
    }, [value]);

    const dateChangeHandler = (value) => {
        setDate(currentDate(value));
        setTimeStamp('');
    };
    const handleTimeStamp = (event) => {
        setTimeStamp(event.target.value);
    };

    const TableDataObject = {
        searchPlaceholder: 'search by policy name...',
        tableHeader: ['Policy Name', 'Sections', 'Categories', 'New', 'Fixed', 'Existing'],
        tableDetailsHeader: ['Queue URL', 'Queue ARN', 'Encryption', 'Region', 'Owner'],
        originalRows: tableDetails?.originalRows,
    };

    const serviceClickHandler = (label, value) => {
        if (serviceValue !== label) {
            console.log('>>>Selected Label----->      ', label);
            console.log('>>>Selected value---->       ', value);
            setServiceValue(label);
            setPoliciesValue('');
        }
    };

    const policiesClickHandler = (label, value) => {
        if (policiesValue !== label) {
            console.log('>>>Selected police Label----->      ', label);
            console.log('>>>Selected police value---->       ', value);
            setPoliciesValue(label);
        }
    };

    if (loading) {
        return <CircularProgressOverlay />;
    } else {
        return (
            <div className={classes.container}>
                <Box className={classes.backLinkBox} onClick={() => history.back()}>
                    <Link className={classes.backLink}>Back to dashboard</Link>
                </Box>

                <RenderIf isTrue={value == 0}>
                    <Typography variant="h4">All Reports</Typography>
                </RenderIf>

                <RenderIf isTrue={value == 1}>
                    <Typography variant="h4">New Violation</Typography>
                </RenderIf>

                <RenderIf isTrue={value == 2}>
                    <Typography variant="h4">Existing Violation</Typography>
                </RenderIf>

                <RenderIf isTrue={value == 3}>
                    <Typography variant="h4">Fixed Violation</Typography>
                </RenderIf>
                <div className={classes.datePickerWrapper}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date"
                            inputFormat="yyyy/MM/dd"
                            value={date}
                            onChange={(date) => dateChangeHandler(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Box sx={{ minWidth: 100 }} style={{ marginLeft: '15px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Time</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={timeStamp ? timeStamp : services?.timestamps ? services?.timestamps[0] : ''}
                                label="Time"
                                onChange={handleTimeStamp}
                            >
                                {services?.timestamps?.map((ele, index) => (
                                    <MenuItem key={index} value={ele}>
                                        {ele ? ele?.slice(0, 5) : ''}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <Box sx={{ flexGrow: 1 }} className={classes.tileBox}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onClick={() => {
                                setValue(0), setServiceValue('');
                            }}
                        >
                            <Item
                                style={{
                                    borderBottom: `${value == 0 ? '8px solid #022D6D' : ''}`,
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}
                            >
                                <div className={classes.tileItem}>
                                    <Typography variant="h5" className={classes.title}>
                                        Total Violations
                                    </Typography>
                                    <div className={classes.count_1}>{services?.violation_count?.total || '00'}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onClick={() => {
                                setValue(1), setServiceValue('');
                            }}
                        >
                            <Item
                                style={{
                                    borderBottom: `${value == 1 ? '8px solid #FF946F' : ''}`,
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}
                            >
                                <div className={classes.tileItem}>
                                    <Typography variant="h5" className={classes.title}>
                                        New Violation
                                    </Typography>
                                    <div className={classes.count_2}>{services?.violation_count?.new || '00'}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onClick={() => {
                                setValue(2), setServiceValue('');
                            }}
                        >
                            <Item
                                style={{
                                    borderBottom: `${value == 2 ? '8px solid #FFEE00' : ''}`,
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}
                            >
                                <div className={classes.tileItem}>
                                    <Typography variant="h5" className={classes.title}>
                                        Existing Violation
                                    </Typography>
                                    <div className={classes.count_3}>{services?.violation_count?.existing || '00'}</div>
                                </div>
                            </Item>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            onClick={() => {
                                setValue(3), setServiceValue('');
                            }}
                        >
                            <Item
                                style={{
                                    borderBottom: `${value == 3 ? '8px solid #299D21' : ''}`,
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}
                            >
                                <div className={classes.tileItem}>
                                    <Typography variant="h5" className={classes.title}>
                                        Fixed Violation
                                    </Typography>
                                    <div className={classes.count_4}>{services?.violation_count?.fixed || '00'}</div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>

                <>
                    <Paper className={classes.chartPaper}>
                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item xs={12} sm={12} md={!isEmpty(policies) ? 6 : 12}>
                                {!isEmpty(services?.services) ? (
                                    <Chart
                                        title={'AWS Services'}
                                        chartData={services?.services}
                                        clickHandler={serviceClickHandler}
                                        selectedValue={serviceValue}
                                        options={serviceChartOptions}
                                    />
                                ) : (
                                    <Typography variant="h5">Services Not found !</Typography>
                                )}
                            </Grid>

                            {!isEmpty(policies) && (
                                <Grid item xs={12} sm={12} md={6}>
                                    <Chart
                                        title={'Policies'}
                                        chartData={policies?.policies}
                                        clickHandler={policiesClickHandler}
                                        selectedValue={policiesValue}
                                        options={policiesChartOptions}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Paper>

                    {!isEmpty(tableDetails?.originalRows && TableDataObject) && (
                        <Paper className={classes.tablePaper}>
                            <Grid container spacing={2} className={classes.GridSpace}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <CollapsibleTable TableDataObject={TableDataObject} />
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </>
            </div>
        );
    }
};

ViolationsDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default ViolationsDetails;
