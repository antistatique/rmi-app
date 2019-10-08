import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

class MapTaxJurisdictions extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    resetSelectedCompany: PropTypes.func.isRequired,
    setSelectedCompany: PropTypes.func.isRequired
  }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-tax-jurisdictions">
        <div className="row mb-4">
          <div class="col-xs-12 col-md-4">
            <CompaniesList
              onMouseEnter={({ id }) => { this.props.setSelectedCompany(id); }}
              onMouseLeave={() => { this.props.resetSelectedCompany(); }}
            />
          </div>
          <div className="col-xs-12 col-md-8">
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapTaxJurisdictions.setCountryColor}
              legend={[]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapTaxJurisdictions;
