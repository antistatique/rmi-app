import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
    const { name, listings } = company;
    const parsedListings = (listings || '').split(' - ')
      .map(list => list.split(':'));

    const styleLink = {display: "inline-block", padding: "0.5em 1em 0.5em 0", fontSize: "0.9em"};

    return (
      <div className="c-companies-detail-header">
        <style jsx>{styles}</style>
        <div className="l-layout main-section-container">
          <div className="print-logo">
            <h2 className="print-page-title">Company report</h2>
            <img className="logo-img" src="/static/logos/RMIndex_vector.svg" alt="RMI logo" />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-5 col-md-6">
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
            <div className="col-xs-12 col-sm-7 col-md-6">
              <div className="right-side">
                <div className="company-listing">
                  {parsedListings.map((list, index) => (
                    <div key={`${list[0]}-${index + 1}`} className="company-listing-item">
                      <span className="company-listing-item-key">{list[0]}:</span>
                      <span className="company-listing-item-value">{list[1]}</span>
                    </div>
                  ))}
                </div>

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
        <div className="anchor-navigation-container">
          <div className="l-layout">
            <div className="row">
              <div className="col-md-12">
                <ul className="anchor-navigation">
                  <li><AnchorLink offset="100" style={styleLink} href="#contextual-data">Contextual Data</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#overall-results">Overall Results</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#indicator-by-indicator-results">Indicator-by-indicator Results</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#mine-site-selection">Mine-site selection</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#list-of-all-mine-sites">List of all mine sites</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#shareholders-and-subsidiaries">Shareholders and Subsidiaries</AnchorLink></li>
                  <li><AnchorLink offset="100" style={styleLink} href="#tax-jurisdictions">Tax jurisdictions</AnchorLink></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompaniesDetailHeader;
