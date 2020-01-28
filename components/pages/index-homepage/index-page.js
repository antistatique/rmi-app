import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// styles
import styles from './index-page-styles.scss';

class IndexPage extends PureComponent {
  static propTypes = { currentLanguage: PropTypes.string.isRequired }

  // TO-DO
  handleDownloadSummary = () => {}

  render() {
    const { currentLanguage } = this.props;
    return (
      <div className="c-index-page">
        <style jsx>{styles}</style>
        <div className="l-layout pb-3">
          {/* splash */}
          <div className="hero-container mb-5">
            <div className="image-container">
              <img
                className="hero-cover"
                srcSet="/static/images/homepage_background.jpg 1x,
                        /static/images/homepage_background@2x.jpg 2x"
                src="/static/images/homepage_background.jpg"
                alt=""
              />
              <p className="hero-credits">
                Photograph: Dean Hutton/Bloomberg/Getty Images
              </p>
            </div>
            <div className="title-container">
              <h1 className="title">RMI Report 2020</h1>
              <p className="subtitle">An evidence-based assessment of mining company policies
                and practices on economic, environmental, social and governance issues.
              </p>
            </div>
            <div className="quick-access">
              <div className="title">Quick access</div>
              <ul className="links-items">
                <li className="link-item">
                  <Link
                    route="companies"
                    params={{ language: currentLanguage }}
                  >
                    <a><span className="arrow">⟶</span> Company Results</a>
                  </Link>
                </li>
                <li className="link-item">
                  <Link
                    route="mine-sites"
                    params={{ language: currentLanguage }}
                  >
                    <a><span className="arrow">⟶</span> Mine-site Results</a>
                  </Link>
                </li>

                <li className="link-item">
                  <Link
                    route="maps-and-tables"
                    params={{ language: currentLanguage }}
                  >
                    <a><span className="arrow">⟶</span> Maps & Tables</a>
                  </Link>
                </li>
                <li className="link-item">
                  <Link
                    route="leading-practices"
                    params={{ language: currentLanguage }}
                  >
                    <a><span className="arrow">⟶</span> Leading Practices</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <section className="section bordered-section mb-5">
            <h2 className="bordered-section-title">Overall Company Results</h2>
            <p>Industry network arrive model. Action reason little pick want throw season. Body other statement doctor worry worry. Divers haut fixer loi sang ordre rapporter. Oublier secret joue image guère visite paupière. Personnage clef branche un faveur.</p>
          </section>

          <section className="section bordered-section mb-5">
            <h2 className="bordered-section-title">Company Reports</h2>
            <p>Industry network arrive model. Action reason little pick want throw season. Body other statement doctor worry worry.</p>
          </section>
        </div>
      </div>
    );
  }
}

export default IndexPage;
