
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const mineSite = state => state.mineSites.list[0] || {};

export const parseMineSite = createSelector(
  mineSite,
  (_mineSite) => {
    const companiesShare = [];

    _mineSite['company-mine-sites'].map((companyMineSite) => {
      const company = _mineSite.companies.find(_company => parseInt(_company.id, 10) === companyMineSite['company-id']);
      companiesShare.push({
        id: company.id,
        name: company.name,
        companyShare: companyMineSite['company-share']
      });
    });

    const fatalityReports = groupBy(_mineSite['mine-site-fatality-reports'], 'year');

    return {
      id: _mineSite.id,
      aliases: _mineSite.aliases,
      miningType: _mineSite['mining-type'],
      products: _mineSite.commodities.map(commodity => commodity.name).join(', '),
      openingYear: _mineSite['opening-year'],
      acquisitionYear: _mineSite['acquisition-year'],
      companies: _mineSite.companies,
      companyShare: _mineSite['company-share'],
      extraLanguages: _mineSite['extra-languages'],
      fatalityReports,
      companiesShare
    };
  }
);

export default { parseMineSite };
