import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import StackedBars from 'components/charts/stacked-bars-chart';

// constants
import { BARS } from './overall-chart-constants';

class OverallChart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { data, config } = this.props;
    const { bestPracticeScore, previousBestPracticeScore } = data;

    const referenceLines = [
      {
        'label': 'Collective Best Score (2020)',
        'value': bestPracticeScore,
        'strokeReferenceLine': '#c4122c'
      }, {
        'label': 'Collective Best Score (2018)',
        'value': previousBestPracticeScore,
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
    const { bestPracticeScore, previousBestPracticeScore } = nextData;

    const referenceLines = [
      {
        'label': 'Collective Best Score (2020)',
        'value': bestPracticeScore,
      }, {
        'label': 'Collective Best Score (2018)',
        'value': previousBestPracticeScore / 2
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
        <StackedBars
          data={scores}
          config={this.chartConfig}
          bars={BARS}
        />
      </div>
    );
  }
}

export default OverallChart;
