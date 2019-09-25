import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import Filters from './map-producing-countries-filters';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

class MapProducingCountries extends PureComponent {
  static propTypes = { paths: PropTypes.array.isRequired }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-stock-exchanges">
        <div className="row">
          <div className="col-12">
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapProducingCountries.setCountryColor}
              legend={[]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Filters />
          </div>
        </div>
      </div>
    );
  }
}

export default MapProducingCountries;
