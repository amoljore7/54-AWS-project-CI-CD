import { combineReducers } from 'redux';
import { dashboardReducer } from '../modules/violations/dashboard/reducer';
import { awsAccountReducer } from '../components/navbar/reducer';
import { violationReducer } from '../modules/violations/violations/reducer';

const rootReducer = combineReducers({
    dashboardReducer,
    awsAccountReducer,
    violationReducer,
});

export default rootReducer;
