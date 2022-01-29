import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import CompaniesFilters from './companies-filters';

// constants
import { MAP_LEGEND } from './companies-constants';

// helpers
import { getCompanyCountryColor } from './companies-helpers';

class Companies extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    setFilters: PropTypes.func.isRequired,
    setSelectedCompany: PropTypes.func.isRequired,
    resetSelectedCompany: PropTypes.func.isRequired
  }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);

  componentWillUnmount() {
    this.props.resetSelectedCompany();
  }

  handleClickGeography = (geography) => {
    const { countryId } = geography.properties;
    this.props.setFilters({ country: countryId });
  };

  render() {
    const {
      paths,
      setSelectedCompany,
      resetSelectedCompany
    } = this.props;

    return (
      <div className="c-companies-page">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12 col-lg-5">
                <h2 className="title">Companies</h2>
              </div>
              <div className="col-xs-12 col-sm-7">
                <p>
                The RMI Report 2022 covers 40 companies from 22 home countries, including publicly-listed, state-owned and private companies.
                These companies control more than 1,000 mine sites across 57 countries. The assessment covers most mined commodities, excluding oil and gas.
                It is possible to filter by company, using the names on the left-hand side, and also to by producing country or commodity, using the fields below.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="section -dark">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12 col-md-4">
                  <CompaniesFilters className="-no-tablet" />
                  <h4 className="title text-white mb-3">List of all companies</h4>
                  <CompaniesList
                    onMouseEnter={({ id }) => { setSelectedCompany(id); }}
                    onMouseLeave={() => { resetSelectedCompany(); }}
                  />
                </div>
                <div className="col-xs-12 col-md-8">
                  <CompaniesFilters className="-no-mobile" />
                  <div className="map-container">
                    <Map
                      paths={paths}
                      setCountryColor={Companies.setCountryColor}
                      legend={MAP_LEGEND}
                      onClickGeography={this.handleClickGeography}
                      center={[40, 10]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Companies;
