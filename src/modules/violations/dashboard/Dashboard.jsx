/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
import CircularProgressOverlay from '../../../components/circular-progress-overlay';
import { currentDate } from '../../../utils/common-utils';
import Notification from '../../../components/notification/notification';
import { Chart } from 'react-google-charts';
import { isEmpty } from 'lodash';
import './Dashboard.css';
import { getDashboardViolation } from './action';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    dashboardContainer: {
        fontFamily: 'Sen',
        height: '100%',
    },
    dashboardMain: {
        height: '100%',
    },

    datePickerWrapper: {
        display: 'flex',
        justifyContent: 'end',
    },
    datePicker: {
        backgroundColor: '#ffffff',
        borderRadius: '5px',
    },
    timeStampSelect: {
        backgroundColor: '#ffffff',
        marginLeft: '10px',
        borderRadius: '5px',
    },
    right: {
        justifyContent: 'center',
        flexGrow: 1,
        textAlign: 'center',
        background: '#F7FAFF',
        alignItems: 'center',
        padding: '25px',
        height: '100%',
        //border: '1px solid black',
    },

    btnReport: {
        marginTop: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flexGrow: 1,
        textAlign: 'center',
        height: '100%',
        // border: '1px solid black',
    },
    typLeft: {
        marginTop: '6rem',
        margin: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    violationChart: {
        //border: '1px solid black',
    },
    circle: {
        height: '25px',
        width: '25px',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '0 20px',
    },
    horizontalLine: {
        width: '100%',
        marginTop: '8rem',

        border: ' 1px solid #707070',
        opacity: 0.3,
    },
    donutSegment2: {
        transformOrigin: 'center',
        stroke: '#5381c6',
        animation: 'donut1 3s',
    },
    violationOptions: {
        //marginTop: '20px',
        justifyContent: 'space-between',
        marginRight: '2rem',
    },
    violationOptionsItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
}));

const Dashboard = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [date, setDate] = useState(null);
    const [timeStamp, setTimeStamp] = useState('');
    const [barChartData, setBarChartData] = useState([]);
    const { loading: dashboardLoading, data: dashboardDetails, error } = useSelector((state) => state.dashboardReducer);

    useEffect(() => {
        const obj = {
            date: '',
            time: '',
        };
        dispatch(getDashboardViolation(obj));
    }, []);

    useEffect(() => {
        if (date || dashboardDetails?.policyStats?.capturedAt) {
            let formattedDate = date ? currentDate(date) : currentDate(dashboardDetails?.policyStats?.capturedAt);
            const obj = {
                date: formattedDate,
                time: timeStamp,
            };
            dispatch(getDashboardViolation(obj));
            console.log(obj);
        }
    }, [date, timeStamp]);

    const routesHandler = (link, selectedViolation) => {
        console.log(link);
        const detailsObj = {
            capturedAt: dashboardDetails?.policyStats?.capturedAt || date,
            timeStamp: timeStamp ? timeStamp : dashboardDetails?.timestamps ? dashboardDetails?.timestamps[0] : '',
            selectedViolation: selectedViolation,
        };
        history.push({
            pathname: '/details',
            state: { detail: detailsObj },
        });
    };

    useEffect(() => {
        if (!dashboardDetails?.recordFound) {
            setBarChartData([
                ['options', 'Violation', { role: 'annotation' }],
                [null, 0, 'NO DATA AVAILABLE'],
            ]);
        } else {
            setBarChartData([
                ['options', 'Violation', { role: 'style' }],
                ['New', dashboardDetails?.policyStats?.violation_count?.new || 0, '#6C63F0'],
                ['Existing', dashboardDetails?.policyStats?.violation_count?.existing || 0, '#180EB1'],
                ['Fixed', dashboardDetails?.policyStats?.violation_count?.fixed || 0, '#6B9FEE'],
            ]);
        }
    }, [dashboardDetails]);

    useEffect(() => {
        document.documentElement.style.setProperty('--complicace_value', +dashboardDetails?.policyStats?.compliance);
        document.documentElement.style.setProperty(
            '--complicace_value_opposite',
            +(100 - dashboardDetails?.policyStats?.compliance)
        );
    }, [dashboardDetails]);

    const dateChangeHandler = (value) => {
        setDate(value);
        setTimeStamp('');
    };
    const handleTimeStamp = (event) => {
        setTimeStamp(event.target.value);
    };

    const options = {
        backgroundColor: '#F7FAFF',

        titleTextStyle: {
            fontSize: 25,
            bold: true,
        },
        legend: 'none',
        bar: { groupWidth: '35%' },
        vAxis: {
            baseline: 0,
            viewWindowMode: 'explicit',
            viewWindow: { min: 0 },
            gridlines: { color: '#f3f3f3', count: 'none' },
            minValue: 1,
        },
        axes: {
            y: {
                baseline: 0,
                gridlines: { color: '#f3f3f3', count: 1 },
            },
        },
        animation: {
            duration: dashboardDetails ? 1000 : 0,
            easing: 'out',
            startup: true,
        },
        annotations: {
            textStyle: {
                color: '#5381c6',
                fontSize: 22,
            },
            stem: {
                color: 'transparent',
                length: 130,
            },
        },
    };

    const animationStokeDataArray = `${dashboardDetails?.policyStats?.compliance} ${
        100 - dashboardDetails?.policyStats?.compliance
    }`;
    const data = [
        {
            route: '/new-violations',
            tileNumber: 1,
            displayDataValue: dashboardDetails?.policyStats?.violation_count?.new,
            backgroundColor: '#6C63F0',
            displayText: 'New Violations',
        },
        {
            route: '/existing-violations',
            tileNumber: 2,
            displayDataValue: dashboardDetails?.policyStats?.violation_count?.existing,
            backgroundColor: '#180EB1',
            displayText: 'Existing Violations',
        },
        {
            route: '/fixed-violations',
            tileNumber: 3,
            displayDataValue: dashboardDetails?.policyStats?.violation_count?.fixed,
            backgroundColor: '#6B9FEE',
            displayText: 'Fixed Violations',
        },
    ];

    if (dashboardLoading) {
        return (
            <div>
                <CircularProgressOverlay />
            </div>
        );
    } else {
        return (
            <div>
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
                    <Grid className={classes.dashboardMain}>
                        <Grid container style={{ height: '100%' }}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                style={{
                                    height: '100%',
                                    padding: '25px',
                                }}
                                className={classes.left}
                            >
                                <Typography variant="h5" gutterBottom component="div" className={classes.typLeft}>
                                    Overall Summary
                                </Typography>
                                <Grid>
                                    <Grid item xs={12} sm={12} md={12} className={classes.violationChart}>
                                        <div className="svg-item">
                                            <svg width="100%" height="100%" viewBox="0 0 40 40" className="donut">
                                                <circle
                                                    className="donut-hole"
                                                    cx="20"
                                                    cy="20"
                                                    r="15.91549430918954"
                                                    fill="#202631"
                                                ></circle>
                                                <circle
                                                    className="donut-ring"
                                                    cx="20"
                                                    cy="20"
                                                    r="15.91549430918954"
                                                    fill="transparent"
                                                    strokeWidth="3.5"
                                                ></circle>
                                                <circle
                                                    className={classes.donutSegment2}
                                                    cx="20"
                                                    cy="20"
                                                    r="15.91549430918954"
                                                    fill="transparent"
                                                    strokeWidth="3.5"
                                                    strokeDasharray={animationStokeDataArray}
                                                    strokeDashoffset="25"
                                                ></circle>

                                                <g className="donut-text donut-text-1">
                                                    <text y="50%" transform="translate(0, 2)">
                                                        <tspan x="50%" textAnchor="middle" className="donut-percent">
                                                            {dashboardDetails?.policyStats?.compliance.toFixed(1)}%
                                                        </tspan>
                                                    </text>
                                                </g>
                                            </svg>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="h5" className={classes.violations_1}>
                                            Compliance
                                        </Typography>
                                    </Grid>
                                    <div className={classes.horizontalLine}></div>
                                    <Grid
                                        container
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '2rem',
                                        }}
                                    >
                                        <Typography variant="h5" style={{ flexDirection: 'coloum', margin: '0 60px' }}>
                                            <p style={{ color: '#505050' }}>Total Violations</p>
                                            <span>{dashboardDetails?.policyStats?.violation_count?.total || 'Na'}</span>
                                        </Typography>
                                        <Typography variant="h5" style={{ flexDirection: 'coloum', margin: '0 60px' }}>
                                            <p style={{ color: '#505050' }}>Total Policies</p>
                                            <span>{dashboardDetails?.totalPolicies}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} className={classes.right}>
                                <div className={classes.datePickerWrapper}>
                                    <span className={classes.datePicker}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                inputFormat="yyyy/MM/dd"
                                                value={
                                                    date
                                                        ? date
                                                        : dashboardDetails?.policyStats?.capturedAt
                                                        ? dashboardDetails?.policyStats?.capturedAt
                                                        : null
                                                }
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
                                <Typography variant="h5" style={{ marginTop: '2.6rem' }} gutterBottom component="div">
                                    Violations
                                </Typography>
                                {!isEmpty(dashboardDetails?.policyStats) && (
                                    <Grid
                                        container
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        style={{ justifyContent: 'right', marginTop: '100px', padding: '25px' }}
                                    >
                                        <div style={{ height: '400px', width: '95%' }}>
                                            <Chart
                                                chartType="ColumnChart"
                                                width="95%"
                                                height="400px"
                                                data={
                                                    barChartData || [
                                                        ['options', 'Violation', { role: 'annotation' }],
                                                        [null, 0, 'NO DATA AVAILABLE'],
                                                    ]
                                                }
                                                options={options}
                                            />
                                        </div>

                                        <Grid container className={classes.violationOptions}>
                                            {data &&
                                                data?.map((item) => {
                                                    return (
                                                        <Grid
                                                            key={item.tileNumber}
                                                            className={classes.violationOptionsItem}
                                                            onClick={() => routesHandler(item.route, item.tileNumber)}
                                                        >
                                                            <Typography variant="h5">
                                                                {item.displayDataValue}
                                                            </Typography>
                                                            <Typography variant="h6">
                                                                <span
                                                                    style={{ backgroundColor: item.backgroundColor }}
                                                                    className={classes.circle}
                                                                ></span>
                                                                {item.displayText}
                                                            </Typography>
                                                        </Grid>
                                                    );
                                                })}
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} className={classes.btnReport}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => routesHandler('/all-reports', 0)}
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
                    </Grid>
                </div>
            </div>
        );
    }
};

Dashboard.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Dashboard;
