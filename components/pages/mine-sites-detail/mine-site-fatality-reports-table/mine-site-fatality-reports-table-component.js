import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from 'components/common/table';

import { MINE_SITE_FATALITY_REPORTS_COLUMNS } from './mine-site-fatality-reports-table-constants';
import styles from './mine-site-fatality-reports-styles.scss';

class MineSiteFatalityReportsTable extends PureComponent {
  static propTypes = { fatalityReports: PropTypes.array.isRequired }

  render() {
    return (
      <div className="c-mine-site-fatality-reports-table">
        <style jsx>{styles}</style>
        <h3 className="title text-left">Fatality reports</h3>
        <div className="table-container">
          <Table
            columns={MINE_SITE_FATALITY_REPORTS_COLUMNS}
            rows={this.props.fatalityReports}
            className="-theme-2"
          />
        </div>
      </div>
    );
  }
}

export default MineSiteFatalityReportsTable;
