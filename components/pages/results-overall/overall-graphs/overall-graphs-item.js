import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import StackedBars from 'components/charts/stacked-bars-chart';
import Icon from 'components/common/icon';
import { Link } from 'routes';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';
import {
  BAR_CONFIG,
  STACKED_BAR_COLOURS,
  BARS
} from './overall-graphs-constants';

// styles
import styles from './overall-graphs-styles.scss';

class OverallGraphs extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { slug, bestPracticeScore } = this.props.data;
    this.chartConfig = {
      ...BAR_CONFIG,
      setBarFill: ({ dataKey }) => STACKED_BAR_COLOURS[slug][dataKey],
      yReferenceLine: bestPracticeScore
    };
  }

  render() {
    const { data, currentLanguage } = this.props;
    const { scores, label, id } = data;

    return (
      <div className="graph-item">
        <style jsx>{styles}</style>
        <div className="graph-item-container">
          <StackedBars
            config={this.chartConfig}
            data={scores}
            bars={BARS}
          />
          <div className="chart-legend">
            <div
              className="icon-background"
              style={{ background: AREA_ISSUE_COLOURS[id] }}
            >
              <Icon
                name={id}
                className="-x-big"
              />
            </div>
            <Link route="results" params={{ language: currentLanguage, section: 'thematic', id }} className="title"><a>{label}</a></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default OverallGraphs;
