// redux
import { connect } from 'react-redux';

// selectors
import { getMedia } from './media-detail-selectors';

import MediaDetail from './media-detail-component';

export default connect(
  state => ({
    mediaRelease: getMedia(state),
    currentLanguage: state.language.current
  })
)(MediaDetail);
