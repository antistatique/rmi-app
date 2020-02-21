
import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';

const mineSites = state => (state.companies.currentCompany || {})['mine-sites'];
const currentCompany = state => state.companies.currentCompany;

export const getAllMineSites = createSelector(
  [mineSites, currentCompany],
  (_mineSites = [], _company = {}) => {
    _mineSites.map((mineSite, index) => {
      const companiesShare = mineSite['company-mine-sites'].filter(companyMineSite => companyMineSite['company-id'] === parseInt(_company.id, 10));
      _mineSites[index].companiesShare = companiesShare;
    });

    return orderBy(_mineSites.filter(mineSite =>
      !mineSite['closed-mine'] && !mineSite['sold-after-may-2015']
    ).map(mineSite =>
      mineSite['in-rmi-scope'] ? ({...mineSite}) : ({...mineSite, name: `${mineSite.name}*`})
    ), 'name', ['asc']);
  }
    
);

export const getClosedMineSites = createSelector(
  [mineSites, currentCompany],
  (_mineSites = [], _company = {}) => {
    _mineSites.map((mineSite, index) => {
      const companiesShare = mineSite['company-mine-sites'].filter(companyMineSite => companyMineSite['company-id'] === parseInt(_company.id, 10));
      _mineSites[index].companiesShare = companiesShare;
    });

    return orderBy(_mineSites.filter(mineSite =>
      mineSite['closed-mine']
    ), 'name', ['asc']);
  }
);

export const getAssetsSoldAfterMay = createSelector(
  [mineSites],
  (_mineSites = []) =>
    orderBy(_mineSites.filter(mineSite =>
      mineSite['sold-after-may-2015']
    ), 'name', ['asc'])
);

export const hasJointVentureExcluded = createSelector(
  mineSites,
  (_mineSites = []) =>
    !!(_mineSites.filter(mineSite =>
      !mineSite['closed-mine'] && !mineSite['sold-after-may-2015']
    ).find(mineSite => !mineSite['in-rmi-scope']))
);

export default {
  getClosedMineSites,
  getAssetsSoldAfterMay,
  getAllMineSites,
  hasJointVentureExcluded
};
