import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class MapProducingCountriesFilters extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    setProducingCountriesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCompany: null }

  handleCompany = (selectedCompany) => {
    this.props.setProducingCountriesFilters({ company: selectedCompany.value });
  }

  render() {
    const { companies, selectedCompany } = this.props;
    return (
      <Select
        placeholder="Select a company"
        options={companies}
        theme="light"
        selectedValue={selectedCompany}
        onChange={this.handleCompany}
      />
    );
  }
}

export default MapProducingCountriesFilters;
