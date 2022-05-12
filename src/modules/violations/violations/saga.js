import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { ViolationsTypes } from './constants';
import { successViolations, failureViolations, successPoliciesAndTableViolations } from './action';
import { fetchViolations, fetchPoliciesAndTableViolations } from '../../../services/dashboard-service';

// ********** {TODO: Get Request for services data} ***//
function* violationsWatcher() {
    yield takeLatest(ViolationsTypes.VIOLATIONS_REQUEST, violationsWorker);
}
function* violationsWorker(payload) {
    try {
        yield put({ type: ViolationsTypes.VIOLATIONS_LOADING });
        const { data } = yield call(fetchViolations, payload);
        yield put(successViolations(data));
    } catch (error) {
        yield put(failureViolations(error));
    }
}

// ********** {TODO: Get Request for policies and table data}***//
function* policiesAndTableViolationsWatcher() {
    yield takeLatest(ViolationsTypes.POLICIES_AND_TABLE_VIOLATIONS_REQUEST, policiesAndTableViolationsWorker);
}
function* policiesAndTableViolationsWorker(payload) {
    try {
        yield put({ type: ViolationsTypes.VIOLATIONS_LOADING });
        const { data } = yield call(fetchPoliciesAndTableViolations, payload);
        yield put(successPoliciesAndTableViolations(data));
    } catch (error) {
        yield put(failureViolations(error));
    }
}

// ********** {TODO: Add func here}  ***//

export default all([fork(violationsWatcher), fork(policiesAndTableViolationsWatcher)]);
