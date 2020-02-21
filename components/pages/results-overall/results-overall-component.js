import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';

// components
import Select from 'components/common/select';
import OverallGraph from './overall-graphs';

class ResultsOverall extends PureComponent {
  static propTypes = { issueAreas: PropTypes.array.isRequired }

  handleAreaSelection = ({ query }) => {
    const { route, params } = query;
    Router.pushRoute(route, params);
  }

  render() {
    const { issueAreas } = this.props;
    return (
      <div className="c-results-overall-page">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6">
                <h2 className="title">Results</h2>
                <Select
                  onChange={this.handleAreaSelection}
                  options={issueAreas}
                  placeholder="Overall"
                />
              </div>
              <div className="col-xs-12 col-sm-8 col-md-6">
                <p className="thematic-description">
                  Relative results among the 38 companies vary greatly across the six different thematic areas, with 13 of the companies showing one of the five strongest results in at least one thematic area. While absolute results are considerably below that of society expectations of large-scale mining companies, individual examples of leading practices are found among a wide range of companies.
                  For the 29 companies previously assessed in the RMI Report 2018, a small improvement is seen in many company results, reflecting new or strengthened policies or practices and, in some cases, stronger disclosure on certain issues.
                  Nonetheless, there is still much progress to be made before the companies meet society expectations, as can be seen from the large vertical spaces above the company results in the thematic area charts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <section className="section -dark">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12">
                  <OverallGraph />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ResultsOverall;
