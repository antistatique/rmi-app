import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import Table from 'components/common/table';
import Paginator from 'components/common/paginator';
import Unknowndata from '../unknown-data';

import styles from './beneficial-owners-table-styles.scss';

class BeneficialOwnersTable extends PureComponent {
  static propTypes = {
    beneficialOwners: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    beneficialOwnersDate: PropTypes.string.isRequired
  }

  static renderUnknown = () => (
    <div className="unknown-container">
      <style jsx>{styles}</style>
      <span className="as-of">As of: Unknown</span>
      <span className="unknow-value">Unknown</span>
    </div>
  )

  handlePagination = nextPage => this.props.setPaginationPage(nextPage);

  render() {
    const {
      beneficialOwners,
      beneficialOwnersDate,
      pagination
    } = this.props;
    const { size, limit, page } = pagination;

    return (
      <div className="c-beneficial-owners-table">
        <style jsx>{styles}</style>
        <h3 className="title">Known Beneficial Owners</h3>
        {beneficialOwners.length ?
          <Fragment>
            <Table
              columns={[
                {
                  property: 'name',
                  header: { label: `As of: ${beneficialOwnersDate || 'unknown'}` }
                },
                {
                  property: 'percent-ownership',
                  header: { label: 'Shares (%)' },
                  props: {
                      style: {
                      textAlign: 'right',
                      minWidth: 90
                    }
                  }
                }
              ]}
              rows={beneficialOwners}
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
    );
  }
}

export default BeneficialOwnersTable;
