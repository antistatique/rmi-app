import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'routes';
import Icon from 'components/common/icon';

// utils
import { fixedValue } from 'utils/value-parser';

// styles
import styles from './score-comparison-styles.scss';

class ScoreComparison extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    // phone is the prop to see if the device used is a phone
    phone: PropTypes.bool,
    currentLanguage: PropTypes.string.isRequired
  }

  static getWidth(value) {
    return `${((value * 100) / 6)}%`;
  }

  static defaultProps = { phone: false }

  constructor(props) {
    super(props);
    this.state = { maxScoreDisplay: false };
  }

  handleClickMax = () => {
    this.setState({ maxScoreDisplay: !this.state.maxScoreDisplay });
  }

  render() {
    const { data, config, phone, currentLanguage } = this.props;
    const { avg, min, max, value, companies } = data;
    const { color, hideInnerValue } = config;
    const scoreValueClass = classnames({
      'score-value-string': true,
      'zero-value': value === 0
    });

    return (
      <div className="c-score-comparison">
        <style jsx>{styles}</style>
        <div className={`score-bar ${this.state.maxScoreDisplay ? 'max-opened' : ''}`}>
          <div
            className="score-value"
            style={{
              backgroundColor: color,
              width: `calc(${ScoreComparison.getWidth(value)} + 2px)`
            }}
          >
            {!hideInnerValue &&
              <span className={scoreValueClass}>
                {fixedValue(value)}
              </span>}
          </div>
          <div
            className="score-avg"
            style={{ left: ScoreComparison.getWidth(avg) }}
          >
            <div className="legend">
              <span>Avg</span>
              <span>{fixedValue(avg)}</span>
            </div>
          </div>

          {
            (min !== undefined) && <div
              className="score-min"
              style={{ left: ScoreComparison.getWidth(min) }}
            >
              <div className="legend">
                <span>Min</span>
                <span>{fixedValue(min)}</span>
              </div>
            </div>
          }

          <div
            className="score-max"
            style={{ left: `calc(${ScoreComparison.getWidth(max)} + 1px)` }}
            onClick={this.handleClickMax}
          >
            <div className={`${(!this.state.maxScoreDisplay && !phone) ? 'legend' : 'legend closed'}`}>
              <Icon name="info" />
              <span>Max</span>
              <span>{fixedValue(max)}</span>
            </div>
            <div className={`${(this.state.maxScoreDisplay || phone) ? 'legend-popup opened' : 'legend-popup'}`}>
              <div className="header">
                <span>Max</span>
                <span>{fixedValue(max)}</span>
              </div>
              <div className="content">
                {companies.map(company => (
                  <span key={company.id}>
                    <Link
                      route="company"
                      params={{
                        language: currentLanguage,
                        company: company.id
                      }}
                    >
                      <a>{company.name}</a>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreComparison;
