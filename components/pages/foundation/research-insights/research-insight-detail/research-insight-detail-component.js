import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';
import Icon from 'components/common/icon';
import moment from 'moment';

import styles from './research-insight-detail-styles.scss';


class ResearchInsightDetail extends PureComponent {

  static propTypes = {
    researchInsight: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  static parseDate(date) {
    return moment(date).format('DD/MM/YY');
  }


  render() {
    const researchInsight = this.props.researchInsight;
    const currentLanguage = this.props.currentLanguage;
    return (
      <div>
        <style jsx>{styles}</style>
        <div className="page-intro back-section">
          <div className="l-layout">
            <div className="row">
              <div className="left-side">
              <Link
                route="research-insights"
                params={{ language: currentLanguage}}
              >
                  <a className="go-back-link">
                    <Icon
                      name="large-arrow"
                      className="-large-arrow"
                    />
                    <h4>Go to Research Insights list</h4>
                  </a>
              </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content media-list">
          <section className="section -gray">
            <div className="l-layout">
              <div className="c-modal-content">
                <h3 className="title">{researchInsight.title}</h3>
                <h3 className="subtitle">{ResearchInsightDetail.parseDate(researchInsight['publication-date'])}</h3>
                <div dangerouslySetInnerHTML={{ __html: researchInsight.text }}></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ResearchInsightDetail;
