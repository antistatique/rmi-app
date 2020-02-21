
import { connect } from 'react-redux';

// actions
import { togglePrintable } from 'modules/app/app-actions';

import CompanyDetailHeader from './companies-detail-header-component';

export default connect(
  state => ({
    company: state.companies.currentCompany,
    currentLanguage: state.language.current
  }),
  { togglePrintable }
)(CompanyDetailHeader);
