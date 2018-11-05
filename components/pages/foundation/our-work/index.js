// redux
import { connect } from 'react-redux';

import OurWorkPage from './our-work-component';

export default connect(
  state => ({ content: state.staticContent.content }),
  {}
)(OurWorkPage);
