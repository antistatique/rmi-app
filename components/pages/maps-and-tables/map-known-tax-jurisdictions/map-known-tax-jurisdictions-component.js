import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

import Filters from './map-known-tax-jurisdications-filters';

class MapTaxJurisdictions extends PureComponent {
  static propTypes = { paths: PropTypes.array.isRequired }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-tax-jurisdictions">
        <div className="row">
          <div className="col-3">
            <Filters />
          </div>
        </div>
        <Map
          paths={this.props.paths}
          center={[40, 10]}
          setCountryColor={MapTaxJurisdictions.setCountryColor}
          legend={[]}
        />
      </div>
    );
  }
}

export default MapTaxJurisdictions;
