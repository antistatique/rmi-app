import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class MapStockExchangesFilters extends PureComponent {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string,
    setStockExchangesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCountry: null }

  handleCountry = (selectedCountry) => {
    this.props.setStockExchangesFilters({ country: selectedCountry.value });
  }

  render() {
    const { countries, selectedCountry } = this.props;
    return (
      <div className="d-flex justify-content-end flex-row">
        <Select
          placeholder="Select a country"
          options={countries}
          theme="light"
          selectedValue={selectedCountry}
          onChange={this.handleCountry}
        />
      </div>
    );
  }
}

export default MapStockExchangesFilters;
