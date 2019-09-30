import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Spinner from 'components/common/spinner';
import Alert from 'components/common/alert';

// styles
import styles from './companies-detail-sidebar-styles.scss';

class CompaniesDetailSidebar extends PureComponent {
  static propTypes = { company: PropTypes.object.isRequired }

  render() {
    const { company } = this.props;
    const {
      id,
      country,
      'secondary-country': secondaryCountry,
      sector,
      'producing-countries': countries,
      'company-country-tax-jurisdictions': taxJurisdictions,
      'government-ownership-country': governmentOwnership,
      'government-ownership-percent': governmentOwnershipPercent,
      'total-revenue-busd': totalRevenueBusd,
      'net-income-busd': NetIncomeBusd,
      'number-workers': workers,
      'number-employees': employees,
      'fatality-reports': fatalityReports,
      'revenues-date': revenuesDate,
      'number-workers-date': workersDate,
      'number-employees-date': employeesDate,
      'extra-languages': extraLanguages,
      'listings': stockExchange,
    } = company;
    const { name: countryName } = country || {};
    const { name: secondaryCountryName } = secondaryCountry || {};

    return (
      <div className="c-detail-sidebar white-sidebar">
        <style jsx>{styles}</style>
        {!Object.keys(company).length && <Spinner />}
        {Object.keys(company).length &&
          <div className="l-layout">
            { extraLanguages.length !== 0 &&
            <div className="row">
              <div className="col-xs-12">
                <Alert variant="info">
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
                        <a>{extraLanguage.name} {extraLanguages.length - 1 === index ? '' : '&'} </a>
                      </Link>
                    </span>
                  ))}
                </Alert>
              </div>
            </div>
            }
            <div className="definitions-container">
              <div className="row mb-3">
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!countryName &&
                    <div className="definition-item">
                      <div className="definition-key">Headquarters</div>
                      <div className="definition-value">{countryName}</div>
                      {!!secondaryCountryName &&
                        <div className="definition-value">{secondaryCountryName}</div>}
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!stockExchange &&
                    <div className="definition-item">
                      <div className="definition-key">Stock Exchange Listings</div>
                      <div className="definition-value">{stockExchange}</div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  <div className="definition-item">
                    <div className="definition-key">Workforce</div>
                    <div className="definition-value">
                      <div>Employees:&nbsp;
                        {parseInt(employees, 10) ? (+employees).toLocaleString() : employees}
                        {employeesDate !== null && employeesDate !== 'NULL' &&
                          <span>{employeesDate && ` (${employeesDate})`}</span>
                        }
                      </div>
                      <div>
                      Contract workers:&nbsp;
                        {parseInt(workers, 10) ? (+workers).toLocaleString() : workers}
                        {workersDate !== null && workersDate !== 'NULL' &&
                        <span>{workersDate && ` (${workersDate})`}</span>
                        }
                      </div>
                      <div>
                        Total: {(employees !== null && workers !== null && !isNaN(employees) && !isNaN(workers)) ? employees + workers : 'not reported'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  <div className="definition-item">
                    <div className="definition-key">Geographic Footprint</div>
                    <div className="definition-value">
                      <div>Producing countries: {countries.length}</div>
                      <div>Known tax jurisdictions: {taxJurisdictions.length}</div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {(totalRevenueBusd !== null || NetIncomeBusd) &&
                  <div className="definition-item">
                    <div className="definition-key">Revenues (in BUSD)</div>
                    <div className="definition-value">
                      <div>
                        Total Revenue: {totalRevenueBusd.toLocaleString()}
                        {revenuesDate !== null && revenuesDate !== 'NULL' &&
                          <span>{revenuesDate && ` (${revenuesDate})`}</span>
                        }
                      </div>
                      <div>
                        Net Income: {NetIncomeBusd.toLocaleString()}
                        {revenuesDate !== null && revenuesDate !== 'NULL' &&
                          <span>{revenuesDate && ` (${revenuesDate})`}</span>
                        }
                      </div>
                    </div>
                  </div>}

                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {governmentOwnership !== null &&
                  <div className="definition-item">
                    <div className="definition-key">State Ownership</div>
                    <div className="definition-value">{governmentOwnership.name ? governmentOwnership.name : 'Not reported'}
                    {governmentOwnershipPercent !== null && governmentOwnershipPercent !== 'NULL' &&
                      <span>: {governmentOwnershipPercent}%</span>
                    }
                    </div>
                  </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!(fatalityReports || []).length &&
                    <div className="definition-item">
                      <div className="definition-key">Fatalities:</div>
                      <ul className="definition-sublist">
                        {fatalityReports.map(fatalityReport => (
                          <li key={fatalityReport.id} className="definition-sublist-item">
                            <span>{fatalityReport.year} | </span>
                            <div className="definition-sublist-item-container">
                              <span>{fatalityReport.category}: {fatalityReport.value}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>}
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default CompaniesDetailSidebar;
