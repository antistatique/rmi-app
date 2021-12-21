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
    currentLanguage: PropTypes.string.isRequired,
    scaleScore: PropTypes.number
  }

  static getWidth(value, scaleScore = 6) {
    return `${((value * 100) / scaleScore)}%`;
  }

  static defaultProps = {
    phone: false,
    scaleScore: 6
  }

  constructor(props) {
    super(props);
    this.state = { maxScoreDisplay: false };
  }

  handleClickMax = () => {
    this.setState({ maxScoreDisplay: !this.state.maxScoreDisplay });
  }

  render() {
    const { data, config, phone, currentLanguage, scaleScore } = this.props;
    const { avg, min, max, value, companies } = data;
    const { color, hideInnerValue } = config;
    const scoreValueClass = classnames({
      'score-value-string': true,
      'zero-value': value === 0
    });

    const barStyles = {
      backgroundColor: color,
      width: `calc(${ScoreComparison.getWidth(value, scaleScore)} + 2px)`
    };

    if (value === null) {
      barStyles.width = '0px';
    }

    return (
      <div className="c-score-comparison">
        <style jsx>{styles}</style>
        <div className={`score-bar ${this.state.maxScoreDisplay ? 'max-opened' : ''}`}>
          <div
            className="score-value"
            style={barStyles}
          >
            {!hideInnerValue &&
              <span className={scoreValueClass}>
                {value !== null ? value.toFixed(1) : 'Exception'}
              </span>}
          </div>
          <div
            className="score-avg"
            style={{ left: ScoreComparison.getWidth(avg, scaleScore) }}
          >
            <div className="legend">
              <span>Avg</span>
              <span>{avg.toFixed(1)}</span>
            </div>
          </div>

          {
            (min !== undefined) && <div
              className="score-min"
              style={{ left: ScoreComparison.getWidth(min, scaleScore) }}
            >
              <div className="legend">
                <span>Min</span>
                <span>{min.toFixed(1)}</span>
              </div>
                                   </div>
          }

          {
            companies === undefined && <div
              className="score-max"
              style={{ left: ScoreComparison.getWidth(max, scaleScore) }}
            >
              <div className="legend">
                <span>Max</span>
                <span>{max.toFixed(1)}</span>
              </div>
                                       </div>
          }

          {
            companies && <div
              className="score-max"
              style={{ left: `calc(${ScoreComparison.getWidth(max, scaleScore)} + 1px)` }}
              onClick={this.handleClickMax}
            >
              <div className={`${(!this.state.maxScoreDisplay && !phone) ? 'legend legend-max' : 'legend legend-max closed'}`}>
                <span>&#9660; Max</span>
                <span>{max.toFixed(1)}</span>
              </div>
              <div className={`${(this.state.maxScoreDisplay || phone) ? 'legend-popup opened' : 'legend-popup'}`}>
                <div className="header">
                  <span>&#9650; Max</span>
                  <span>{max.toFixed(1)}</span>
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
          }
        </div>
      </div>
    );
  }
}

export default ScoreComparison;
