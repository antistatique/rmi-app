import { connect } from 'react-redux';

import MapTaxJurisdictions from './map-known-tax-jurisdictions-component';
import { getPaths } from './map-known-tax-jurisdications-selectors';
import { setSelectedCompany, resetSelectedCompany } from '../../companies/companies-actions';

export default connect(
  state => ({
    paths: getPaths(state),
    selectedCountry: state.mapsAndTables.knownTaxFilters.country,
    selectedCompany: state.mapsAndTables.knownTaxFilters.company,
    companies: state.companies.list
  }),
  {
    setSelectedCompany,
    resetSelectedCompany
  }
)(MapTaxJurisdictions);
