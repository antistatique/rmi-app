import { createAction, createThunkAction } from 'redux-tools';

export const setPageContent = createAction('static-content/setPageContent');
export const setPageContentLoading = createAction('static-content/setPageContentLoading');
export const setResourceId = createAction('static-content/setResourceId');


export default {
  setPageContent,
  setPageContentLoading,
  setResourceId
};
