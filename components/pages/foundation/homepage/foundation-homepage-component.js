import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import isEmpty from 'lodash/isEmpty';

// components
import Button from 'components/common/button';
import Modal from 'components/common/modal';
import CustomContent from 'components/common/custom-content';
import ResearchInsightsBlock from 'components/pages/foundation/research-insights/research-insights-block';
import NewsBlock from './news-block';
import ModalContent from './modal-content';

// styles
import styles from './foundation-homepage-styles.scss';

class FoundationHomepagePage extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired,
    news: PropTypes.array.isRequired,
    researchInsights: PropTypes.array.isRequired,
    setResourceId: PropTypes.func.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  closeModal = () => {
    this.props.toggleModal(false);
    this.props.setResourceId(null);
  }

  render() {

    const { content, news, modalOpen, currentLanguage, researchInsights } = this.props;
    const {
      'home-title': homeTitle,
      'home-subtitle': homeSubtitle,
      'society-title': societyTitle,
      'society-summary': societySummary,
      'index-title': indexTitle,
      'index-text': indexText,
      'index-sidenote': indexSidenote,
      'roadmap-title': roadmapTitle,
      'roadmap-text': roadmapText
    } = content;

    const existsRoadMapContent = !isEmpty(roadmapTitle) || !isEmpty(roadmapText);

    return (
      <div className="c-foundation-homepage">
        <style jsx>{styles}</style>
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <blockquote>
                  <h3 className="subtitle">{homeSubtitle}</h3>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">

          <section className="section sectionNews">
            <div className="l-layout row">
              {!!news.length &&

              <div className={"col-xs-12 col-md-" + (!!researchInsights.length ? '4' : '6 col-md-push-2')}>

                      <NewsBlock
                        currentLanguage={currentLanguage}
                      />
                </div>
              }

              {!!researchInsights.length &&
                <div className={"col-xs-12 col-md-" + (!!news.length ? '4' : '6 col-md-push-2')}>
                  <ResearchInsightsBlock currentLanguage={currentLanguage} />

                </div>
              }


                <div className="col-md-4 col-xs-12">
                  <div className="card card-cascade wider">
                    <div className="view view-cascade gradient-card-header red-gradient">
                      <h2 className="card-header-title mb-3">{indexTitle}</h2>
                    </div>
                    <div className="card-body card-body-cascade text-center indexBackground" >
                      <Link
                        route="index"
                        className="red-text d-flex text-center flex-row-reverse p-2"
                        params={{ language: currentLanguage }}
                      >
                        <a>
                          <div className="foundationTitle" dangerouslySetInnerHTML={{ __html: indexSidenote }}></div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </section>


        </div>

      </div>
    );
  }
}

export default FoundationHomepagePage;
