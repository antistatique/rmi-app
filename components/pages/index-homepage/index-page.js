import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
// components
import Button from 'components/common/button';

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
        <div className="l-layout">
          {/* splash */}
          <div className="row">
            <div className="splash">
              <h1 className="title">RMI Report 2020</h1>
              <p className="subtitle">An evidence-based assessment of mining company policies
                and practices<br /> on economic, environmental, social and governance issues.
              </p>
            </div>
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
              <li className="link-item">
                <Link
                  route="adverse-impacts"
                  params={{ language: currentLanguage }}
                >
                  <a><span className="arrow">⟶</span> Severe Adverse Impacts</a>
                </Link>
              </li>
            </ul>
          </div>
          <section className="section -dark intro pt-4">
            <div className="l-layout">
              <div className="row between-md">
                <div className="col-xs-12 col-md-5">
                  <div className="text-section">
                    <p>
                      The Responsible Mining Foundation (RMF) shares the position of many
                      organisations and people around the world who support responsible
                      mining but are concerned about the many urgent and compelling matters
                      that impact societies and environments in producing countries.
                    </p>
                    <p>
                      The Responsible Mining Index (RMI) supports the principle that minerals
                      and metals mining should benefit the economies, improve the lives of
                      people and respect the environments of producing countries, while also
                      benefiting mining companies in a fair and viable way.
                    </p>
                    <p>
                      With this in mind, the goal of RMI is to encourage continuous improvement
                      in responsible mining across the industry by transparently assessing the
                      policies and practices of large, geographically dispersed mining companies
                      on a range of economic, environmental, social and governance (EESG) issues,
                      with the emphasis on leading practice and learning.
                    </p>
                    <p>
                      RMI assesses companies from the perspective of what society can reasonably
                      expect of large-scale mining companies, and examines the extent to which
                      companies are addressing a range of EESG issues in a systematic manner across
                      all their mining activities and throughout the project lifecycle.
                    </p>
                    <p>
                      The RMI assessment is based on publicly available information on these companies
                      and mine sites. As an evidence-based assessment, the Index measures the extent
                      to which companies can demonstrate, rather than simply claim, that they have
                      established responsible policies and practices.
                    </p>

                  </div>
                </div>
                <div className="col-xs-12 col-md-5">
                  <div className="text-section">
                    <p>
                      This first Index, RMI 2018, covers 30 companies from 16 home countries,
                      including publicly-listed, state-owned and private companies. These companies
                      operate more than 850 sites in over 40 producing countries, and the assessment
                      covers most mined commodities, excluding oil and gas. The Index focuses largely
                      on company-wide behaviour, while also looking at site-level actions at 127 mine
                      sites, in order to provide a snapshot of information disaggregated to the level
                      of individual mining operations.
                    </p>

                    <img className="mb-4" src="/static/images/analytical_framework.svg" alt="RMI Analytical Framwork" />

                    <p>
                      The intention is that this report will provide learning and inspiration for more companies to
                      follow responsible practice, and encourage the companies in the 2018 Responsible Mining Index
                      to maintain their efforts on continuous improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="splash-credits">
            <div className="l-layout">
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
