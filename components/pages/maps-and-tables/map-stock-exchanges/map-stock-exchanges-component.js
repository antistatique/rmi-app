import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import Filters from './map-stock-exchanges-filters';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

class MapStockExchanges extends PureComponent {
  static propTypes = { paths: PropTypes.array.isRequired }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-stock-exchanges">
        <div className="row center-md">
          <div className="col-12">
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapStockExchanges.setCountryColor}
              legend={[]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
        </div>
      </div>
    );
  }
}

export default MapStockExchanges;
