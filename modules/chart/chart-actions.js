import { createAction, createThunkAction } from 'redux-tools';

export const setPreviousYearVisibility = createAction('chart/setPreviousYearVisibility');

export default {
  setPreviousYearVisibility
};
