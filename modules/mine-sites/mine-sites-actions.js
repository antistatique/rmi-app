import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import MineSitesService from 'services/mine-sites';

import { setPaginationSize } from 'components/pages/maps-and-tables/table-mine-sites/table-mine-sites-actions';

export const setMineSites = createAction('mine-sites/setMineSites');
export const setMineSitesError = createAction('mine-sites/setMineSitesError');

export const getMineSites = createThunkAction('mine-sites/getMineSites', _options =>
  (dispatch) => {
    const { queryParams } = _options;

    return new Promise((resolve, reject) => {
      MineSitesService.getMineSites(queryParams)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setMineSites(parsedData));
        })
        .catch(({ errors }) => {
          dispatch(setMineSitesError(errors));
          reject(errors);
        });
    });
  });

export const getMineSitesPagination = createThunkAction('mine-sites/getMineSites', _options =>
  (dispatch, getState) => {
    const { tableMineSites } = getState();
    const { queryParams } = _options;
    const { page, limit } = tableMineSites.pagination;
    const { company, country } = tableMineSites.filters;

    const options = {
      ...queryParams,
      'page[number]': page,
      'page[size]': limit,
      'filter[country]': country,
      'filter[companies]': company
    };

    return new Promise((resolve, reject) => {
      MineSitesService.getMineSites(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setMineSites(parsedData));
        })
        .catch(({ errors }) => {
          dispatch(setMineSitesError(errors));
          reject(errors);
        });
    });
  });

export const getMineSite = createThunkAction('mine-sites/getMineSite', _options =>
  (dispatch) => {
    const { mineSiteId, queryParams } = _options;

    return new Promise((resolve, reject) => {
      MineSitesService.getMineSite(mineSiteId, queryParams)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          dispatch(setMineSites([parsedData]));
          resolve([parsedData]);
        })
        .catch(({ errors }) => {
          dispatch(setMineSitesError(errors));
          reject(errors);
        });
    });
  });

export default {
  setMineSites,
  getMineSite
};
