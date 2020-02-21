import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import beneficialOwnersService from 'services/beneficial-owners';

export const setBeneficialOwners = createAction('beneficialOwners/setBeneficialOwners');
export const setLoading = createAction('shareholders/setLoading');

// pagination
export const setPaginationPage = createAction('shareholders/setPaginationPage');
export const setPaginationSize = createAction('shareholders/setPaginationSize');
export const setPaginationLimit = createAction('shareholders/setPaginationLimit');
export const resetPagination = createAction('shareholders/resetPagination');

export const getBeneficialOwners = createThunkAction('beneficialOwners/getBeneficialOwners', _options =>
  (dispatch, getState) => {
    const { beneficialOwners } = getState();
    const { pagination } = beneficialOwners;
    const { page, limit } = pagination;

    const options = {
      ..._options,
      'page[number]': page,
      'page[size]': limit
    };

    dispatch(setLoading(true));

    return new Promise((resolve, reject) => {
      beneficialOwnersService.getShareholders(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));

          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);
          dispatch(setBeneficialOwners(parsedData));
          dispatch(setLoading(false));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  getBeneficialOwners,
  setBeneficialOwners
};
