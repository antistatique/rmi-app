import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Tooltip from 'rc-tooltip';
import Icon from 'components/common/icon';
import ToggleSwitch from 'components/common/toggle-switch';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';

// styles
import styles from './stacked-bars-styles.scss';

class StackedBars extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    colors: PropTypes.array.isRequired
  }

  state = { showDiff: false };

  getBarAttributes(bar, index) {
    const { colors } = this.props;
    const { value } = bar;

    return {
      width: `${(value * 100) / 1}%`,
      backgroundColor: colors[index]
    };
  }

  handleToggleClick = ({ enabled }) => {
    this.setState({ showDiff: enabled });
  };

  render() {
    const { showDiff } = this.state;

    const { data } = this.props;
    const { name, indicatorId, children } = data;
    let totalScore = 0;

    children.forEach((child) => { totalScore += child.value; });

    return (
      <div>
        <div className="c-stacked-bars">
          <style jsx>{styles}</style>

          <div
            className="bar-icon"
            style={{ background: AREA_ISSUE_COLOURS[indicatorId] }}
          >
            <Icon
              name={indicatorId.toString()}
              className="-x-big"
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
                  <span className="current-score">{totalScore.toFixed(3)} <span className="total-score"> / 1.000</span></span>
                </div>
              </div>
              <div className={`bar-wrapper ${ !showDiff ? 'bar-wrapper-hidden' : ''}`}>
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
                    className="total-score"> / 1.000</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2 mb-4">
          <ToggleSwitch onStateChanged={ this.handleToggleClick }/>
          <span className="ml-2">Compare with 2018 results</span>
        </div>
      </div>
    );
  }
}

export default StackedBars;
