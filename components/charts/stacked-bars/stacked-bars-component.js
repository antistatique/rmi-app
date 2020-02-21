import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Tooltip from 'rc-tooltip';
import Icon from 'components/common/icon';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';

// styles
import styles from './stacked-bars-styles.scss';

/**
 * Data scale received from the backend.
 */
const dataScale = 6;

class StackedBars extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    isPrevYearVisible: PropTypes.bool.isRequired
  };

  getBarAttributes(bar, index) {
    const { colors } = this.props;
    const { value } = bar;

    return {
      width: `${(value * 100) / dataScale}%`,
      backgroundColor: colors[index]
    };
  }

  render() {
    const { data, isPrevYearVisible } = this.props;
    let currentTotalScore = 0;
    let previousTotalScore = 0;

    data[0].children.forEach((child) => { currentTotalScore += child.value; });
    if (data[1] !== undefined) data[1].children.forEach((child) => { previousTotalScore += child.value; });

    return (
      <div>
        <div className={`c-stacked-bars ${ this.props.className }`}>
          <style jsx>{styles}</style>

          <div
            className="bar-icon"
          >
            <Icon
              name={data[0].indicatorId.toString()}
              className="-x-big"
              style={{ background: `${AREA_ISSUE_COLOURS[data[0].indicatorId]} !important`, padding: '5px' }}
            />
          </div>

          <div className="header-container">
            <div className="bar-header">
              <h3 className="bar-title">{data[0].name}</h3>
            </div>
            <div className="stacked-bars-container">
              <div className="bar-wrapper">
                <div className="bar">
                  {(data[0].children).map((bar, index) => (
                    <Tooltip
                      key={bar.id}
                      placement="bottom"
                      trigger={['hover']}
                      overlay={<span>{bar.name}</span>}
                      mouseLeaveDelay={0}
                    >
                      <div
                        className="bar-node"
                        style={this.getBarAttributes(bar, index)}
                      />
                    </Tooltip>
                  ))}
                </div>
                <div className="score">
                  <span className="current-score">{currentTotalScore.toFixed(2)} <span className="total-score"> / { dataScale.toFixed(2) }</span></span>
                  <span className="ml-2 print-none">2020</span>
                </div>
              </div>
              { data[1] !== undefined &&
                <div className={`bar-wrapper bar-wrapper-alt ${ !isPrevYearVisible ? 'bar-wrapper-hidden' : ''}`}>
                  <div className="bar">
                    {(data[1].children).map((bar, index) => (
                      <Tooltip
                        key={bar.id}
                        placement="bottom"
                        trigger={['hover']}
                        overlay={<span>{bar.name}</span>}
                        mouseLeaveDelay={0}
                      >
                        <div
                          className="bar-node"
                          style={this.getBarAttributes(bar, index)}
                        />
                      </Tooltip>
                    ))}
                  </div>
                  <div className="score">
                    <span className="current-score">{previousTotalScore.toFixed(2)} <span
                      className="total-score"> / { dataScale.toFixed(2) }</span></span>
                    <span className="ml-2">2018</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBars;
