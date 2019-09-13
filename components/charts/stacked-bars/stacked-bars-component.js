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
    data: PropTypes.object.isRequired,
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
    const { name, indicatorId, children } = data;
    let totalScore = 0;

    children.forEach((child) => { totalScore += child.value; });

    return (
      <div>
        <div className={`c-stacked-bars ${ this.props.className }`}>
          <style jsx>{styles}</style>

          <div
            className="bar-icon"
          >
            <Icon
              name={indicatorId.toString()}
              className="-x-big"
              style={{ background: `${AREA_ISSUE_COLOURS[indicatorId]} !important`, padding: '5px' }}
            />
          </div>

          <div className="header-container">
            <div className="bar-header">
              <h3 className="bar-title">{name}</h3>
            </div>
            <div className="stacked-bars-container">
              <div className="bar-wrapper">
                <div className="bar">
                  {(children).map((bar, index) => (
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
                  <span className="current-score">{totalScore.toFixed(3)} <span className="total-score"> / { dataScale.toFixed(3) }</span></span>
                  <span className="ml-2">2020</span>
                </div>
              </div>
              <div className={`bar-wrapper bar-wrapper-alt ${ !isPrevYearVisible ? 'bar-wrapper-hidden' : ''}`}>
                <div className="bar">
                  {(children).map((bar, index) => (
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
                  <span className="current-score">{totalScore.toFixed(3)} <span
                    className="total-score"> / { dataScale.toFixed(3) }</span></span>
                  <span className="ml-2">2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBars;
