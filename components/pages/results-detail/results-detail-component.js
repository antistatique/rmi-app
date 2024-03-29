import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';

// components
import Select from 'components/common/select';
import Summary from 'components/common/summary';
import Spinner from 'components/common/spinner';
import IssueAreasBar from 'components/common/issue-areas-bar';
import Accordion from './accordion';
import OverallChart from './overall-chart';
import MeasurementCharts from './measurement-charts';
import Slider from './slider';

// styles
import styles from './results-detail-styles.scss';

class ResultsDetail extends PureComponent {
  static propTypes = {
    selectedArea: PropTypes.object.isRequired,
    issueAreas: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    responsive: PropTypes.object.isRequired
  }

  handleAreaSelection = ({ query }) => {
    const { route, params } = query || this.props.issueAreas[0].query;
    Router.pushRoute(route, params);
  }

  handleArea = areaId => Router.pushRoute('results-detail', {
    language: this.props.currentLanguage,
    id: areaId
  })

  render() {
    const { issueAreas, selectedArea, responsive } = this.props;
    const { observation, slug, id, summary } = selectedArea || {};
    const { phone } = responsive;

    return (
      <div className="c-results-detail-page">
        <style jsx>{styles}</style>
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <h2 className="title">Results</h2>
                <Select
                  onChange={this.handleAreaSelection}
                  options={issueAreas}
                  placeholder="Select an issue area"
                  selectedValue={slug}
                  className="-underline"
                />
              </div>
              <div className="col-xs-12 col-sm-8 col-md-offset-2 col-md-6">
                {observation &&
                  <div
                    className="thematic-description"
                    dangerouslySetInnerHTML={{ __html: observation }}
                  />}
              </div>
            </div>
          </div>
        </div>

        <div id="indicator-by-indicator-results" className="page-content">
          <section className="section -dark">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12 col-md-1">
                  <IssueAreasBar
                    selectedIssueArea={id}
                    setIssueArea={this.handleArea}
                  />
                </div>
                {!Object.keys(selectedArea).length && <Spinner />}
                {!!Object.keys(selectedArea).length &&
                  <div className="col-xs-12 col-md-11">
                    <OverallChart />
                    {phone ? <Slider /> : <MeasurementCharts />}
                    {summary &&
                      <Summary
                        title="Summary of results"
                        content={summary}
                        theme="dark"
                      />}
                    <Accordion />
                  </div>}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ResultsDetail;
