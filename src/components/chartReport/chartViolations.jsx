import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Grid, Paper } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import { isEmpty } from 'lodash';

import CollapsibleTable from '../table/table';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    GridSpace: {
        marginTop: '2rem',
    },
    chartPaper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(1, 2, 1),
        width: '100%',
        marginTop: '1.5rem',
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

const ChartViolations = ({
    services = [],
    policies = [],
    chartOneTitle,
    chartTwoTitle,
    TableDataObject = {},
    serviceClickHandler,
}) => {
    const classes = useStyles();

    const servicesOptions = {
        pieHole: 0.5,
        is3D: false,
    };
    const policiesOptions = {
        pieHole: 0.5,
        is3D: false,
    };
    const chartEvents = [
        {
            eventName: 'select',
            callback: ({ chartWrapper, google }) => {
                const chart = chartWrapper.getChart();
                const data = google.visualization.arrayToDataTable([...services]);
                if (chart.getSelection()[0]) {
                    serviceClickHandler(
                        data.getValue(chart.getSelection()[0]?.row, 0),
                        data.getValue(chart.getSelection()[0]?.row, 1)
                    );
                }
            },
        },
    ];

    return (
        <>
            <Paper className={classes.chartPaper}>
                <Grid container spacing={2} className={classes.GridSpace}>
                    <Grid item xs={12} sm={12} md={!isEmpty(policies) ? 6 : 12} className={classes.left}>
                        <Typography variant="h5">{chartOneTitle}</Typography>
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="450px"
                            data={services}
                            options={servicesOptions}
                            chartEvents={chartEvents}
                        />
                    </Grid>
                    {!isEmpty(policies) && (
                        <Grid item xs={12} sm={12} md={6} className={classes.left}>
                            <Typography variant="h5">{chartTwoTitle}</Typography>
                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="450px"
                                data={policies}
                                options={policiesOptions}
                            />
                        </Grid>
                    )}
                </Grid>
            </Paper>

            {!isEmpty(TableDataObject) && (
                <Paper className={classes.tablePaper}>
                    <Grid container spacing={2} className={classes.GridSpace}>
                        <Grid item xs={12} sm={12} md={12}>
                            <CollapsibleTable TableDataObject={TableDataObject} />
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

ChartViolations.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    services: PropTypes.array,
    policies: PropTypes.array,
    chartOneTitle: PropTypes.string,
    chartTwoTitle: PropTypes.string,
    TableDataObject: PropTypes.object,
    serviceClickHandler: PropTypes.func,
};

export default ChartViolations;
