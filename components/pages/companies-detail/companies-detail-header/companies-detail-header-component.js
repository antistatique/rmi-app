import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import Scrollspy from 'components/common/scroll-spy';

// components
import Icon from 'components/common/icon';

// styles
import styles from './companies-detail-header-styles.scss';

class CompaniesDetailHeader extends PureComponent {
  static propTypes = {
    company: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    togglePrintable: PropTypes.func.isRequired
  }

  handlePrint = () => { this.props.togglePrintable(true); };

  render() {
    const { company, currentLanguage } = this.props;
    const { id, name, 'extra-languages': extraLanguages } = company;

    return (
      <div className="c-companies-detail-header">
        <style jsx>{styles}</style>
        <div className="l-layout main-section-container">
          <div className="print-logo">
            <h2 className="print-page-title">Company report</h2>
            <img className="logo-img" src="/static/logos/RMIndex_vector.svg" alt="RMI logo" />
          </div>
          <div className="row">
            <div className="col-xs-8 col-sm-5 col-md-6">
              <div className="left-side">
                <Link
                  route="companies"
                  params={{ language: currentLanguage }}
                >
                  <a className="go-back-link">
                    <Icon
                      name="large-arrow"
                      className="-large-arrow"
                    />
                    {name}
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xs-4 col-sm-7 col-md-6">
              <div className="right-side">
                { extraLanguages.length !== 0 &&
                  <div className="extra-languages">
                    This page is available in&nbsp;
                    { extraLanguages.map((extraLanguage, index) => (
                      <span key={index}>
                        <Link
                          route="company"
                          params={{
                            language: extraLanguage['web-code'],
                            company: id
                          }}
                        >
                          <a style={{ fontStyle: 'italic' }}>{extraLanguage.name} {extraLanguages.length - 1 === index ? '' : '&'} </a>
                        </Link>
                      </span>
                    ))}
                  </div>
                }
                <div className="pdf-print">
                  <button
                    className="print-btn"
                    onClick={this.handlePrint}
                  >
                    <Icon
                      name="download"
                      className="-big -download -reverse"
                    />
                    Print Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="anchor-navigation-container d-none d-md-block">
          <div className="l-layout">
            <div className="row scroll-container">
              <div className="col-xs-12">
                <Scrollspy items={[
                    {
                      'anchor': 'summary',
                      'label': 'Summary',
                    },
                    {
                      'anchor': 'overall-results',
                      'label': 'Overall Results',
                    },
                    {
                      'anchor': 'detailed-results',
                      'label': 'Results per indicator',
                    },
                    {
                      'anchor': 'mine-site-results',
                      'label': 'Mine-site Results',
                    },
                    {
                      'anchor': 'operational-mine-sites',
                      'label': 'Operational mine sites',
                    },
                    {
                      'anchor': 'known-closed-mine-sites',
                      'label': 'Closed mine sites (known)',
                    },
                    {
                      'anchor': 'tailings',
                      'label': 'Tailings (known)',
                    },
                    {
                      'anchor': 'known-shareholders',
                      'label': 'Shareholders (known)',
                    },
                    {
                      'anchor': 'known-subsidiaries',
                      'label': 'Subsidiaries (known)',
                    },
                    {
                      'anchor': 'known-beneficial-owners',
                      'label': 'Beneficial Owners (known)',
                    },
                    {
                      'anchor': 'known-tax-jurisdictions',
                      'label': 'Tax Jurisdictions (known)',
                    },
                    {
                      'anchor': 'investorstate-investment-disputes',
                      'label': 'Investor / State Disputes',
                    }
                  ]}
                  currentClassName="active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompaniesDetailHeader;
