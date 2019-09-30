import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import AdverseImpactsServices from 'services/adverse-impacts';

export const setAdverseImpacts = createAction('adverseImpacts/setAdverseImpacts');
export const setAdverseImpactsLoading = createAction('adverseImpacts/setAdverseImpactsLoading');
export const setAdverseImpactsError = createAction('adverseImpacts/setAdverseImpactsError');

// pagination
export const setPaginationPage = createAction('adverseImpacts/setPaginationPage');
export const setPaginationSize = createAction('adverseImpacts/setPaginationSize');
export const setPaginationLimit = createAction('adverseImpacts/setPaginationLimit');
export const resetPagination = createAction('adverseImpacts/resetPagination');

export const getAdverseImpacts = createThunkAction('adverseImpacts/getAdverseimpacts', _options =>
  (dispatch, getState) => {
    const { adverseImpactsPage, adverseImpacts } = getState();
    const { company, mineSite, category } = adverseImpactsPage.filters;
    const { page, limit } = adverseImpacts.pagination;

    const options = {
      ..._options,
      'filter[companies]': company,
      'filter[mine-sites]': mineSite,
      'filter[categories]': category,
      'page[number]': page,
      'page[size]': limit
    };

    dispatch(setAdverseImpactsLoading(true));

    return new Promise((resolve, reject) => {
      AdverseImpactsServices.getAdverseImpacts(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));
          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);

          dispatch(setAdverseImpactsLoading(false));
          dispatch(setAdverseImpacts(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setAdverseImpacts,
  setAdverseImpactsLoading,
  setAdverseImpactsError,
  setPaginationPage,
  setPaginationSize,
  setPaginationLimit,
  resetPagination
};
