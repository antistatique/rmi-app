import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getStockExchanges } from 'modules/stock-exchanges/stock-exchanges-actions';

import MapStockExchangesFilters from './map-stock-exchanges-filters-component';
import { getCountries } from './map-stock-exchanges-filters-selectors';
import { setStockExchangesFilters } from '../../maps-and-tables-actions';

class MapStockExchangesFiltersContainer extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    getStockExchanges: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) {
      this.props.getStockExchanges({ queryParams: { include: ['country'].join(',') } });
    }
  }

  render() {
    return (
      <MapStockExchangesFilters {...this.props} />
    );
  }
}

export default connect(
  state => ({
    countries: getCountries(state),
    filters: state.mapsAndTables.stockExchangesFilters,
    selectedCountry: state.mapsAndTables.stockExchangesFilters.country
  }),
  {
    setStockExchangesFilters,
    getStockExchanges
  }
)(MapStockExchangesFiltersContainer);
