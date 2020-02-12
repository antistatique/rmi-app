import { connect } from 'react-redux';

import CompaniesDetailTailingsList from './companies-detail-tailings-list-component';
import { sortTailings } from './companies-detail-tailings-list-selectors';

export default connect(
  state => ({ tailings: sortTailings(state) })
)(CompaniesDetailTailingsList);

