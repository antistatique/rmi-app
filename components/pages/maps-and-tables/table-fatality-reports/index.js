import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { setPaginationPage, setPaginationLimit, resetPagination, getFatalityReports } from 'modules/fatality-reports/fatality-reports-actions';
import { getFatalityReportsData } from './table-fatality-reports-selectors';
import TableFatalityReports from './table-fatality-reports-component';

class TableFatalityReportsContainer extends PureComponent {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    getFatalityReports: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    const { pagination: nextPagination } = nextProps;

    const paginationChanged = !isEqual(pagination, nextPagination);

    if (paginationChanged) {
      this.props.getFatalityReports({ queryParams: { include: 'company' } });
    }
  }

  render() {
    return (
      <TableFatalityReports {...this.props} />
    );
  }
}

export default connect(
  state => ({
    fatalityReports: getFatalityReportsData(state),
    pagination: state.fatalityReports.pagination
  }),
  {
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    getFatalityReports
  }
)(TableFatalityReportsContainer);
