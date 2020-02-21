import { connect } from 'react-redux';

import { getPaths, getCountries, getCompanies } from './map-producing-countries-selectors';
import MapProducingCountries from './map-producing-countries-component';
import { setProducingCountriesFilters } from '../maps-and-tables-actions';

export default connect(
  state => ({
    paths: getPaths(state),
    companies: getCompanies(state),
    countries: getCountries(state),
    selectedCountry: state.mapsAndTables.producingCountriesFilters.country,
    selectedCompany: state.mapsAndTables.producingCountriesFilters.company
  }),
  { setProducingCountriesFilters }
)(MapProducingCountries);
