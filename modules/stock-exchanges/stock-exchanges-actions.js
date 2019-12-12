import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import StockExchangesService from 'services/stock-exchanges';

export const setStockExchanges = createAction('stockExchanges/setStockExchanges');

export const getStockExchanges = createThunkAction('stockExchanges/getStockExchanges', _options =>
  (dispatch, getState) => {
    const { queryParams } = _options;
    const { mapsAndTables } = getState();
    const { country } = mapsAndTables.stockExchangesFilters;

    const options = {
      ...queryParams,
      'filter[country]': country
    };

    return new Promise((resolve, reject) => {
      StockExchangesService.getStockExchanges(options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setStockExchanges(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setStockExchanges,
  getStockExchanges
};
