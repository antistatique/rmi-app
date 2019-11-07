import { connect } from 'react-redux';

import MapMineSites from './map-mine-sites-component';
import { getMarkers, getPaths } from './map-mine-sites-selectors';

export default connect(
  state => ({ markers: getMarkers(state), paths: getPaths(state) }),
  {}
)(MapMineSites);
