import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import find from 'lodash/find';

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
      listings: stockExchange
    } = company;

    const groupedFatalityReports = fatalityReports ? groupBy(fatalityReports, 'year') : {};

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
                      <div className="definition-value" dangerouslySetInnerHTML={{ __html: stockExchange.replace(/: /g, ':&nbsp;') }} />
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
                {Object.entries(groupedFatalityReports).map(([year, value]) =>
                  this.renderFatalities(year, value)
                )}
              </div>
            </div>
          </div>}
      </div>
    );
  }

  renderFatalities(year, originalReports) {
    // Ensure all fatalities categories are here
    // and set the value to NULL to display the 'Not reported' if not present.
    const expectedCategories = ['Employees', 'Contract workers', 'Others'];
    const fatalityReports = [];
    expectedCategories.forEach((category) => {
      const report = find(originalReports, (r) => r.category == category);

      if (report) {
        fatalityReports.push(report);
      } else {
        fatalityReports.push({
          category: category,
          value: null // 'Not reported'
        });
      }
    });

    const onlyWorkerFatalities = fatalityReports.filter((report) => report.category != 'Others');
    const otherFatalities = fatalityReports.filter((report) => report.category == 'Others');

    // when 'Employees' or 'Contract workers' are not specified,
    // the total workers fatality is regrouped under a category 'Workers'.
    const specifiedWorkersFatality = find(originalReports, (r) => r.category = 'Workers');
    const totalWorkerFatalities = specifiedWorkersFatality ? specifiedWorkersFatality.value : onlyWorkerFatalities.reduce((acc, report) => acc + report.value, 0);
    const otherFatality = otherFatalities.length > 0 ? otherFatalities[0] : null;

    return (
      <div key={year} className="col-xs-6 col-sm-4 col-md-3 mb-3">
        <style jsx>{styles}</style>
        <div className="definition-item">
          <div className="definition-key">{`${year} Fatalities`}</div>
          <div className="definition-value">Total worker fatalities: <span>{totalWorkerFatalities}</span></div>
          <ul className="definition-sublist">
            {onlyWorkerFatalities.length && onlyWorkerFatalities.map((fatalityReport, key) => (
              <li key={key} className="definition-sublist-item"><span>{fatalityReport.category}</span>: {fatalityReport.value === null ? 'not reported' : fatalityReport.value}</li>
            ))}
          </ul>
          { otherFatality && <div className="definition-value">{otherFatality.category}: <span>{otherFatality.value === null ? 'not reported' : otherFatality.value}</span></div> }
        </div>
      </div>
    );
  }
}

export default CompaniesDetailSidebar;
