import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';

// components
import Select from 'components/common/select';

// styles
import styles from './mine-sites-filters-styles.scss';

class MineSitesFilters extends PureComponent {
  static propTypes = {
    selectedMineSite: PropTypes.string,
    mineSites: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  static defaultProps = { selectedMineSite: null }

  handleMineSite = ({ value }) =>
    Router.pushRoute('mine-sites', {
      mineSite: value,
      language: this.props.currentLanguage
    });

  render() {
    const { mineSites, selectedMineSite } = this.props;

    return (
      <div className="c-mine-sites-filters">
        <style jsx>{styles}</style>
        <Select
          placeholder="Select a mine site"
          options={mineSites}
          theme="light"
          selectedValue={selectedMineSite}
          onChange={this.handleMineSite}
        />
      </div>
    );
  }
}

export default MineSitesFilters;
