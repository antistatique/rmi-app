import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class MapTaxJurisdictionsFilters extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    selectedCountry: PropTypes.string,
    setKnownTaxFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCompany: null, selectedCountry: null }

  handleCompany = (selectedCompany) => {
    this.props.setKnownTaxFilters({ company: selectedCompany.value });
  }

  handleCountry = (selectedCountry) => {
    this.props.setKnownTaxFilters({ country: selectedCountry.value });
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

export default MapTaxJurisdictionsFilters;
