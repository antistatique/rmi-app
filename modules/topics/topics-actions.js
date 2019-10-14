import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import TopicsService from 'services/topics';

export const setTopics = createAction('topics/setTopics');

export const getTopics = createThunkAction('topics/getTopics', _options =>
  (dispatch) => {
    const { queryParams } = _options;
    return new Promise((resolve, reject) => {
      TopicsService.getTopics(queryParams)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setTopics(parsedData));
        })
        .catch(error => reject(error));
    });
  });

export default {
  setTopics,
  getTopics
};
