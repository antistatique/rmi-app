import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Spinner from 'components/common/spinner';

// styles
import styles from './companies-detail-sidebar-styles.scss';

class CompaniesDetailSidebar extends PureComponent {
  static propTypes = { company: PropTypes.object.isRequired }

  render() {
    const { company } = this.props;
    const {
      country,
      'secondary-country': secondaryCountry,
      sector,
      'government-ownership': governmentOwnership,
      'total-revenue-busd': totalRevenueBusd,
      'number-workers': workers,
      'number-employees': employees,
      'fatality-reports': fatalityReports,
      'revenues-date': revenuesDate,
      'number-workers-date': workersDate,
      'number-employees-date': employeesDate
    } = company;
    const { name: countryName } = country || {};
    const { name: secondaryCountryName } = secondaryCountry || {};

    return (
      <div className="c-detail-sidebar white-sidebar">
        <style jsx>{styles}</style>
        {!Object.keys(company).length && <Spinner />}
        {Object.keys(company).length &&
          <div className="l-layout">
            <div className="definitions-container">
              <div className="row mb-3">
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!countryName &&
                    <div className="definition-item">
                      <div className="definition-key">Headquarters:</div>
                      <div className="definition-value">{countryName}</div>
                      {!!secondaryCountryName &&
                        <div className="definition-value">{secondaryCountryName}</div>}
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!sector &&
                    <div className="definition-item">
                      <div className="definition-key">Sector:</div>
                      <div className="definition-value">{sector}</div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {governmentOwnership !== null &&
                    <div className="definition-item">
                      <div className="definition-key">Government Ownership:</div>
                      <div className="definition-value">{governmentOwnership}</div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {totalRevenueBusd !== null &&
                    <div className="definition-item">
                      <div className="definition-key">Pre-tax Revenues (in BUSD):</div>
                      <div className="definition-value">
                        {totalRevenueBusd.toLocaleString()}
                        <span>{revenuesDate && ` (${revenuesDate})`}</span>
                      </div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {employees !== null &&
                    <div className="definition-item">
                      <div className="definition-key">Number of employees:</div>
                      <div className="definition-value">
                        {parseInt(employees, 10) ? (+employees).toLocaleString() : employees}
                        <span>{employeesDate && ` (${employeesDate})`}</span>
                      </div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {workers !== null &&
                    <div className="definition-item">
                      <div className="definition-key">Number of workers <br />(employees + contract workers):</div>
                      <div className="definition-value">
                        {parseInt(workers, 10) ? (+workers).toLocaleString() : workers}
                        <span>{workersDate && ` (${workersDate})`}</span>
                      </div>
                    </div>}
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3 mb-3">
                  {!!(fatalityReports || []).length &&
                    <div className="definition-item">
                      <div className="definition-key">Company-reported mining worker fatalities:</div>
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
