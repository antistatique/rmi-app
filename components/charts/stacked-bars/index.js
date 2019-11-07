import { connect } from 'react-redux';

import StackedBars from './stacked-bars-component';

export default connect(
  state => ({ isPrevYearVisible: state.chart.isPrevYearVisible }),
  { }
)(StackedBars);


