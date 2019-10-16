import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class MapProducingCountriesFilters extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    selectedCountry: PropTypes.string,
    setProducingCountriesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCompany: null, selectedCountry: null }

  handleCompany = (selectedCompany) => {
    this.props.setProducingCountriesFilters({ company: selectedCompany.value });
  }

  handleCountry = (selectedCountry) => {
    this.props.setProducingCountriesFilters({ country: selectedCountry.value });
  }

  render() {
    const { companies, selectedCompany, countries, selectedCountry } = this.props;
    return (
      <div className="d-flex justify-content-end flex-row">
        <Select
          placeholder="Select a company"
          options={companies}
          theme="light"
          selectedValue={selectedCompany}
          onChange={this.handleCompany}
        />
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

export default MapProducingCountriesFilters;
