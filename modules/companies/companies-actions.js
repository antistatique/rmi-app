import { createAction, createThunkAction } from 'redux-tools';
import Jsona from 'jsona';

// services
import CompaniesService from 'services/companies';
import ScoresService from 'services/scores';

export const setCompanies = createAction('companies/setCompanies');
export const resetCompanies = createAction('companies/resetCompanies');
export const setCompaniesLoading = createAction('companies/setCompaniesLoading');
export const setCompaniesScores = createAction('companies/setCompaniesScores');
export const setCompaniesError = createAction('companies/setCompaniesError');
export const setTaxJurisdictions = createAction('companies/setTaxJurisdictions');
export const setCurrentCompany = createAction('companies/setCurrentCompany');
export const resetCurrentCompany = createAction('companies/resetCurrentCompany');

export const getCompanies = createThunkAction('companies/getCompanies', _options =>
  (dispatch, getState) => {
    const { companiesPage } = getState();
    const { commodities } = companiesPage.filters;

    const options = {
      ..._options,
      // 'filter[countries]': country,
      'filter[commodities]': commodities ? commodities.join(',') : undefined
    };

    dispatch(setCompaniesLoading(true));

    return new Promise((resolve, reject) => {
      CompaniesService.getCompanies(options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);
          resolve(parsedData.sort((currentElement, nextElement) => {
            // Due to API inconsistency, the array of companies needs to be ordered
            const currentElementNormalized = currentElement.name.toLowerCase();
            const nextElementNormalized = nextElement.name.toLowerCase();
            if (currentElementNormalized < nextElementNormalized) {
              return -1;
            } else if (currentElementNormalized > nextElementNormalized) {
              return 1;
            }
            return 0;
          }));
          dispatch(setCompaniesLoading(false));
          dispatch(setCompanies(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });


export const getCompany = createThunkAction('companies/getCompany', _options =>
  (dispatch) => {
    const { companyId, queryParams } = _options;

    dispatch(setCompaniesLoading(true));

    return new Promise((resolve, reject) => {
      CompaniesService.getCompany(companyId, queryParams)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setCompaniesLoading(false));
          dispatch(setCurrentCompany(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });

export const getCompaniesScores = createThunkAction('companies/getCompaniesScores', _options =>
  dispatch =>
    new Promise((resolve, reject) => {
      ScoresService.getScores(_options)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setCompaniesScores(parsedData));
        })
        .catch(errors => reject(errors));
    }));

export const getTaxJurisdictions = createThunkAction('companies/getTaxJurisdictions', _options =>
  (dispatch) => {
    const { queryParams } = _options;
    return new Promise((resolve, reject) => {
      CompaniesService.getTaxJurisdictions(queryParams)
        .then((data) => {
          const parsedData = new Jsona().deserialize(data);

          resolve(parsedData);
          dispatch(setTaxJurisdictions(parsedData));
        })
        .catch(errors => reject(errors));
    });
  });


export default {
  setCompanies,
  setCompaniesError,
  getCompanies,
  getCompany,
  getCompaniesScores,
  getTaxJurisdictions,
  setTaxJurisdictions,
  setCurrentCompany
};
