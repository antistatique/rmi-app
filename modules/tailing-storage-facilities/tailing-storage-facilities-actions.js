import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

import TailingStorageFacilitiesService from 'services/tailing-storage-facilities';

export const setTailingStorageFacilities = createAction('tailingStorageFacilities/setTailingStorageFacilities');

export const getTailingStorageFacilities = createThunkAction('tailingStorageFacilities/getTailingStorageFacilities', _options =>
  (dispatch, getState) => {
    const { queryParams } = _options;
    const { mapsAndTables } = getState();
    const { company } = mapsAndTables.tailingStorageFacilitiesFilters;

    const options = {
      ...queryParams,
      'filter[company]': company,
      'page[size]': 500
    };

    return new Promise((resolve, reject) => {
      TailingStorageFacilitiesService.getTailingStorageFacilities(options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setTailingStorageFacilities(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export default {
  setTailingStorageFacilities,
  getTailingStorageFacilities
};
