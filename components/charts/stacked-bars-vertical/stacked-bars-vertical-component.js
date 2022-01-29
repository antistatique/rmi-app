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
const dataScale = 100;

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

    if (data[0].children !== undefined) {
      data[0].children.forEach((child) => { currentTotalScore += child.value; });
    }
    if (data[1] !== undefined) data[1].children.forEach((child) => { previousTotalScore += child.value; });

    return (
      <div {...restProps}>
        <div className={`c-stacked-bars-vertical ${className}`}>
          <style jsx>{styles}</style>

          <div className="stacked-bars-vertical-container">
            {data[0].children !== undefined &&
              <div className="bar-wrapper mr-1">
                <div className="score">
                  <div>2022</div>
                  <div className="current-score text-size-big">{currentTotalScore.toFixed(0)}</div>
                  <span className="total-score">%</span>
                </div>
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
              </div>
            }
            {/* display mine-site results bar */}
            {data[0].children === undefined &&
              <div className="bar-wrapper mr-1">
                <div className="score">
                  <div>2022</div>
                  <div className="current-score text-size-big">{data[0]}</div>
                  <span className="total-score">%</span>
                </div>
                <div className="bar">
                  <Tooltip
                    key={data[0]}
                    placement="bottom"
                    trigger={['hover']}
                    overlay={<span>Average of mine-site scores</span>}
                    mouseLeaveDelay={0}
                  >
                    <div
                      className="bar-node"
                      style={{ height: `${data[0]}%`, backgroundColor: '#4e504f' }}
                    />
                  </Tooltip>
                </div>
              </div>
            }
            {data[1] !== undefined &&
              <div className={`bar-wrapper bar-wrapper-alt ${!isPrevYearVisible ? 'bar-wrapper-hidden' : ''}`}>
                <div className="score">
                  <div>2020</div>
                  <div className="current-score text-size-big">{previousTotalScore.toFixed(0)}</div>
                  <span className="total-score">%</span>
                </div>
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
              </div>
            }
          </div>
          <div
            className="bar-icon"
            style={{ backgroundColor: data[0].children !== undefined ? AREA_ISSUE_COLOURS[data[0].indicatorId] : '#4e504f' }}
          >
            <Icon
              name={data[0].children !== undefined ? data[0].indicatorId.toString() : 'mine-site-results'}
              className="-x-big"
              style={{ padding: '5px' }}
            />
          </div>
          <div className="bar-header mt-2">
            {data[0].children !== undefined &&
              <h3 className="bar-title">{data[0].name}</h3>
            }
            {/* display mine-site results label */}
            {data[0].children === undefined &&
              <h3 className="bar-title">Average Mine-Site Score</h3>
            }
          </div>

        </div>
      </div>
    );
  }
}

export default StackedBarsVertical;
