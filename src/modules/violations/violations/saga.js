import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import { ViolationsTypes } from './constants';
import {
    successServicesViolations,
    failureServicesViolations,
    successPoliciesViolations,
    failurePoliciesViolations,
    successTableDetails,
    failureTableDetails,
} from './action';
import { fetchServicesViolations, fetchPoliciesViolations, fetchTableData } from '../../../services/service';

// ********** {TODO: Get Request for services data} ***//
function* servicesViolationsWatcher() {
    yield takeLatest(ViolationsTypes.SERVICES_VIOLATIONS_REQUEST, servicesViolationsWorker);
}
function* servicesViolationsWorker(payload) {
    try {
        yield put({ type: ViolationsTypes.VIOLATIONS_LOADING });
        const { data } = yield call(fetchServicesViolations, payload);
        if (data?.service) {
            var serviceArray = [['Task', 'Hours per Day', { role: 'tooltip', type: 'string', p: { html: true } }]];
            const serviceArrayModify = data?.service?.map((item) => [
                item?.name,
                item?.percent,
                `<div style="width">
                <h4>Violation %: ${item?.percent}</h4>
                <h4>Violation Count: ${item?.count}</h4>
                </div>`,
            ]);
            serviceArray.push(...serviceArrayModify);
        }
        const myData = {
            services: serviceArray || [],
            timestamps: data?.timestamps || [],
            violation_count: data?.policyStats?.violation_count,
            historyId: data?.policyStats?.historyId || null,
            recordFound: data?.recordFound,
        };
        yield put(successServicesViolations(myData));
    } catch (error) {
        yield put(failureServicesViolations(error));
    }
}

// ********** {TODO: Get Request for policies data}***//
function* policiesViolationsWatcher() {
    yield takeLatest(ViolationsTypes.POLICIES_VIOLATIONS_REQUEST, policiesViolationsWorker);
}
function* policiesViolationsWorker(payload) {
    try {
        yield put({ type: ViolationsTypes.VIOLATIONS_LOADING });
        const { data } = yield call(fetchPoliciesViolations, payload);
        if (data?.policies) {
            var policiesArray = [['Task', 'Hours per Day', { role: 'tooltip', type: 'string', p: { html: true } }]];
            const policiesArrayModify = data?.policies?.map((item) => [
                item?.name,
                item?.percentage,
                `<div style="width">
                <h4>Violation %: ${item?.percentage}</h4>
                <h4>Violation Count: ${item?.violationCount}</h4>
                </div>`,
            ]);
            policiesArray.push(...policiesArrayModify);
        }
        const myData = {
            policies: policiesArray || [],
            recordFound: data?.recordFound,
        };
        yield put(successPoliciesViolations(myData));
    } catch (error) {
        yield put(failurePoliciesViolations(error));
    }
}

// ********** {TODO: Get Request for table data}***//
function* tableDetailsWatcher() {
    yield takeLatest(ViolationsTypes.TABLE_DETAILS_REQUEST, tableDetailsWorker);
}
function* tableDetailsWorker(payload) {
    try {
        yield put({ type: ViolationsTypes.VIOLATIONS_LOADING });
        const { data } = yield call(fetchTableData, payload);
        yield put(successTableDetails(data));
    } catch (error) {
        yield put(failureTableDetails(error));
    }
}

// ********** {TODO: Add func here}  ***//

export default all([fork(servicesViolationsWatcher), fork(policiesViolationsWatcher), fork(tableDetailsWatcher)]);
