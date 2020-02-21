import { connect } from 'react-redux';

import { setSelectedCountry } from 'modules/map/map-actions';
import Map from './map-component';

export default connect(
  state => ({ responsive: state.responsive }),
  { setSelectedCountry }
)(Map);
