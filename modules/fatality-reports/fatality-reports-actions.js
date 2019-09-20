import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import FatalityReportsService from 'services/fatality-reports';

export const setFatalityReports = createAction('fatalityReports/setFatalityReports');

// pagination
export const setPaginationPage = createAction('fatalityReports/setPaginationPage');
export const setPaginationSize = createAction('fatalityReports/setPaginationSize');
export const setPaginationLimit = createAction('fatalityReports/setPaginationLimit');
export const resetPagination = createAction('fatalityReports/resetPagination');

export const getFatalityReports = createThunkAction('fatalityReports/getFatalityReports', _options =>
  (dispatch, getState) => {
    const { fatalityReports } = getState();
    const { queryParams } = _options;
    const { page, limit } = fatalityReports.pagination;

    const options = {
      ...queryParams,
      'page[number]': page,
      'page[size]': limit
    };

    return new Promise((resolve, reject) => {
      FatalityReportsService.getFatalityReports(options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setFatalityReports(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setFatalityReports,
  getFatalityReports,
  setPaginationPage,
  setPaginationSize,
  setPaginationLimit,
  resetPagination
};
