import { connect } from 'react-redux';

import { getPaths, getMarkers } from './map-tailing-storage-facilities-selectors';
import MapTailingStorageFacilities from './map-tailing-storage-facilities-component';

export default connect(
  state => ({ paths: getPaths(state), markers: getMarkers(state) }),
  {}
)(MapTailingStorageFacilities);
