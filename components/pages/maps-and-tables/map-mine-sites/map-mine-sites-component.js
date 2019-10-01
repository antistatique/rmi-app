import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

class MapMineSites extends PureComponent {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    paths: PropTypes.array.isRequired
  }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-producing-countries">
        <div className="row justify-content-center">
          <div className="col-12">
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapMineSites.setCountryColor}
              markers={this.props.markers}
              legend={[]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapMineSites;
