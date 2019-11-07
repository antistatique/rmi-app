import { createSelector } from 'reselect';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const mineSites = state => state.mineSites.list;
const currentLanguage = state => state.language.current;

export const getMarkers = createSelector(
  [mineSites, currentLanguage],
  (_mineSites = [], _currentLanguage) =>
    _mineSites.map(mineSite => ({
      id: mineSite.id,
      name: mineSite.name,
      country: mineSite.country.name,
      coordinates: [mineSite['coord-y'], mineSite['coord-x']],
      language: _currentLanguage
    }))
);

export const getPaths = createSelector(
  [],
  () => paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
    .map((geography, index) => {
      return {
        ...geography,
        properties: {
          ...geography.properties,
          id: index,
          isClickable: false,
          isSelected: false,
          isHighlighted: false,
          countryId: {},
          isHome: false,
          isProducing: false
        }
      };
    })
);
