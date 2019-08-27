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
        {/* splash */}
        <div className="splash">
          <div className="l-layout">
            <div className="row center-xs">
              <div className="col-xs-12">
                <h1 className="title">Responsible Mining Index 2020</h1>
              </div>
            </div>
            <div className="row center-xs">
              <div className="col-xs-12 col-md-8">
                <p className="subtitle">An evidence-based assessment of mining company policies
                  and practices<br /> on economic, environmental, social and governance issues.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="download-summary">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <div className="download-button-container">
                  <Link
                    route="static-page"
                    params={{ slug: 'downloads', language: currentLanguage }}
                  >
                    <a
                      className="summary-link"
                    >
                      Download Summary
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="section -dark">
          <div className="l-layout">
            <div className="row between-md">
              <div className="col-xs-6 col-md-4">
                <Link
                  route="results-overall"
                  params={{ language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Overall Company Results</h3>
                    <p>Detailed rankings and all the indicator-level scores in the six thematic areas</p>
                  </a>
                </Link>
              </div>
              <div className="col-xs-6 col-md-4">
                <Link
                  route="static-page"
                  params={{ slug: 'key-findings', language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Findings & Observations</h3>
                    <p>Learnings, achievements, gaps and weaknesses: Insights to encourage continuous improvement</p>
                  </a>
                </Link>
              </div>
              <div className="col-xs-6 col-md-4">
                <Link
                  route="leading-practices"
                  params={{ language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Leading Practices</h3>
                    <p>Practices that are exceptionaly responsive to the challenges and opportunities of responsible mining</p>
                  </a>
                </Link>
              </div>
              <div className="col-xs-6 col-md-4">
                <Link
                  route="companies"
                  params={{ language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Companies</h3>
                    <p>37 individual company result pages and discover their scores and contextual information</p>
                  </a>
                </Link>
              </div>
              <div className="col-xs-6 col-md-4">
                <Link
                  route="mine-sites"
                  params={{ language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Mine Sites</h3>
                    <p>Access the individual scores of 200+ mine sites selected out of the 850+ operatig sites of RMI</p>
                  </a>
                </Link>
              </div>
              <div className="col-xs-6 col-md-4">
                <Link
                  route="library"
                  params={{ language: currentLanguage }}
                >
                  <a className="c-index-card d-block">
                    <img src="https://via.placeholder.com/150x100" />
                    <h3>Extra Resources</h3>
                    <p>Document library, maps, tables, translations, scoring framework, raw data, methodology, more!</p>
                  </a>
                </Link>
              </div>

            </div>
          </div>
        </section>

        <div className="splash-credits">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <span className="credits">Photograph: Dean Hutton/Bloomberg/Getty Images</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
