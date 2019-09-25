import { connect } from 'react-redux';

import { getPaths } from './map-tailing-storage-facilities-selectors';
import MapTailingStorageFacilities from './map-tailing-storage-facilities-component';

export default connect(
  state => ({ paths: getPaths(state) }),
  {}
)(MapTailingStorageFacilities);
