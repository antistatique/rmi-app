import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import FatalityReportsService from 'services/fatality-reports';

export const setFatalityReports = createAction('fatalityReports/setFatalityReports');

export const getFatalityReports = createThunkAction('fatalityReports/getFatalityReports', _options =>
  (dispatch) => {
    const { queryParams } = _options;

    return new Promise((resolve, reject) => {
      FatalityReportsService.getFatalityReports(queryParams)
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
  getFatalityReports
};
