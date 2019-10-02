import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Table from 'components/common/table';
import Icon from '../icon';

// constants
import { TOOLTIP_TABLE_COLUMNS } from './companies-list-constants';

// styles
import styles from './companies-list-styles.scss';

class CompaniesListTooltip extends PureComponent {
  static propTypes = {
    company: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    mineSites: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { mineSites, currentLanguage, handleClose } = this.props;

    this.mineSites = mineSites.map(mineSite => ({
      ...mineSite,
      language: currentLanguage,
      handleClose: handleClose
    }));
  }

  render() {
    const { company, currentLanguage, handleClose } = this.props;

    return (
      <div className="companies-list-tooltip">
        <style jsx>{styles}</style>
        <button className="companies-list-tooltip-close" onClick={handleClose}>
          <Icon name="cross" className="-small" />
        </button>
        <Table
          columns={TOOLTIP_TABLE_COLUMNS}
          rows={this.mineSites}
          className="-theme-2"
        />
        <Link
          route="company"
          params={{
            language: currentLanguage,
            company: company.id
          }}
        >
          <a className="company-link">Go to company report</a>
        </Link>
      </div>
    );
  }
}

export default CompaniesListTooltip;
