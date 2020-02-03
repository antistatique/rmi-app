import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import CompaniesList from 'components/common/companies-list';
import OverallGraph from '../results-overall/overall-graphs';

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
                © JATAM KALTIM (all rights reserved)
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
                    <a><span className="arrow">⟶</span> Company Reports</a>
                  </Link>
                </li>
                <li className="link-item">
                  <Link
                    route="mine-sites"
                    params={{ language: currentLanguage }}
                  >
                    <a><span className="arrow">⟶</span> Mine-site Reports</a>
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
            <OverallGraph />
          </section>

          <section className="section bordered-section mb-5">
            <h2 className="bordered-section-title">Company Reports</h2>
            <CompaniesList />
          </section>
        </div>
      </div>
    );
  }
}

export default IndexPage;
