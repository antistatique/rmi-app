// redux
import { connect } from 'react-redux';

// selectors
import { getResearchInsight } from './research-insight-detail-selectors';

import ResearchInsightDetail from './research-insight-detail-component';

export default connect(
  state => ({
    researchInsight: getResearchInsight(state),
    currentLanguage: state.language.current
  })
)(ResearchInsightDetail);
