import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import CategoriesService from 'services/categories';

export const setCategories = createAction('categories/setCategories');

export const getCategories = createThunkAction('categories/getCategories', _options =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      CategoriesService.getCategories(_options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData);

          dispatch(setCategories(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setCategories,
  getCategories
};
