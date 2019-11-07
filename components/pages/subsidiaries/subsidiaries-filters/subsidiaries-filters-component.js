import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Search from 'components/common/search';
import Select from 'components/common/select';

// styles
import styles from './subsidiaries-filters-styles.scss';

class SubsidiariesFilters extends PureComponent {
  static propTypes = {
    setSearch: PropTypes.func.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string
  }

  static defaultProps = { selectedCompany: null }

  handleSearch = (value) => {
    this.props.setPaginationPage(1);
    this.props.setSearch(value);
  }

  handleCompanyFilter = (selectedCompany) => {
    this.props.setFilters({ company: selectedCompany.value });
  }

  render() {
    return (
      <div className="c-subsidiaries-filters">
        <style jsx>{styles}</style>
        <div className="filters-container d-flex flex-column flex-md-row justify-content-md-end">
          <Search
            onSearch={this.handleSearch}
            className="mb-3 mb-md-0 mr-0 mr-md-3"
          />
          <Select
            placeholder="Select a company"
            options={this.props.companies}
            theme="dark"
            onChange={this.handleCompanyFilter}
            selectedValue={this.props.selectedCompany}
            className="c-select-bordered"
          />
        </div>
      </div>
    );
  }
}

export default SubsidiariesFilters;
