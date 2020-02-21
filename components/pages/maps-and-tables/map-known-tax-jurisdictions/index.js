import { connect } from 'react-redux';

import MapTaxJurisdictions from './map-known-tax-jurisdictions-component';
import { getPaths, getCountries, getCompanies } from './map-known-tax-jurisdications-selectors';
import { setKnownTaxFilters } from '../maps-and-tables-actions';

export default connect(
  state => ({
    paths: getPaths(state),
    countries: getCountries(state),
    companies: getCompanies(state),
    taxJurisdictions: state.companies.taxJurisdictions,
    selectedCountry: state.mapsAndTables.knownTaxFilters.country,
    selectedCompany: state.mapsAndTables.knownTaxFilters.company
  }),
  { setKnownTaxFilters }
)(MapTaxJurisdictions);
