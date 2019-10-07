import { connect } from 'react-redux';

import MineSiteFatalityReportsTable from './mine-site-fatality-reports-table-component';

export default connect(
  state => ({ fatalityReports: state.mineSites.list[0]['mine-site-fatality-reports'] }),
  {}
)(MineSiteFatalityReportsTable);
