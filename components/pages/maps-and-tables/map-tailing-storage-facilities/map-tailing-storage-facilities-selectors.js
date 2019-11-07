import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const tailingStorageFacilities = state => state.tailingStorageFacilities.list;
const currentLanguage = state => state.language.current;

export const getPaths = createSelector(
  [tailingStorageFacilities],
  (_tailingStorageFacilities = []) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedTailingStorageFacilities = uniqBy(_tailingStorageFacilities, 'country.id');
        const iso = geography.properties.ISO_A3;
        const country = selectedTailingStorageFacilities.find(tailingStorageFacility => tailingStorageFacility.country.code === iso) || {};

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

export const getMarkers = createSelector(
  [tailingStorageFacilities, currentLanguage],
  (_tailingStorageFacilities = [], _currentLanguage) => 
    _tailingStorageFacilities.map(tailingStorageFacility => ({
      id: tailingStorageFacility.id,
      name: tailingStorageFacility.name,
      country: tailingStorageFacility.country.name,
      coordinates: [tailingStorageFacility['coord-y'], tailingStorageFacility['coord-x']],
      language: _currentLanguage
    }))
);
