

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import moment from 'moment';

// components
import Spinner from 'components/common/spinner';
import ResearchInsightDetail from './research-insight-detail';
import styles from './research-insights-list-styles.scss';


class ResearchInsightsListPage extends PureComponent {
  static propTypes = {
    researchInsights: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    researchInsightId: PropTypes.string.isRequired
  };

  static parseDate(date) {
    return moment(date).format('DD/MM/YY');
  }

  render() {
    const { researchInsights, currentLanguage, researchInsightId } = this.props;


    return (
      <div className="c-news-list-page">
          { researchInsightId ? (
            <ResearchInsightDetail />
          ) : (

            <div>
              <style jsx>{styles}</style>
              <div className="page-intro">
                <div className="l-layout">
                  <div className="row">
                    <div className="col-xs-12">
                      <h2 className="title">Research Insights</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section -white">
                <div className="l-layout">
                  <div className="c-news-list-container">
                    <div className="row end-sm">
                      <div className="col-xs-12 col-sm-12">
                        <div className="news-list-card-list">
                          <div className="row -equal-height">
                            {researchInsights.map(researchInsight => (
                              <div className="col-md-12" key={researchInsight.id}>
                                <div
                                  className="news-card-item">
                                  <Link
                                    route="research-insights"
                                    params={{ language: currentLanguage, id: researchInsight.id }}
                                  >
                                    <a>
                                      <p>
                                        <span className="date">
                                          {ResearchInsightsListPage.parseDate(researchInsight['publication-date'])}
                                      </span> {researchInsight.title}</p>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
          )}
      </div>
    );
  }
}

export default ResearchInsightsListPage;
