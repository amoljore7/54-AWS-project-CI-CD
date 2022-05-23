import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { DashboardViolationsTypes } from './constants';
import { successDashboardViolations, failureDashboardViolations } from './action';
import { fetchDashboardViolationsRecords } from '../../../services/service';

function* dashboardViolationsWatcher() {
    yield takeLatest(DashboardViolationsTypes.DASHBOARD_VIOLATIONS_REQUEST, dashboardViolationsWorker);
}

function* dashboardViolationsWorker(payload) {
    try {
        yield put({ type: DashboardViolationsTypes.DASHBOARD_VIOLATIONS_LOADING });
        const { data } = yield call(fetchDashboardViolationsRecords, payload);
        yield put(successDashboardViolations(data));
    } catch (error) {
        yield put(failureDashboardViolations(error));
    }
}

export default all([fork(dashboardViolationsWatcher)]);
