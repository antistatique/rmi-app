import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Table from 'components/common/table';
import Search from 'components/common/search';
import Paginator from 'components/common/paginator';
import Spinner from 'components/common/spinner';
import Select from 'components/common/select';

// constants
import { ASSESSMENTS_TABLE_COLUMNS, TABLE_SIZE_VALUES } from './mine-sites-detail-assessments-table-constants';

// styles
import styles from './mine-sites-detail-assessments-table-styles.scss';

class MineSitesDetailAssessmentsTable extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    resetPagination: PropTypes.func.isRequired,
    setPaginationLimit: PropTypes.func.isRequired
  }

  handlePagination = nextPage => this.props.setPaginationPage(nextPage);

  handleSearch = (value) => {
    this.props.setPaginationPage(1);
    this.props.setSearch(value);
  }

  handleSize = ({ value }) => {
    if (value == null) {
      this.props.resetPagination();
    } else {
      this.props.setPaginationLimit(value);
      this.props.setPaginationPage(1);
    }
  }

  render() {
    const { data, pagination, loading } = this.props;
    const { size, page, limit } = pagination;

    return (
      <div className="c-mine-sites-detail-assessments-table">
        <style jsx>{styles}</style>
        <h3 className="title text-left">Source documents used in scoring</h3>
        {data.length ?
          <div>
            <div className="filters-container">
              <Search
                onSearch={this.handleSearch}
                placeholder="Search for a document..."
              />
            </div>
            <Table
              columns={ASSESSMENTS_TABLE_COLUMNS}
              rows={data}
            />
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
          </div> :
          <div className="no-data">
            No documents
          </div>}
        {loading && <Spinner />}
      </div>
    );
  }
}

export default MineSitesDetailAssessmentsTable;
