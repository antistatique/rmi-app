import { connect } from 'react-redux';

import { getPaths } from './map-producing-countries-selectors';
import { setSelectedCompany, resetSelectedCompany } from '../../companies/companies-actions';
import MapProducingCountries from './map-producing-countries-component';

export default connect(
  state => ({ paths: getPaths(state) }),
  {
    setSelectedCompany,
    resetSelectedCompany
  }
)(MapProducingCountries);
