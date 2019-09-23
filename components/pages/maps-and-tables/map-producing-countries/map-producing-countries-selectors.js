import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const companies = state => state.companies.list;

export const getPaths = createSelector(
  [companies],
  (_companies = []) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const filteredCompanies = _companies.filter(company => company['producing-countries'] !== {});
        const countries = filteredCompanies.map(company => company['producing-countries']);
        const finalCountries = [];
        countries.map(country => country.map((producingCountry) => {
          finalCountries.push(producingCountry);
        }));
        const uniqCountries = uniqBy(finalCountries, 'id');
        const iso = geography.properties.ISO_A3;
        const country = uniqCountries.find(uniqCountry => uniqCountry.code === iso) || {};

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
)