import { createSelector } from 'reselect';
import { paths } from 'components/common/map/map-helpers';
import compact from 'lodash/compact';

// constants
import { EXCLUDED_COUNTRIES } from 'constants/map';

const countries = state => state.countries.list;
const indicators = state => state.indicators.list;
const currentLanguage = state => state.language.current;
const company = state => state.companies.currentCompany;

export const getUpdatedPaths = createSelector(
  [countries, company],
  (_countries = [], _company = {}) => {
    return paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const {
          country: companyCountry,
          'secondary-country': companySecondaryCountry,
          'producing-countries': companyProducingCountries
        } = _company;
        const homeCountries = [(companyCountry || {}).code, (companySecondaryCountry || {}).code];
        const producingCountries = (companyProducingCountries || []).map(country => country.code);
        const { ISO_A3: iso } = geography.properties;
        const country = _countries.find(_country => _country.code === iso) || {};

        if (!country) return false;

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isHome: compact(homeCountries).includes((country || {}).code),
            isProducing: producingCountries.includes((country || {}).code)
          }
        };
      });
  }

);

export const getIssueAreas = createSelector(
  indicators,
  (_indicators = []) =>
    _indicators.filter(indicator => indicator.kind === 'issue_areas')
);

export const getMarkers = createSelector(
  [company, currentLanguage],
  (_company = {}, _currentLanguage) =>
    (_company['selected-mine-sites'] || []).map(mineSite => ({
      id: mineSite.id,
      name: mineSite.name,
      country: mineSite.country.name,
      coordinates: [mineSite['coord-y'], mineSite['coord-x']],
      language: _currentLanguage
    }))
);

export default {
  getUpdatedPaths,
  getIssueAreas,
  getMarkers
};
