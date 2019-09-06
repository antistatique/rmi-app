import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Gradient from 'components/common/gradient';
import Table from 'components/common/table';

import { TAILINGS_TABLE_COLUMNS } from './companies-detail-tailings-list-constants';

import styles from './companies-detail-tailings-list-styles.scss';

class CompaniesDetailTailingsList extends PureComponent {
  static propTypes = { tailings: PropTypes.array.isRequired }

  render() {
    const { tailings } = this.props;

    return (
      <div className="c-companies-detail-tailings-list">
        <style jsx>{styles}</style>
        <div className="table">
          <h3 id="list-of-all-mine-sites" className="table-title -big">Tailings</h3>
          <Gradient className="-dark" >
            <Table
              columns={TAILINGS_TABLE_COLUMNS}
              rows={tailings}
              className="-theme-2"
            />
          </Gradient>
        </div>
      </div>
    );
  }
}

export default CompaniesDetailTailingsList;
