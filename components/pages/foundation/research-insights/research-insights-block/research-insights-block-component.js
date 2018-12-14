import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'routes';


// styles
import styles from './research-insights-block-styles.scss';

// constants
const RESEARCH_INSIGHTS_PER_BLOCK = 5;

class ResearchInsightsBlock extends PureComponent {
  static propTypes = {
    researchInsights: PropTypes.array,
    setResourceId: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired

  }

  static defaultProps = { researchInsights: [] }

  static parseDate(date) {
    return moment(date).format('DD/MM/YY');
  }

  handleClick(id) {
    this.props.setResourceId(id);
    this.props.toggleModal(true);
  }



  render() {

    const researchInsights = this.props.researchInsights;
    const currentLanguage = this.props.currentLanguage;

    let sortedRS = researchInsights.sort((a, b) => new Date(a['publication-date'].split('/').reverse()) - new Date(b['publication-date'].split('/').reverse()));
    sortedRS = sortedRS.reverse().slice(0, RESEARCH_INSIGHTS_PER_BLOCK);
    return (
      <div>
        <style>{styles}</style>
        <div className="card card-cascade wider">
          <div className="view view-cascade gradient-card-header grey-gradient">
            <h2 className="card-header-title mb-3">Research Insights</h2>
          </div>
          <div className="card-body card-body-cascade text-center">

            <ul>
              {sortedRS.map(research_insight => (

                  <li className="newsListItem" >
                    <Link
                      route="research-insights"
                      params={{ language: currentLanguage, id: research_insight.id }}
                    >
                    <a>
                      <span className="date">{ResearchInsightsBlock.parseDate(research_insight['publication-date'])}</span>
                      {research_insight.title}
                    </a>
                    </Link>
                  </li>
              ))}
            </ul>
            <Link
              route="research-insights"
              params={{ language: currentLanguage }}
            >
              <a className="brown-text d-flex flex-row-reverse p-2">
                <h5 className="waves-effect waves-light">Read all research insights <i className="fa fa-angle-double-right ml-2"></i></h5>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }



}

export default ResearchInsightsBlock;
