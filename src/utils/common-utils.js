import moment from 'moment';

export const currentDate = (date = null) => {
    const currentDate = date ? date : moment().toDate();
    const selectedDate = moment(currentDate).format('YYYY-MM-DD');
    return selectedDate;
};

export const RenderIf = ({ children, isTrue }) => {
    return isTrue ? children : null;
};

export const serviceChartOptions = {
    width: '100%',
    height: '450px',
    pieHole: 0.5,
    is3D: false,
    tooltip: {
        isHtml: false,
        // text: 'value',
    },
    slices: {
        0: { color: '#6C63F0' },
        1: { color: '#180EB1' },
        2: { color: '#463DD0' },
        3: { color: '#044AB2' },
        4: { color: '#0C01B0' },
    },
};

export const policiesChartOptions = {
    width: '100%',
    height: '450px',
    pieHole: 0.5,
    is3D: false,
    tooltip: {
        isHtml: false,
        // text: 'value',
    },
    slices: {
        0: { color: '#FE99C2' },
        1: { color: '#F8C547' },
        2: { color: '#C370CA' },
        3: { color: '#0579B5' },
        4: { color: '#3EA897' },
    },
};
