import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import shareholdersService from 'services/shareholders';

export const setShareholders = createAction('shareholders/setshareholders');
export const setLoading = createAction('shareholders/setLoading');

// search
export const setSearch = createAction('shareholders/setSearch');
export const resetSearch = createAction('shareholders/resetSearch');

// pagination
export const setPaginationPage = createAction('shareholders/setPaginationPage');
export const setPaginationSize = createAction('shareholders/setPaginationSize');
export const setPaginationLimit = createAction('shareholders/setPaginationLimit');
export const resetPagination = createAction('shareholders/resetPagination');

export const getShareholders = createThunkAction('shareholders/getshareholders', _options =>
  (dispatch, getState) => {
    const { shareholders } = getState();
    const { pagination, search } = shareholders;
    const { page, limit } = pagination;

    const options = {
      ..._options,
      'page[number]': page,
      'page[size]': limit,
      'filter[name]': search === '' || !search ? undefined : search
    };

    dispatch(setLoading(true));

    return new Promise((resolve, reject) => {
      shareholdersService.getShareholders(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));

          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);
          dispatch(setShareholders(parsedData));
          dispatch(setLoading(false));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setShareholders,
  getShareholders
};
