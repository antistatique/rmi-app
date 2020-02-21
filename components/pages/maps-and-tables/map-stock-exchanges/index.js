import { connect } from 'react-redux';

import { getPaths, getCompanies, getCountries } from './map-stock-exchanges-selectors';
import MapStockExchanges from './map-stock-exchanges-component';
import { setStockExchangesFilters } from '../maps-and-tables-actions';

export default connect(
  state => ({
    paths: getPaths(state),
    countries: getCountries(state),
    companies: getCompanies(state),
    selectedCountry: state.mapsAndTables.stockExchangesFilters.country,
    selectedCompany: state.mapsAndTables.stockExchangesFilters.company
  }),
  { setStockExchangesFilters }
)(MapStockExchanges);
