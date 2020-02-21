import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import StackedBars from 'components/charts/stacked-bars-chart';

// constants
import { BARS } from './overall-chart-constants';

// styles
import styles from './overall-chart-styles.scss';

class OverallChart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { data, config } = this.props;
    const { bestPracticeScore, averageScore } = data;

    const referenceLines = [
      {
        'label': 'Collective Best Score',
        'strokeLabel': '#c4122c',
        'value': bestPracticeScore,
        'strokeReferenceLine': '#c4122c'
      },
      {
        'label': 'Average Score',
        'strokeLabel': '#9c9d9e',
        'value': averageScore,
        'strokeReferenceLine': '#9c9d9e'
      }
    ];

    this.chartConfig = {
      ...config,
      yReferenceLines: referenceLines
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: nextData,
      config: nextConfig
    } = nextProps;
    const { bestPracticeScore, averageScore } = nextData;

    const referenceLines = [
      {
        'label': 'Collective Best Score',
        'strokeLabel': '#c4122c',
        'value': bestPracticeScore,
        'strokeReferenceLine': '#c4122c'
      },
      {
        'label': 'Average Score',
        'strokeLabel': '#9c9d9e',
        'value': averageScore,
        'strokeReferenceLine': '#9c9d9e'
      }
    ];

    this.chartConfig = {
      ...this.chartConfig,
      ...nextConfig,
      yReferenceLines: referenceLines
    };
  }

  render() {
    const { data } = this.props;
    const { scores } = data;

    return (
      <div className="c-overall-chart">
        <style jsx>{styles}</style>
        <StackedBars
          data={scores}
          config={this.chartConfig}
          bars={BARS}
        />
        <p><span className="aggregation-line collective" />Average of the best scores achieved collectively by all companies for each one of the indicators under the thematic area</p>
        <p><span className="aggregation-line average" />Average of the scores achieved by each one of the companies under this thematic area</p>
      </div>
    );
  }
}

export default OverallChart;
