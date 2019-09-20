import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class MapStockExchangesFilters extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    setStockExchangesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCompany: null }

  handleCompany = (selectedCompany) => {
    this.props.setStockExchangesFilters({ company: selectedCompany.value });
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

export default MapStockExchangesFilters;
