import { all } from 'redux-saga/effects';

import dashboardSaga from '../modules/violations/dashboard/saga';
import awsAccountSaga from '../components/navbar/saga';
import violationsSaga from '../modules/violations/violations/saga';

export default function* () {
    yield all([dashboardSaga, awsAccountSaga, violationsSaga]);
}
