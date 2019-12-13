import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import Filters from './map-tailing-storage-facilities-filters';
import { getCompanyCountryColor } from '../../companies/companies-helpers';
import { MAP_LEGEND } from './map-tailing-storage-facilities-constants';

class MapTailingStorageFacilities extends PureComponent {
  static propTypes = { paths: PropTypes.array.isRequired, markers: PropTypes.array.isRequired }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-stock-exchanges">
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
        </div>
        <Map
          paths={this.props.paths}
          center={[40, 10]}
          markers={this.props.markers}
          markerType="tailings"
          setCountryColor={MapTailingStorageFacilities.setCountryColor}
          legend={MAP_LEGEND}
        />
      </div>
    );
  }
}

export default MapTailingStorageFacilities;
