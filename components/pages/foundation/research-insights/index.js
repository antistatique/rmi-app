// redux
import { connect } from 'react-redux';


import ResearchInsightsListPage from './research-insights-list-component';

export default connect(
  state => ({
    researchInsights:  state.staticContent.content,
    currentLanguage: state.language.current
  })
)(ResearchInsightsListPage);
