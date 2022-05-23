import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Chart } from 'react-google-charts';

const ServicesChartViolations = ({ chartData = [], title, clickHandler, selectedValue, options = {} }) => {
    const chartEvents = [
        {
            eventName: 'select',
            callback: ({ chartWrapper, google }) => {
                const chart = chartWrapper.getChart();
                const data = google.visualization.arrayToDataTable([...chartData]);
                if (chart.getSelection()[0]) {
                    clickHandler(
                        data.getValue(chart.getSelection()[0]?.row, 0),
                        data.getValue(chart.getSelection()[0]?.row, 1)
                    );
                }
            },
        },
    ];

    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <Chart chartType="PieChart" data={chartData} options={options} chartEvents={chartEvents} />
            <Typography variant="h6">{selectedValue}</Typography>
        </>
    );
};

ServicesChartViolations.propTypes = {
    chartData: PropTypes.array,
    title: PropTypes.string,
    clickHandler: PropTypes.func,
    selectedValue: PropTypes.string,
    options: PropTypes.object,
};

export default React.memo(ServicesChartViolations);
