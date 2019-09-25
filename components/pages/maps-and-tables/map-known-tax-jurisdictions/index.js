import { connect } from 'react-redux';

import MapTaxJurisdictions from './map-known-tax-jurisdictions-component';
import { getPaths } from './map-known-tax-jurisdications-selectors';

export default connect(
  state => ({ paths: getPaths(state) }),
  {}
)(MapTaxJurisdictions);
