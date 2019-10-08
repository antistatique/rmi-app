import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

import Alert from 'components/common/alert';

class MineSitesDetailSidebar extends PureComponent {
  static propTypes = {
    mineSite: PropTypes.object.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }

  render() {
    const { currentLanguage, mineSite } = this.props;
    const {
      id,
      aliases,
      miningType,
      products,
      openingYear,
      acquisitionYear,
      companies,
      extraLanguages,
      companyShare,
      fatalityReports
    } = mineSite;

    return (
      <div className="c-detail-sidebar">
        {extraLanguages.length !== 0 &&
          <div className="row">
            <div className="col-xs-12">
              <Alert variant="info">
                This page is available in&nbsp;
                { extraLanguages.map((extraLanguage, index) => (
                  <span>
                    <Link
                      route="mine-sites"
                      params={{
                        language: extraLanguage['web-code'],
                        mineSite: id
                      }}
                    >
                      <a>{extraLanguage.name} {extraLanguages.length - 1 === index ? '' : '&'} </a>
                    </Link>
                  </span>
                ))}
              </Alert>
            </div>
          </div>
        }
        <div className="definitions-container">
          {/* TODO: Company's share: */}
          <div className="row">
            <div className="col-xs-12">
              <div className="definition-item">
                <div className="definition-key">Company's share:</div>
                { companies.map(company => (
                  <div key={company.id} className="definition-value">
                    <Link
                      route="company"
                      params={{
                      language: currentLanguage,
                      company: company.id
                    }}
                    >
                      <a>{company.name || '-'} : {companyShare}</a>
                    </Link>
                  </div>
                )) }
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Fatalities (company-reported):</div>
                <ul className="definition-sublist">
                  {fatalityReports.map(fatalityReport => (
                    <li key={fatalityReport.id} className="definition-sublist-item">
                      <span>{fatalityReport.year} | </span>
                      <div className="definition-sublist-item-container">
                        <span>Employees : {fatalityReport.employees}</span>
                        <span>Workers : {fatalityReport.workers}</span>
                        <span>Contractors : {fatalityReport.contractors}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Products:</div>
                <div className="definition-value">{products || '-'}</div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Mining Type/s:</div>
                <div className="definition-value">{miningType || '-'}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Opening Year:</div>
                <div className="definition-value">{openingYear || '-'}</div>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Acquisition Year:</div>
                <div className="definition-value">{acquisitionYear || '-'}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <div className="definition-item">
                <div className="definition-key">Aliases:</div>
                <div className="definition-value">{aliases || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MineSitesDetailSidebar;
