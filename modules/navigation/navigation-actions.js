import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import ResultsSectionService from 'services/results-section';

export const setContent = createAction('navigation/setContent');

export const getResultsTree = createThunkAction('navigation/getResultsTree', (_options = {}) =>
  dispatch =>
    new Promise((resolve, reject) => {
      ResultsSectionService.getResultsTree(_options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);

          dispatch(setContent({ resultsChildren: parsedData }));
        })
        .catch(errors => reject(errors));
    }));

export default {
  setContent,
  getResultsTree
};
