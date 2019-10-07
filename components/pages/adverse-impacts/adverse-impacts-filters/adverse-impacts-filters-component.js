import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class AdverseImpactsFilter extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    mineSites: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    setFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
  }

  componentWillUnmount() {
    this.props.resetFilters();
  }

  handleCompany = (selectedOption = {}) => {
    this.props.setFilters({ company: selectedOption.value });
  }

  handleMineSite = (selectedOption = {}) => {
    this.props.setFilters({ mineSite: selectedOption.value });
  }

  handleCategory = (selectedOption = {}) => {
    this.props.setFilters({ category: selectedOption.value });
  }

  render() {
    const { companies, mineSites, categories, filters } = this.props;
    const { company, mineSite, category } = filters;

    return (
      <div className="d-flex flex-column flex-md-row justify-content-md-end">
        <Select
          placeholder="Select a company"
          options={companies}
          theme="dark"
          selectedValue={company}
          onChange={this.handleCompany}
          className="c-select-bordered ml-0 mb-3 mb-md-0 mr-0 mr-md-3"
        />
        <Select
          placeholder="Select a mine-site"
          options={mineSites}
          theme="dark"
          selectedValue={mineSite}
          onChange={this.handleMineSite}
          className="c-select-bordered ml-0 mb-3 mb-md-0 mr-0 mr-md-3"
        />
        <Select
          placeholder="Select a category"
          options={categories}
          theme="dark"
          selectedValue={category}
          onChange={this.handleCategory}
          className="c-select-bordered ml-0 mb-3 mb-md-0 mr-0"
        />
      </div>
    );
  }
}

export default AdverseImpactsFilter;
