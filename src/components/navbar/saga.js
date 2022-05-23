import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { successAwsAccountDetails, failureAwsAccountDetails } from './action';
import { fetchAwsAccountDetails } from '../../services/service';

import { AwsAccountTypes } from './constants';

function* awsAccountDetailsWatcher() {
    yield takeLatest(AwsAccountTypes.ACCOUNT_DETAILS_REQUEST, awsAccountDetailsWorker);
}

function* awsAccountDetailsWorker() {
    try {
        yield put({ type: AwsAccountTypes.ACCOUNT_DETAILS_LOADING });
        const { data } = yield call(fetchAwsAccountDetails);
        yield put(successAwsAccountDetails(data));
    } catch (error) {
        yield put(failureAwsAccountDetails(error));
    }
}

export default all([fork(awsAccountDetailsWatcher)]);
