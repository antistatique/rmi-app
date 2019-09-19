import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const taxJurisdictions = state => state.companies.taxJurisdictions;

export const getPaths = createSelector(
  [taxJurisdictions],
  (_taxJurisdictions = []) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedTaxJurisdictions = uniqBy(_taxJurisdictions, 'country.id');
        const iso = geography.properties.ISO_A3;
        const country = selectedTaxJurisdictions.find(taxJurisdiction => taxJurisdiction.country.code === iso) || {};

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: false,
            isSelected: false,
            isHighlighted: false,
            countryId: country.id,
            isHome: !(Object.keys(country).length === 0 && country.constructor === Object),
            isProducing: false
          }
        };
      })
);

export default { getPaths };
