import { createAction, createThunkAction } from 'redux-tools';
import { Deserializer } from 'jsonapi-serializer';

import LeadingPracticesService from 'services/leading-practices';
import TopicsService from 'services/topics';
import CompaniesService from 'services/companies';
import Jsona from 'jsona';

export const setLeadingPractices = createAction('leading-practices-page/setLeadingPractices');
export const setSelectedLeadingPractice = createAction('leading-practices-page/setSelectedLeadingPractice');
export const setLeadingPracticesFilters = createAction('leading-practices-page/setLeadingPracticesFilters');
export const resetLeadingPracticesFilters = createAction('leading-practices-page/resetLeadingPracticesFilters');
export const setLeadingPracticesLoading = createAction('leading-practices-page/setLeadingPracticesLoading');
export const setTopics = createAction('leading-practices-page/setTopics');
export const setTopicsLoading = createAction('leading-practices-page/setTopicsLoading');
export const setTopicsError = createAction('leading-practices-page/setTopicsError');
export const setPaginationPage = createAction('leading-practices-page/setPaginationPage');
export const setPaginationSize = createAction('leading-practices-page/setPaginationSize');
export const resetPagination = createAction('leading-practices-page/resetPagination');

// Get companies.
export const setCompanies = createAction('leading-practices-page/setCompanies');
export const setCompaniesLoading = createAction('leading-practices-page/setCompaniesLoading');
export const setCompaniesError = createAction('leading-practices-page/setCompaniesError');

export const getLeadingPractices = createThunkAction('leading-practices-page/getLeadingPractices', (_options = {}) =>
  (dispatch, getState) => {
    const { leadingPracticesPage } = getState();
    const { pagination, filters } = leadingPracticesPage.leadingPractices;
    const { topic, company } = filters;
    const { limit, page } = pagination;
    const deserializer = new Deserializer({});

    const options = {
      ..._options,
      'filter[topic]': topic,
      'filter[company]': company,
      'page[number]': page,
      'page[size]': limit
    };

    return new Promise((resolve, reject) => {
      dispatch(setLeadingPracticesLoading(true));

      LeadingPracticesService.getLeadingPractices(options)
        .then((data) => {
          dispatch(setPaginationSize(data.meta['record-count']));

          deserializer.deserialize(data)
            .then((parsedData) => {
              resolve(parsedData);
              dispatch(setLeadingPracticesLoading(false));
              dispatch(setLeadingPractices(parsedData));
            })
            .catch(errors => reject(errors));
        });
    });
  });

export const getTopics = createThunkAction('leading-practices-page/getTopics', (_options = {}) =>
  (dispatch) => {
    const deserializer = new Deserializer({});

    return new Promise((resolve, reject) => {
      dispatch(setTopicsLoading(true));

      TopicsService.getTopics(_options)
        .then((data) => {
          deserializer.deserialize(data)
            .then((parsedData) => {
              resolve(parsedData);
              dispatch(setTopicsLoading(false));
              dispatch(setTopics(parsedData));
            })
            .catch(errors => reject(errors));
        });
    });
  });

export const getCompanies = createThunkAction('leading-practices-page/getCompanies', (_options = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setCompaniesLoading(true));

      CompaniesService.getCompanies(_options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData.sort((currentElement, nextElement) => {
            // Due to API inconsistency, the array of companies needs to be ordered
            const currentElementNormalized = currentElement.name.toLowerCase();
            const nextElementNormalized = nextElement.name.toLowerCase();
            if (currentElementNormalized < nextElementNormalized) {
              return -1;
            } else if (currentElementNormalized > nextElementNormalized) {
              return 1;
            }
            return 0;
          }));
          dispatch(setCompaniesLoading(false));
          dispatch(setCompanies(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setLeadingPractices,
  setLeadingPracticesLoading,
  getLeadingPractices,
  setPaginationPage,
  setPaginationSize,
  setTopics,
  setTopicsLoading,
  setTopicsError,
  getTopics,
  setCompanies,
  setCompaniesLoading,
  setCompaniesError,
  getCompanies
};
