import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';

class AdverseImpactsFilter extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    mineSites: PropTypes.array.isRequired,
    indicators: PropTypes.array.isRequired,
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

  handleIndicator = (selectedOption = {}) => {
    this.props.setFilters({ indicator: selectedOption.value });
  }

  render() {
    const { companies, mineSites, indicators, filters } = this.props;
    const { company, mineSite, indicator } = filters;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <Select
            placeholder="Select a company"
            options={companies}
            theme="dark"
            selectedValue={company}
            onChange={this.handleCompany}
          />
        </div>
        <div className="col-xs-12 col-sm-4">
          <Select
            placeholder="Select a mine-site"
            options={mineSites}
            theme="dark"
            selectedValue={mineSite}
            onChange={this.handleMineSite}
          />
        </div>
        <div className="col-xs-12 col-sm-4">
          <Select
            placeholder="Select a topic"
            options={indicators}
            theme="dark"
            selectedValue={indicator}
            onChange={this.handleIndicator}
          />
        </div>
      </div>
    );
  }
}

export default AdverseImpactsFilter;
