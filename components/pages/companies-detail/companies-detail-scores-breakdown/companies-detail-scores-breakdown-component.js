import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// global constants
import { measurementColors } from 'constants/graph-colors';

// components
import StackedBars from 'components/charts/stacked-bars';
import StackedBarsVertical from 'components/charts/stacked-bars-vertical';
import Table from 'components/common/table';
import Summary from 'components/common/summary';
import Gradient from 'components/common/gradient';
import CompaniesDetailMineSitesList from './companies-detail-mine-sites-list';
import CompaniesDetailTailingsList from './companies-detail-tailings-list';
import CompaniesDetailAccordion from './companies-detail-accordion';
import PrintableIssueAreas from './printable-issue-areas';
import CompaniesDetailOverallMeasurements from './companies-detail-overall-measurements';
import PrintableMeasurements from './printable-measurements';
import Slider from './slider';
import SubsidiariesTable from './subsidiaries-table';
import ShareholdersTable from './shareholders-table';
import BeneficialOwnersTable from './beneficial-owners-table';
import Unknowndata from './unknown-data';
import ToggleSwitch from 'components/common/toggle-switch';
import SelectedMineSitesTable from './selected-mine-sites-table';

// constants
import {
  INVESTMENT_DISPUTES_COLUMNS,
  TAX_JURISDICTIONS_COLUMNS
} from './companies-detail-scores-breakdown-constants';

// styles
import styles from './companies-detail-scores-breakdown-styles.scss';

class CompaniesDetailScoresBreakDown extends PureComponent {
  static propTypes = {
    breakdownScores: PropTypes.array.isRequired,
    previousBreakdownScores: PropTypes.array.isRequired,
    investmentDisputes: PropTypes.array.isRequired,
    knownTaxJurisdictions: PropTypes.array.isRequired,
    company: PropTypes.object.isRequired,
    responsive: PropTypes.object.isRequired,
    printable: PropTypes.bool,
    setPreviousYearVisibility: PropTypes.func.isRequired,
    averageMineSite: PropTypes.number.isRequired
  };

  static defaultProps = { printable: false }

  handleToggleClick = ({ enabled }) => {
    this.props.setPreviousYearVisibility(enabled);
  };

  render() {
    const {
      company, breakdownScores, previousBreakdownScores,
      shareholders, investmentDisputes, knownTaxJurisdictions,
      responsive, printable, averageMineSite
    } = this.props;
    const {
      'shareholders-date': shareholdersDate,
      summary
    } = company || {};

    const { mobile, phone } = responsive;

    const sectionClass = classnames({
      section: true,
      'indicators-accordion': true,
      '-dark': !printable
    });

    return (
      <div className="c-companies-detail-scores-breakdown">
        <style jsx>{styles}</style>
        <div className="l-layout">
          {summary && <Summary title="Summary of Results" content={summary} data={breakdownScores} company={company} />}
          <div className="page-break" />
          <section className="section measurement-scores-container pb-3">
            <div className="row center-md -no-text-align">
              <div className="col-xs-12">
                <h3 className="title mb-3 text-left">Overall results</h3>
              </div>
              {breakdownScores && breakdownScores.length > 0 &&
              <div className="col-xs-12">
                <div className="stacked-bars-container d-md-none">
                  {breakdownScores.map((breakdownScore, index) => (
                    <StackedBars
                      key={breakdownScore.id}
                      data={[breakdownScore, previousBreakdownScores[index]]}
                      colors={measurementColors[index]}
                      className="mb-4"
                    />
                  ))}
                  {
                    <StackedBars
                      key={averageMineSite}
                      data={[averageMineSite]}
                      colors={[]}
                      className="mb-4"
                    />
                  }
                </div>

                <div className="stacked-bars-vertical-container d-none d-md-flex">
                  {breakdownScores.map((breakdownScore, index) => (
                    <StackedBarsVertical
                      key={breakdownScore.id}
                      data={[breakdownScore, previousBreakdownScores[index]]}
                      colors={measurementColors[index]}
                      className={`mb-2 ${index < (breakdownScores.length - 1) ? 'mr-4' : ''}`}
                      style={{ width: `${100 / (breakdownScores.length + 1)}%` }}
                    />
                  ))}
                  {
                    <StackedBarsVertical
                      key={averageMineSite}
                      data={[averageMineSite]}
                      colors={[]}
                      className="mb-2"
                      style={{ width: `${100 / (breakdownScores.length + 1)}%` }}
                    />
                  }
                </div>
                { previousBreakdownScores.length > 0 &&
                  <div className="d-flex align-items-center mt-2 mb-3 print-none">
                    <ToggleSwitch onStateChanged={this.handleToggleClick} />
                    <span className="ml-2">Compare with 2020 results</span>
                  </div>
                }
              </div>
              }
            </div>
          </section>
        </div>

        <section className="section overall-measurement-container">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <h3 className="title mb-3 text-left">Results per measurement area</h3>
              </div>
              <div className="col-xs-12">
                {!printable && phone && <Slider />}
                {printable && <PrintableMeasurements />}
                {!printable && !phone && <CompaniesDetailOverallMeasurements />}
              </div>
            </div>
          </div>
        </section>

        <div className="page-break" />
        <div className="accordion-header bg-darkblue">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <h2 id="detailed-results" className="text-left">
                  Results per indicator
                </h2>
              </div>
            </div>
          </div>
        </div>

        <section className={sectionClass}>
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                {!printable ? <CompaniesDetailAccordion /> : <PrintableIssueAreas />}
              </div>
            </div>
          </div>
        </section>

        <section className="section -gray mine-sites-results">
          <div className="l-layout">
            <div className="row center-md">
              <div className="col-xs-12">
                <h2 id="mine-site-results" className="title text-left mb-1">Mine-site Results</h2>
                <h5 className="mb-5 text-left">
                  Mine sites selected for individual assessment
                  (but not included in the overall company score)
                </h5>
                <div className="table-container">
                  <SelectedMineSitesTable />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section -dark">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <CompaniesDetailMineSitesList />
              </div>
            </div>
          </div>
        </section>
        <div className="page-break" />

        <div className="accordion-header bg-darkblue print-none">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <h2 id="tailings" className="text-left">
                  Tailings (known)
                </h2>
              </div>
            </div>
          </div>
        </div>

        <section className="section -dark print-none">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <CompaniesDetailTailingsList />
              </div>
            </div>
          </div>
        </section>

        <section id="shareholders-and-subsidiaries" className="section -gray miscellaneous-lists">
          <div className="l-layout">
            <div className="row between-md">
              <div className="col-xs-12 col-md-5">
                <ShareholdersTable />
                <div className="mb-4" />
                <BeneficialOwnersTable />
              </div>
              <div className="col-xs-12 col-md-5">
                <SubsidiariesTable />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <h3 id="known-tax-jurisdictions" className="title">Tax Jurisdictions (known)</h3>
                <div className="mt-3 content-columns-2 content-columns-md-4">
                  {knownTaxJurisdictions.map(knownTaxJurisdiction => (
                    <p key={knownTaxJurisdiction.id}>{knownTaxJurisdiction.country}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h3 className="title">Investor / State Disputes
                  <div className="title -small d-inline ml-1">(since 2014)</div>
                </h3>
                {investmentDisputes.length ?
                  <Gradient className="-gray">
                    <Table
                      columns={INVESTMENT_DISPUTES_COLUMNS}
                      rows={investmentDisputes}
                    />
                  </Gradient> : <Unknowndata asOf={false} text="No case" />}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CompaniesDetailScoresBreakDown;
