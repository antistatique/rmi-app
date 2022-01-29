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
                  Besides company-wide indicators, 250 individual mine sites are assessed
                  against 15 basic site-level indicators related to stakeholder engagement and disaggregated data sharing.
                  It is possible to filter by company, using the names on the left-hand side, and also to select a specific mine site,
                  using the field below or directly on the map.
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
                  <MediaQuery
                    maxDeviceWidth={breakpoints.md - 1}
                    values={{ deviceWidth: responsive.fakeWidth }}
                  >
                    <MineSitesFilters />
                  </MediaQuery>
                  <h4 className="title text-white mb-3">List of all companies</h4>
                  <CompaniesList
                    isCompanyPage={false}
                    onOpenTooltip={this.handleOpenTooltip}
                    onCloseTooltip={this.handleCloseTooltip}
                  />
                </div>
                <div className="col-xs-12 col-md-8">
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
