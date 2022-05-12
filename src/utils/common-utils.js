import moment from 'moment';

export const currentDate = (date = null) => {
    const currentDate = date ? date : moment().toDate();
    const selectedDate = moment(currentDate).format('YYYY-MM-DD');
    return selectedDate;
};
