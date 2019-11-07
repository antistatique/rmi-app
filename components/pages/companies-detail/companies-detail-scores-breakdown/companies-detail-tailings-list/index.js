import { connect } from 'react-redux';

import CompaniesDetailTailingsList from './companies-detail-tailings-list-component';

export default connect(
  state => ({ tailings: state.companies.currentCompany['tailing-storage-facilities'] })
)(CompaniesDetailTailingsList);

