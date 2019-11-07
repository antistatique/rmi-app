import { connect } from 'react-redux';
import * as actions from './maps-and-tables-actions';
import * as reducers from './maps-and-tables-reducers';
import initialState from './maps-and-tables-initial-state';

import MapsAndTables from './maps-and-tables-component';

export { actions, initialState, reducers };

export default connect(
  state => ({}),
  {}
)(MapsAndTables);
