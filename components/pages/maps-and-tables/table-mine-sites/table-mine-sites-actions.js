import { createAction } from 'redux-tools';

export const setFilters = createAction('mineSitesTable/setFilters');
export const resetFilters = createAction('mineSitesTable/resetFilters');

// pagination
export const setPaginationPage = createAction('mineSitesTable/setPaginationPage');
export const setPaginationSize = createAction('mineSitesTable/setPaginationSize');
export const setPaginationLimit = createAction('mineSitesTable/setPaginationLimit');
export const resetPagination = createAction('mineSitesTable/resetPagination');
