import { connect } from 'react-redux';

import StackedBarsVertical from './stacked-bars-vertical-component';

export default connect(
  state => ({ isPrevYearVisible: state.chart.isPrevYearVisible }),
  { }
)(StackedBarsVertical);


