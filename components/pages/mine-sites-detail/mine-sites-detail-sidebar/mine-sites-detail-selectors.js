
import { createSelector } from 'reselect';

const mineSite = state => state.mineSites.list[0] || {};

export const parseMineSite = createSelector(
  mineSite,
  (_mineSite) => {
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
      fatalityReports: _mineSite['mine-site-fatality-reports']
    };
  }
);

export default { parseMineSite };
