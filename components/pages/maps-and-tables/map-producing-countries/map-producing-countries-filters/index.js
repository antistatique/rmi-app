import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { getCompanies, getCompany, resetCurrentCompany } from 'modules/companies/companies-actions';

import MapProducingCountriesFilters from './map-producing-countries-filters-component';
import { getUniqCompanies } from './map-producing-countries-filters-selectors';
import { setProducingCountriesFilters } from '../../maps-and-tables-actions';

class MapProducingCountriesFiltersContainer extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getCompany: PropTypes.func.isRequired,
    resetCurrentCompany: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged && (filters.company && nextFilters.company === undefined)) {
      this.props.resetCurrentCompany();
      this.props.getCompanies({ include: 'producing-countries' });
    } else if (filtersChanged && ((!isEmpty(filters) && isEmpty(nextFilters)) || (filters.company === undefined && nextFilters.company !== undefined))) {
      this.props.getCompany({
        companyId: nextFilters.company,
        queryParams: { include: 'producing-countries' }
      });
    }
  }

  render() {
    return (
      <MapProducingCountriesFilters {...this.props} />
    );
  }
}

export default connect(
  state => ({
    companies: getUniqCompanies(state),
    filters: state.mapsAndTables.producingCountriesFilters,
    selectedCompany: state.mapsAndTables.producingCountriesFilters.company
  }),
  {
    setProducingCountriesFilters,
    getCompanies,
    getCompany,
    resetCurrentCompany
  }
)(MapProducingCountriesFiltersContainer);
