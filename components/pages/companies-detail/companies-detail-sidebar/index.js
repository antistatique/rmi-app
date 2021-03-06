import { connect } from 'react-redux';

import CompaniesDetailSidebar from './companies-detail-sidebar-component';

export default connect(
  state => ({ company: state.companies.currentCompany }),
  null
)(CompaniesDetailSidebar);
