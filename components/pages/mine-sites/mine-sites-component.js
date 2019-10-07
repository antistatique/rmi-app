import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

// utils
import breakpoints from 'utils/responsive';

// components
import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import MineSitesFilters from 'components/pages/mine-sites/mine-sites-filters';
import CountriesCentroids from 'components/common/map/data/countries-centroids.json';

// constants
import { MAP_LEGEND } from './mine-sites-constants';

// helpers
import { getCompanyCountryColor } from './mine-sites-helpers';

class MineSite extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    markers: PropTypes.array.isRequired,
    responsive: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
  }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);

  constructor(props) {
    super(props);

    this.state = { center: null, zoom: null };
  }

  componentWillUnmount() {
    this.props.resetFilters();
  }

  handleClickGeography = (geography, evt, map) => {
    const x = (evt.target.getBoundingClientRect().width * 100) / map.width;
    const y = (evt.target.getBoundingClientRect().height * 100) / map.height;
    const zoom = 100 / Math.max(x, y);
    const center = [CountriesCentroids[geography.properties.ISO_A2].lng, CountriesCentroids[geography.properties.ISO_A2].lat];
    const { ISO_A3 } = geography.properties;
    this.props.setFilters({ country: ISO_A3 });
    this.setState({ zoom, center });
  };

  handleOpenTooltip = ({ id }) => {
    this.props.setFilters({
      selectedCompany: +id,
      selectedMineSite: null
    });
  }

  handleCloseTooltip = () => { this.props.setFilters({ selectedCompany: null }); };

  render() {
    const { paths, markers, responsive } = this.props;

    return (
      <div className="c-mine-site-page">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-md-6">
                <h2 className="title">Mine Sites</h2>
              </div>
              <div className="col-md-6">
                <p>
                  In addition to the company-wide indicators,
                  six indicators are applied at a mine-site
                  level for the individually selected 127 mine
                  sites. Although these indicators are scored
                  to indicate each site’s level of performance,
                  these scores are not included in the thematic-area-level
                  scores for company-wide indicators.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="section -dark">
            <div className="l-layout">
              <div className="row">
                <div className="col-md-4">
                  <MediaQuery
                    maxDeviceWidth={breakpoints.md - 1}
                    values={{ deviceWidth: responsive.fakeWidth }}
                  >
                    <MineSitesFilters />
                  </MediaQuery>
                  <CompaniesList
                    isCompanyPage={false}
                    onOpenTooltip={this.handleOpenTooltip}
                    onCloseTooltip={this.handleCloseTooltip}
                  />
                </div>
                <div className="col-md-8">
                  <MediaQuery
                    minDeviceWidth={breakpoints.md}
                    values={{ deviceWidth: responsive.fakeWidth }}
                  >
                    <MineSitesFilters />
                  </MediaQuery>

                  <div className="map-container">
                    <Map
                      paths={paths}
                      markers={markers}
                      setCountryColor={MineSite.setCountryColor}
                      legend={MAP_LEGEND}
                      onClickGeography={this.handleClickGeography}
                      center={this.state.center !== null ? this.state.center : undefined}
                      zoom={this.state.zoom !== null ? this.state.zoom : undefined}
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

export default MineSite;
