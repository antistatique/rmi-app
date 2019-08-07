import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import ResultsSectionService from 'services/results-section';

export const setPageContent = createAction('static-content/setPageContent');
export const setPageContentLoading = createAction('static-content/setPageContentLoading');
export const setResourceId = createAction('static-content/setResourceId');

export const getResultSection = createThunkAction('static-content/getResultSection', (_options = {}) =>
  dispatch =>
    new Promise((resolve, reject) => {
      dispatch(setPageContentLoading(true));

      ResultsSectionService.getResultsTree(_options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          dispatch(setPageContentLoading(false));

          resolve(parsedData);
          dispatch(setPageContent(parsedData));
        }).catch(errors => reject(errors));
    }));

export default {
  setPageContent,
  setPageContentLoading,
  setResourceId,
  getResultSection
};
