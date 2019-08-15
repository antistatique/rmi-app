import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import StaticPagesService from 'services/static-pages';

export const setPageContent = createAction('static-pages/setPageContent');
export const setPageContentLoading = createAction('static-pages/setPageContentLoading');

export const getStaticPage = createThunkAction('static-pages/getStaticPage', (_options = {}) =>
  (dispatch) => {
    const { slug } = _options;
    return new Promise((resolve, reject) => {
      dispatch(setPageContentLoading({ loading: true }));

      StaticPagesService.getStaticPage(slug)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          dispatch(setPageContentLoading({ loading: false }));

          dispatch(setPageContent({ content: parsedData[0] }));
          resolve(parsedData);
        }).catch(errors => reject(errors));
    });
  });


export default {
  setPageContent,
  setPageContentLoading,
  getStaticPage
};
