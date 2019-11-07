import { createAction, createThunkAction } from 'redux-tools';
import { Deserializer } from 'jsonapi-serializer';

import LeadingPracticesService from 'services/leading-practices';

export const setLeadingPractices = createAction('leading-practices-page/setLeadingPractices');
export const setSelectedLeadingPractice = createAction('leading-practices-page/setSelectedLeadingPractice');
export const setLeadingPracticesFilters = createAction('leading-practices-page/setLeadingPracticesFilters');
export const resetLeadingPracticesFilters = createAction('leading-practices-page/resetLeadingPracticesFilters');
export const setLeadingPracticesLoading = createAction('leading-practices-page/setLeadingPracticesLoading');
export const setPaginationPage = createAction('leading-practices-page/setPaginationPage');
export const setPaginationSize = createAction('leading-practices-page/setPaginationSize');
export const resetPagination = createAction('leading-practices-page/resetPagination');

export const getLeadingPractices = createThunkAction('leading-practices-page/getLeadingPractices', (_options = {}) =>
  (dispatch, getState) => {
    const { leadingPracticesPage } = getState();
    const { pagination, filters } = leadingPracticesPage.leadingPractices;
    const { indicator, company, topic } = filters;
    const { limit, page } = pagination;
    const deserializer = new Deserializer({});

    const options = {
      ..._options,
      'filter[indicators]': indicator,
      'filter[companies]': company,
      'filter[topics]': topic,
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


export default {
  setLeadingPractices,
  setLeadingPracticesLoading,
  getLeadingPractices,
  setPaginationPage,
  setPaginationSize
};
