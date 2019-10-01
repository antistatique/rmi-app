import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Table from 'components/common/table';
import Select from 'components/common/select';
import Paginator from 'components/common/paginator';

import { MINE_SITES_TABLE_COLUMNS, TABLE_SIZE_VALUES } from './table-mine-sites-constants';

import styles from './table-mine-sites-styles.scss';

class TableMineSites extends PureComponent {
  static propTypes = {
    mineSites: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
    setPaginationLimit: PropTypes.func.isRequired
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
    const { size, page, limit } = this.props.pagination;
    const { mineSites } = this.props;

    return (
      <div className="c-mine-sites-table">
        <style jsx>{styles}</style>
        <div className="table-container">
          <Table
            columns={MINE_SITES_TABLE_COLUMNS}
            rows={mineSites}
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

export default TableMineSites;
