import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { HalfPieChart } from 'half-pie-chart';
import CircularProgressOverlay from '../../../components/circular-progress-overlay';
import { currentDate } from '../../../utils/common-utils';
import Notification from '../../../components/notification/notification';

import { getDashboardViolation } from './action';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    dashboardContainer: {
        fontFamily: 'Sen',
        background: 'linear-gradient(100.72deg, #192c43 15.97%, #26345a 89.96%)',
        color: '#ffffff',
        height: '100%',
    },
    dashboardMain: {
        padding: '56px',
        background: 'linear-gradient(100.72deg, #192c43 15.97%, #26345a 89.96%)',
    },
    typOverview: {
        paddingLeft: '56px',
        display: 'flex',
        alignItems: 'center',
        background: '#01204e',
        height: '63px',
    },
    datePickerWrapper: {
        display: 'flex',
        justifyContent: 'end',
        marginTop: '40px',
    },
    datePicker: {
        backgroundColor: '#E4E4E4',
        borderRadius: '5px',
    },
    timeStampSelect: {
        backgroundColor: '#E4E4E4',
        marginLeft: '10px',
        borderRadius: '5px',
    },
    right: {
        marginTop: '100px',
    },
    violations_1: {
        textAlign: 'center',
    },
    violations_2: {
        textAlign: 'center',
    },
    violations_3: {
        textAlign: 'center',
    },
    span_1: {
        borderLeft: '7px solid #FF0000',
        paddingLeft: '10px',
        borderRadius: '2px',
    },
    span_2: {
        borderLeft: '7px solid  #0C9141',
        paddingLeft: '10px',
        borderRadius: '2px',
    },
    span_3: {
        borderLeft: '7px solid #F37026',
        paddingLeft: '10px',
        borderRadius: '2px',
    },
    typNumber: {
        textAlign: 'center',
        marginTop: '32px',
        cursor: 'pointer',
    },
    btnReport: {
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        marginTop: '50px',
    },
    typLeft: {
        margin: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    violationChart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const Dashboard = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const count = useRef(0);
    const [date, setDate] = useState(null);
    const [timeStamp, setTimeStamp] = useState('');
    const [graphData, setGraphData] = useState({
        right: [
            {
                value: 0,
                color: '#2233CC',
            },
        ],
        left: [
            {
                value: 100 - 0,
                color: '#7B7B7C',
            },
        ],
    });
    const { loading: dashboardLoading, data: dashboardDetails, error } = useSelector((state) => state.dashboardReducer);

    useEffect(() => {
        if (count.current == 0) {
            setDate(currentDate());
            count.current = 1;
        }
        if (date) {
            let formattedDate = currentDate(date);
            const obj = {
                date: formattedDate,
                time: timeStamp,
            };
            dispatch(getDashboardViolation(obj));
        }
    }, [date, timeStamp]);

    useEffect(() => {
        setGraphData((prevState) => ({
            ...prevState,
            right: [
                {
                    ...prevState.right[0],
                    value: dashboardDetails?.compliance || 0,
                },
            ],
            left: [
                {
                    ...prevState.left[0],
                    value: 100 - (dashboardDetails?.compliance || 0),
                },
            ],
        }));
    }, [dashboardDetails]);

    const routesHandler = (link) => {
        history.push(link);
    };
    const dateChangeHandler = (value) => {
        setDate(value);
        setTimeStamp('');
    };
    const handleTimeStamp = (event) => {
        setTimeStamp(event.target.value);
    };

    if (dashboardLoading) {
        return (
            <div>
                <CircularProgressOverlay />
            </div>
        );
    } else {
        return (
            <>
                <Notification
                    isOpen={true}
                    duration={3000}
                    message={
                        error
                            ? error?.message || 'Data not fetched successfully !'
                            : dashboardDetails?.recordFound
                            ? 'Data fetched successfully !'
                            : 'Record not found !'
                    }
                    type={error ? 'error' : dashboardDetails?.recordFound ? 'success' : 'warning'}
                />

                <div className={classes.dashboardContainer}>
                    <Typography variant="h5" className={classes.typOverview}>
                        Overview
                    </Typography>
                    <main className={classes.dashboardMain}>
                        <div className={classes.datePickerWrapper}>
                            <span className={classes.datePicker}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="yyyy/MM/dd"
                                        value={date}
                                        disabled={false}
                                        onChange={(newValue) => dateChangeHandler(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </span>
                            <span className={classes.timeStampSelect}>
                                <FormControl sx={{ minWidth: 100 }}>
                                    <Select
                                        value={
                                            timeStamp
                                                ? timeStamp
                                                : dashboardDetails?.timestamps
                                                ? dashboardDetails?.timestamps[0]
                                                : ''
                                        }
                                        onChange={handleTimeStamp}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Time</em>
                                        </MenuItem>
                                        {dashboardDetails?.timestamps?.map((ele, index) => (
                                            <MenuItem key={index} value={ele}>
                                                {ele ? ele?.slice(0, 5) : ''}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </span>
                        </div>

                        <Grid container>
                            <Grid item xs={12} sm={6} md={4} className={classes.left}>
                                <Typography variant="h5" gutterBottom component="div" className={classes.typLeft}>
                                    Overall Summary
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} className={classes.violationChart}>
                                        <HalfPieChart
                                            name=""
                                            right={graphData?.right}
                                            left={graphData?.left}
                                            dark={false}
                                            title=""
                                            cardBackColor="transparent"
                                            cardTextColor="#fff"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="h5" className={classes.violations_1}>
                                            Compliance
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8} className={classes.right}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            component="div"
                                            className={classes.violations_1}
                                        >
                                            <span className={classes.span_1}></span>New Violations
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className={classes.typNumber}
                                            onClick={() => routesHandler('/new-violations')}
                                        >
                                            {dashboardDetails?.violation_count?.new || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            component="div"
                                            className={classes.violations_2}
                                        >
                                            <span className={classes.span_2}></span>Fixed Violations
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className={classes.typNumber}
                                            onClick={() => routesHandler('/fixed-violations')}
                                        >
                                            {dashboardDetails?.violation_count?.fixed || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            component="div"
                                            className={classes.violations_3}
                                        >
                                            <span className={classes.span_3}></span>Existing Violations
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className={classes.typNumber}
                                            onClick={() => routesHandler('/existing-violations')}
                                        >
                                            {dashboardDetails?.violation_count?.existing || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} className={classes.btnReport}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => routesHandler('/all-reports')}
                                            style={{
                                                backgroundColor: '#2233CC',
                                                color: '#FFFFFF',
                                                borderRadius: '5px',
                                                fontSize: '16px',
                                                height: '50px',
                                            }}
                                        >
                                            Browse All Reports
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </>
        );
    }
};

Dashboard.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Dashboard;
