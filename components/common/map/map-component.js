import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers } from 'react-simple-maps';
import { PatternLines } from '@vx/pattern';
import tooltip from 'wsdm-tooltip';

// components
import Icon from 'components/common/icon';
import Legend from './legend';

// helpers
import { createMarker } from './map-helpers';

// constants
import { MAP_DEFAULT_OPTIONS } from './map-constants';

// styles
import styles from './map-styles.scss';

class Map extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    markers: PropTypes.array,
    setCountryColor: PropTypes.func.isRequired,
    legend: PropTypes.array.isRequired,
    responsive: PropTypes.object.isRequired,
    onClickGeography: PropTypes.func,
    zoom: PropTypes.number,
    center: PropTypes.array,
    setSelectedCountry: PropTypes.func.isRequired,
    markerType: PropTypes.string
  }

  static defaultProps = {
    markers: [],
    onClickGeography: () => {},
    zoom: 1,
    center: [40, 0],
    markerType: 'mineSites'
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.tip = tooltip();
    this.tip.create();
  }

  componentWillUnmount() { this.tip.hide(); }

  handleOnClickGeography(...args) {
    this.setState({
      zoom: null,
      center: null
    });
    return this.props.onClickGeography(...args, ComposableMap.defaultProps);
  }

  handleOnClickMarker = (coordinates, mineSiteId, language) => {
    if (this.state.zoom === MAP_DEFAULT_OPTIONS.maxZoom) {
      Router.pushRoute('mine-sites', {
        mineSite: mineSiteId,
        language
      });
    }
    this.setState({
      zoom: MAP_DEFAULT_OPTIONS.maxZoom,
      center: coordinates
    });
  }

  handleMove = (geography, evt) => {
    const x = evt.clientX;
    const y = evt.clientY + window.pageYOffset;

    const { isClickable, isProducing } = geography.properties;

    if (!isClickable && !isProducing) return;

    this.props.setSelectedCountry(geography.properties.countryId);
    this.tip.show(`<div>${geography.properties.NAME}</div>`);
    this.tip.position({ pageX: x, pageY: y });
  }

  handleMoveMarker = (marker, evt) => {
    if (this.state.zoom && this.state.zoom === MAP_DEFAULT_OPTIONS.maxZoom) {
      const x = evt.clientX;
      const y = evt.clientY + window.pageYOffset;

      const markerStyles = 'text-align:center;font-size:18px;';

      this.tip.show(`<div style=${markerStyles}>
        ${marker.name}
        <p className="country-name">[${marker.country}]</p>
      </div>`);
      this.tip.position({ pageX: x, pageY: y });
    }
  }

  handleLeave = () => {
    this.tip.hide();
    this.props.setSelectedCountry(null);
  }

  handleZoomIn = () => { this.setState({ zoom: this.state.zoom ? this.state.zoom + 1 : 2 }); }

  handleResetZoom = () => {
    const { zoom, center } = MAP_DEFAULT_OPTIONS;
    this.setState({
      zoom,
      center
    });
  }

  handleZoomOut = () => { this.setState({ zoom: this.state.zoom ? this.state.zoom - 1 : 1 }); }

  renderMarkers() {
    return this.props.markers.map(marker =>
      createMarker(marker, this.props.markerType, this.handleMoveMarker, this.handleLeave, this.handleOnClickMarker));
  }

  render() {
    const { paths, legend, setCountryColor, responsive } = this.props;
    const { minZoom, maxZoom } = MAP_DEFAULT_OPTIONS;
    const { mobile } = responsive;
    const markers = this.renderMarkers();
    const isZoomInDisabled = this.state.zoom ? false : this.state.zoom > maxZoom;
    const isZoomOutDisabled = this.state.zoom ? this.state.zoom <= minZoom : true;

    return (
      <div className="c-map">
        <style jsx>{styles}</style>
        <div className="zoom-controls">
          <button onClick={this.handleZoomIn} disabled={isZoomInDisabled}>
            <Icon name="zoom-in" className="-small" />
          </button>
          <button onClick={this.handleZoomOut} disabled={isZoomOutDisabled}>
            <Icon name="zoom-out" className="-small" />
          </button>
          <button onClick={this.handleResetZoom}>
            <Icon name="reset" className="-small" />
          </button>
        </div>
        <ComposableMap
          projection="winkel3"
          {...mobile && { height: 250 }}
          defs={
            <PatternLines
              id="lines"
              height={8}
              width={8}
              stroke="#4ec1c2"
              background="#4a5972"
              strokeWidth={2}
              orientation={['diagonal']}
            />
          }
        >
          <ZoomableGroup
            center={this.state.center ? this.state.center : this.props.center}
            zoom={this.state.zoom ? this.state.zoom : this.props.zoom}
          >
            <Geographies geography={paths} disableOptimization>
              {(geographies, projection) => geographies.map(geography => (
                <Geography
                  key={geography.properties.id}
                  geography={geography}
                  projection={projection}
                  onClick={geography.properties.isClickable ? this.handleOnClickGeography.bind(this) : undefined}
                  onMouseMove={this.handleMove}
                  onMouseLeave={this.handleLeave}
                  style={{
                    default: {
                      fill: setCountryColor(geography.properties),
                      stroke: geography.properties.isSelected ? '#f2f2f2' : '#000',
                      strokeWidth: geography.properties.isSelected ? 0.55 : 0.25,
                      outline: 'none',
                      cursor: geography.properties.isClickable ? 'pointer' : 'default'
                    },
                    hover: {
                      fill: setCountryColor(geography.properties),
                      stroke: geography.properties.isClickable ? '#f2f2f2' : '#000',
                      strokeWidth: geography.properties.isClickable ? 0.55 : 0.25,
                      outline: 'none',
                      cursor: geography.properties.isClickable ? 'pointer' : 'default'
                    },
                    pressed: {
                      fill: setCountryColor(geography.properties),
                      stroke: 'inherit',
                      strokeWidth: 0.55,
                      outline: 'none'
                    }
                  }}
                />
              ))}
            </Geographies>
            <Markers>
              {markers}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <div className="legend-container">
          <Legend legendElements={legend} />
        </div>
      </div>
    );
  }
}

export default Map;
