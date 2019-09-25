import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const stockExchanges = state => state.stockExchanges.list;

export const getPaths = createSelector(
  [stockExchanges],
  (_stockExchanges = []) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedStockExchanges = uniqBy(_stockExchanges, 'country.id');
        const iso = geography.properties.ISO_A3;
        const country = selectedStockExchanges.find(stockExchange => stockExchange.country.code === iso) || {};

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