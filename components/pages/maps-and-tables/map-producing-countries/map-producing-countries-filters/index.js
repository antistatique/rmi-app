import { connect } from 'react-redux';

import MapProducingCountriesFilters from './map-producing-countries-filters-component';
import { getCountries } from './map-producing-countries-filters-selectors';
import { setProducingCountriesFilters } from '../../maps-and-tables-actions';

export default connect(
  state => ({
    countries: getCountries(state),
    filters: state.mapsAndTables.producingCountriesFilters,
    selectedCountry: state.mapsAndTables.producingCountriesFilters.country
  }),
  { setProducingCountriesFilters }
)(MapProducingCountriesFilters);
