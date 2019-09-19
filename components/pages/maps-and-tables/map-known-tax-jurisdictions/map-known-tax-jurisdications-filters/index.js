import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getTaxJurisdictions } from 'modules/companies/companies-actions';

import MapTaxJurisdicitonsFilters from './map-known-tax-jurisdications-filters-component';
import { getCompanies } from './map-known-tax-jurisdications-filters-selectors';
import {
  setKnownTaxFilters,
  resetProducingCountriesFilters,
  resetStockExchangesFilters
} from '../../maps-and-tables-actions';

class MapTaxJurisdictionsFiltersContainer extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    getTaxJurisdictions: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) {
      this.props.getTaxJurisdictions({ queryParams: { include: ['country', 'company'].join(',') } });
    }
  }

  render() {
    return (
      <MapTaxJurisdicitonsFilters {...this.props} />
    );
  }
}

export default connect(
  state => ({
    companies: getCompanies(state),
    filters: state.mapsAndTables.knownTaxFilters,
    selectedCompany: state.mapsAndTables.knownTaxFilters.company
  }),
  {
    setKnownTaxFilters,
    getTaxJurisdictions,
    resetProducingCountriesFilters,
    resetStockExchangesFilters
  }
)(MapTaxJurisdictionsFiltersContainer);
