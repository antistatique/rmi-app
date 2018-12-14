import { connect } from 'react-redux';

// actions
import { toggleModal } from 'modules/app/app-actions';
import { setResourceId } from 'modules/static-content/static-content-actions';


// component
import ResearchInsightsBlock from './research-insights-block-component';

export default connect(
  state => ({ researchInsights:state.staticContent.content['research-insights'], }),
  {
    toggleModal,
    setResourceId
  }
)(ResearchInsightsBlock);
