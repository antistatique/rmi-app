
import * as actions from './companies-actions';
import initialState from './companies-initial-state';

export default {
  [actions.setCompanies]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.resetCompanies]: state => ({ ...state, list: initialState.list }),
  [actions.setCompaniesLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setCompaniesScores]: (state, { payload }) => ({ ...state, companiesScores: payload }),
  [actions.setCompaniesError]: (state, { payload }) => ({ ...state, error: payload }),
  [actions.setTaxJurisdictions]: (state, { payload }) => ({ ...state, taxJurisdictions: payload }),
  [actions.setCurrentCompany]: (state, { payload }) => ({ ...state, currentCompany: payload }),
  [actions.resetCurrentCompany]: state => ({ ...state, currentCompany: initialState.currentCompany })
};
