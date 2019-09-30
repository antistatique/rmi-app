import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Bars from 'components/charts/barschart';

// constants
import { CHART_CONFIG, OVERALL_CHARTS_TITLES } from './companies-detail-overall-measurements-constants';

// styles
import styles from './companies-detail-overall-measurements-styles.scss';

class CompaniesDetailOverallMeasurements extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    printable: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    const { printable } = this.props;

    this.chartConfig = {
      ...CHART_CONFIG,
      ...printable && { width: 225 }
    };
  }

  render() {
    const { data, printable } = this.props;

    const columnClass = classnames({
      'col-xs-4': printable,
      'col-xs-12': !printable,
      'col-md-4': !printable
    });

    return (
      <div className="c-companies-detail-overall-measurements">
        <style jsx>{styles}</style>
        <div className="charts-container">
          <div className="row">
            {data.map(d => (
              <div key={d.id} className={columnClass}>
                <div className="chart-legend">
                  <h2 className="title">
                    {OVERALL_CHARTS_TITLES[d.name].title}<br/>
                    <span className="">{OVERALL_CHARTS_TITLES[d.name].subtitle}</span>
                  </h2>
                </div>
                <Bars
                  config={this.chartConfig}
                  data={d.children}
                  customTooltip
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CompaniesDetailOverallMeasurements;
