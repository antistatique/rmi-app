import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import StackedBars from 'components/charts/stacked-bars-chart';
import Icon from 'components/common/icon';
import { Link } from 'routes';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';
import { BARS } from './overall-graphs-constants';

// styles
import styles from './overall-graphs-styles.scss';

class OverallGraphs extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    chartConfig: PropTypes.object.isRequired
  }

  render() {
    const { data, currentLanguage, chartConfig } = this.props;
    const { scores, label, id } = data;

    return (
      <div className="graph-item">
        <style jsx>{styles}</style>
        <div className="graph-item-container">
          <StackedBars
            config={chartConfig}
            data={scores}
            bars={BARS}
          />
          <div className="chart-legend">
            <div
              className="icon-background"
              style={{ background: AREA_ISSUE_COLOURS[id] }}
            >
              <Link to="results-thematic" params={{ language: currentLanguage, id }}>
                <Icon
                  name={id}
                  className="-x-big"
                />
              </Link>
            </div>
            <Link to="results-thematic" params={{ language: currentLanguage, id }}><a title="Click here" className="title">{label} →</a></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default OverallGraphs;
