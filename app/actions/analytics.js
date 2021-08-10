import * as types from '../constants/ActionTypesAnalytics';

export function updateAnalytics(func) {
  return { type: types.UPDATE_ANALYTICS, func };
}

export function clearAnalytics(id) {
  return { type: types.CLEAR_ANALYTICS, id };
}


export function resolvedAnalytics(data) {
  return {
    type: types.RESOLVED_ANALYTICS_FETCH,
    data
  }
}
