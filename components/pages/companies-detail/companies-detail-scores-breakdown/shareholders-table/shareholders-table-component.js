import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import Table from 'components/common/table';
import Paginator from 'components/common/paginator';
import Search from 'components/common/search';
import Unknowndata from '../unknown-data';

// styles
import styles from './shareholders-table-styles.scss';

class ShareholdersTable extends PureComponent {
  static propTypes = {
    shareholders: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    shareholdersDate: PropTypes.string.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
  }

  static renderUnknown = () => (
    <div className="unknown-container">
      <style jsx>{styles}</style>
      <span className="as-of">As of: Unknown</span>
      <span className="unknow-value">Unknown</span>
    </div>
  )

  handlePagination = nextPage => this.props.setPaginationPage(nextPage);

  handleSearch = (value) => {
    this.props.setPaginationPage(1);
    this.props.setSearch(value);
  }

  render() {
    const {
      shareholders,
      pagination,
      shareholdersDate
    } = this.props;
    const { size, limit, page } = pagination;

    return (
      <div className="c-shareholders-table">
        <style jsx>{styles}</style>
        <h3 id="known-shareholders" className="title">Shareholders (known)</h3>
        <div className="filters-container">
          <Search
            onSearch={this.handleSearch}
            placeholder="Search for a shareholder..."
          />
        </div>
        {shareholders.length ?
          <Fragment>
            <Table
              className="borderless"
              columns={[
                {
                  property: 'name',
                  header: { label: `As of: ${shareholdersDate || 'unknown'}` }
                },
                {
                  property: 'percent-shares',
                  header: { label: 'Shares (%)' },
                  props: {
                      style: {
                      textAlign: 'right',
                      minWidth: 90
                    }
                  }
                }
              ]}
              rows={shareholders}
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
          </Fragment> : <Unknowndata />}
      </div>
    )
  }
}

export default ShareholdersTable;
