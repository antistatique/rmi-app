import { createAction } from 'redux-tools';

export const toggleModal = createAction('modal/toggleModal');
export const resetModal = createAction('modal/resetModal');
export const setTitle = createAction('modal/setTitle');
export const setLinks = createAction('modal/setLinks');
export const setContent = createAction('modal/setContent');
