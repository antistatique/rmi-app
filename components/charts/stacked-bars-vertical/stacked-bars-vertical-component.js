import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Tooltip from 'rc-tooltip';
import Icon from 'components/common/icon';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';

// styles
import styles from './stacked-bars-vertical-styles.scss';

/**
 * Data scale received from the backend.
 */
const dataScale = 6;

class StackedBarsVertical extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    isPrevYearVisible: PropTypes.bool.isRequired
  };

  getBarAttributes(bar, index) {
    const { colors } = this.props;
    const { value } = bar;

    return {
      height: `${(value * 100) / dataScale}%`,
      backgroundColor: colors[index]
    };
  }

  render() {
    const { data, isPrevYearVisible, className, ...restProps } = this.props;
    let currentTotalScore = 0;
    let previousTotalScore = 0;

    data[0].children.forEach((child) => { currentTotalScore += child.value; });
    data[1].children.forEach((child) => { previousTotalScore += child.value; });

    return (
      <div {...restProps}>
        <div className={`c-stacked-bars-vertical ${ className }`}>
          <style jsx>{styles}</style>

          <div className="stacked-bars-vertical-container">
            <div className="bar-wrapper mr-1">
              <div className="score">
                <div className="text-size-big">2020</div>
                <span className="current-score">{currentTotalScore.toFixed(2)}<span className="total-score">/{ dataScale.toFixed(2) }</span></span>
              </div>
              <div className="bar">
                <Tooltip
                  placement="bottom"
                  trigger={['hover']}
                  overlay={<span>collective best score (2020)</span>}
                  mouseLeaveDelay={0}
                >
                  {/* @todo use real data to position the bar. */}
                  <div className="bar-avg" style={{bottom: `${(data[0].collectiveBestScore.value * 100) / dataScale}%`}}></div>
                </Tooltip>

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
            </div>
            <div className={`bar-wrapper bar-wrapper-alt ${ !isPrevYearVisible ? 'bar-wrapper-hidden' : ''}`}>
              <div className="score">
                <div className="text-size-big">2018</div>
                <span className="current-score">{previousTotalScore.toFixed(2)}<span
                  className="total-score">/{ dataScale.toFixed(2) }</span></span>
              </div>
              <div className="bar">

                <Tooltip
                  placement="bottom"
                  trigger={['hover']}
                  overlay={<span>collective best score (2018)</span>}
                  mouseLeaveDelay={0}
                >
                  {/* @todo use real data to position the bar. */}
                  <div className="bar-avg" style={{bottom: `${(data[1].collectiveBestScore.value * 100) / dataScale}%`}}></div>
                </Tooltip>

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
            </div>
          </div>

          <div
            className="bar-icon"
          >
            <Icon
              name={data[0].indicatorId.toString()}
              className="-x-big"
              style={{ background: `${AREA_ISSUE_COLOURS[data[0].indicatorId]} !important`, padding: '5px' }}
            />
          </div>
          <div className="bar-header mt-2">
            <h3 className="bar-title">{data[0].name}</h3>
          </div>

        </div>
      </div>
    );
  }
}

export default StackedBarsVertical;
