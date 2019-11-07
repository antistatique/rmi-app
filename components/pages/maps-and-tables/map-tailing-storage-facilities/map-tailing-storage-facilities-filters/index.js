import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getTailingStorageFacilities } from 'modules/tailing-storage-facilities/tailing-storage-facilities-actions';

import MapTailingStorageFacilitiesFilters from './map-tailing-storage-facilities-filters-component';
import { getCompanies } from './map-tailing-storage-facilities-filters-selectors';
import { setTailingStorageFacilitiesFilters } from '../../maps-and-tables-actions';

class MapTailingStorageFacilitiesFiltersContainer extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    getTailingStorageFacilities: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) {
      this.props.getTailingStorageFacilities({ queryParams: { include: ['country', 'company'].join(',') } });
    }
  }

  render() {
    return (
      <MapTailingStorageFacilitiesFilters {...this.props} />
    );
  }
}

export default connect(
  state => ({
    companies: getCompanies(state),
    filters: state.mapsAndTables.tailingStorageFacilitiesFilters,
    selectedCompany: state.mapsAndTables.tailingStorageFacilitiesFilters.company
  }),
  {
    setTailingStorageFacilitiesFilters,
    getTailingStorageFacilities
  }
)(MapTailingStorageFacilitiesFiltersContainer);
