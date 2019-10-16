import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getTaxJurisdictions } from 'modules/companies/companies-actions';

import MapTaxJurisdicitonsFilters from './map-known-tax-jurisdications-filters-component';
import { parseCompanies, getCountries } from './map-known-tax-jurisdications-filters-selectors';
import { setKnownTaxFilters } from '../../maps-and-tables-actions';

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
    companies: parseCompanies(state),
    countries: getCountries(state),
    filters: state.mapsAndTables.knownTaxFilters,
    selectedCompany: state.mapsAndTables.knownTaxFilters.company,
    selectedCountry: state.mapsAndTables.knownTaxFilters.country
  }),
  {
    setKnownTaxFilters,
    getTaxJurisdictions
  }
)(MapTaxJurisdictionsFiltersContainer);
