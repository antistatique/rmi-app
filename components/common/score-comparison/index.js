import { connect } from 'react-redux';

import ScoreComparison from './score-comparison-component';

export default connect(
  state => ({ currentLanguage: state.language.current }),
  {}
)(ScoreComparison);
