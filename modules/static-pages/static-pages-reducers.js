import * as actions from './static-pages-actions';

export default {
  [actions.setPageContent]: (state, { payload }) => {
    const { content } = payload;

    return ({
      ...state,
      content
    });
  },
  [actions.setPageContentLoading]: (state, { payload }) => {
    const { loading } = payload;

    return ({
      ...state,
      loading
    });
  }
};
