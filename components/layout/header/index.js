import { connect } from 'react-redux';

import HeaderComponent from './header-component';

export default connect(
  state => ({
    root: state.routes.root,
    currentLanguage: state.language.current})
)(HeaderComponent);
