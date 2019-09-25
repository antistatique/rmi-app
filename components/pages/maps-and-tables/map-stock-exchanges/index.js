import { connect } from 'react-redux';

import { getPaths } from './map-stock-exchanges-selectors';
import MapStockExchanges from './map-stock-exchanges-component';

export default connect(
  state => ({ paths: getPaths(state) }),
  {}
)(MapStockExchanges);
