import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getTaxJurisdictions } from 'modules/companies/companies-actions';

import MapTaxJurisdicitonsFilters from './map-known-tax-jurisdications-filters-component';
import { getCountries } from './map-known-tax-jurisdications-filters-selectors';
import { setKnownTaxFilters } from '../../maps-and-tables-actions';

class MapTaxJurisdictionsFiltersContainer extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    getTaxJurisdictions: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) {
      this.props.getTaxJurisdictions({ queryParams: { include: ['country', 'company', 'company.secondary-country'].join(','), 'page[size]': 1000 } });
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
    countries: getCountries(state),
    filters: state.mapsAndTables.knownTaxFilters,
    selectedCountry: state.mapsAndTables.knownTaxFilters.country
  }),
  {
    setKnownTaxFilters,
    getTaxJurisdictions
  }
)(MapTaxJurisdictionsFiltersContainer);
