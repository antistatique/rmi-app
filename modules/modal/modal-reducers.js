import * as actions from './modal-actions';
import initialState from './modal-initial-state';

export default {
  [actions.toggleModal]: state => ({
    ...state,
    visible: !state.visible
  }),
  [actions.resetModal]: state => ({
    ...state,
    visible: initialState.visible,
    content: initialState.content,
    links: initialState.links,
    title: initialState.title
  }),
  [actions.setTitle]: (state, { payload }) => ({
    ...state,
    title: payload
  }),
  [actions.setContent]: (state, { payload }) => ({
    ...state,
    content: payload
  }),
  [actions.setLinks]: (state, { payload }) => ({
    ...state,
    links: payload
  })
};
