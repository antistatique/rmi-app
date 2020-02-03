import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import subsidiariesService from 'services/subsidiaries';

export const setSubsidiaries = createAction('subsidiaries/setSubsidiaries');
export const setLoading = createAction('subsidiaries/setLoading');

// search
export const setSearch = createAction('subsidiaries/setSearch');
export const resetSearch = createAction('subsidiaries/resetSearch');

// filters
export const setFilters = createAction('subsidiaries/setFilters');
export const resetFilters = createAction('subsidiaries/resetFilters');

// pagination
export const setPaginationPage = createAction('subsidiaries/setPaginationPage');
export const setPaginationSize = createAction('subsidiaries/setPaginationSize');
export const setPaginationLimit = createAction('subsidiaries/setPaginationLimit');
export const resetPagination = createAction('subsidiaries/resetPagination');

export const getSubsidiaries = createThunkAction('subsidiaries/getSubsidiaries', _options =>
  (dispatch, getState) => {
    const { subsidiaries } = getState();
    const { pagination, search, filters } = subsidiaries;
    const { page, limit } = pagination;
    const { company } = filters;

    const options = {
      ..._options,
      'page[number]': page,
      'page[size]': limit,
      'filter[name]': search === '' || !search ? undefined : search,
      'filter[company]': company !== undefined ? company : _options['filter[company]']
    };

    dispatch(setLoading(true));

    return new Promise((resolve, reject) => {
      subsidiariesService.getSubsidiaries(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));

          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);
          dispatch(setSubsidiaries(parsedData));
          dispatch(setLoading(false));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setSubsidiaries,
  getSubsidiaries
};
