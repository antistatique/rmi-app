import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Table from 'components/common/table';
import Select from 'components/common/select';
import Paginator from 'components/common/paginator';
import Gradient from 'components/common/gradient';

import { FATALITY_REPORTS_TABLE_COLUMNS, TABLE_SIZE_VALUES } from './table-fatality-reports-constants';

import styles from './table-fatality-reports-styles.scss';

class TableFatalityReports extends PureComponent {
  static propTypes = {
    fatalityReports: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    setPaginationLimit: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetPagination();
  }

  handlePagination = nextPage => this.props.setPaginationPage(nextPage);

  handleSize = ({ value }) => {
    if (value == null) {
      this.props.resetPagination();
    } else {
      this.props.setPaginationLimit(value);
      this.props.setPaginationPage(1);
    }
  }

  render() {
    const { pagination, fatalityReports } = this.props;
    const { size, page, limit } = pagination;

    return (
      <div className="c-fatality-reports-table">
        <style jsx>{styles}</style>
        <div className="table-container">
          <Table
            columns={FATALITY_REPORTS_TABLE_COLUMNS}
            rows={fatalityReports}
            className="-theme-2"
          />
        </div>

        <div className="pagination-filter">
          <Select
            placeholder={limit}
            options={TABLE_SIZE_VALUES}
            onChange={this.handleSize}
            className="c-select-bordered c-select-tiny"
            theme="light"
          />
        </div>

        <div className="paginator-container">
          <Paginator
            className="-theme-2"
            options={{
              size,
              page,
              limit
            }}
            onChange={this.handlePagination}
          />
        </div>
      </div>
    );
  }
}

export default TableFatalityReports;
