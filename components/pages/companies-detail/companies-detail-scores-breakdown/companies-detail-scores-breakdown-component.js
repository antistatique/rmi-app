import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// global constants
import { measurementColors } from 'constants/graph-colors';

// components
import StackedBars from 'components/charts/stacked-bars';
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
    investmentDisputes: PropTypes.array.isRequired,
    knownTaxJurisdictions: PropTypes.array.isRequired,
    company: PropTypes.array.isRequired,
    responsive: PropTypes.object.isRequired,
    printable: PropTypes.bool,
    setPreviousYearVisibility: PropTypes.func.isRequired
  };

  static defaultProps = { printable: false }

  handleToggleClick = ({ enabled }) => {
    this.props.setPreviousYearVisibility(enabled);
  };

  render() {
    const {
      company, breakdownScores,
      shareholders, investmentDisputes, knownTaxJurisdictions,
      responsive, printable
    } = this.props;
    const {
      'shareholders-date': shareholdersDate,
      summary
    } = company[0] || {};

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

          <h2 className="summary-print-title">Summary Results</h2>
          {summary && <Summary content={summary} />}
          <div className="page-break" />
          <section className="section measurement-scores-container">
            <div className="row center-md -no-text-align">
              <div className="col-xs-12">
                <h3 id="overall-results" className="title mb-3 text-left">Summary results</h3>
              </div>
              {breakdownScores && breakdownScores.length > 0 &&
              <div className="col-xs-12 col-md-10">
                <div className="d-flex align-items-center mt-2 mb-3">
                  <ToggleSwitch onStateChanged={ this.handleToggleClick }/>
                  <span className="ml-2">Compare with 2018 results</span>
                </div>
                <div className="stacked-bars-container">
                  {breakdownScores.map((breakdownScore, index) => (
                    <StackedBars
                      key={breakdownScore.id}
                      data={breakdownScore}
                      colors={measurementColors[index]}
                      className="mb-4"
                    />
                  ))}
                </div>
              </div>
              }
            </div>
          </section>
        </div>

        <div className="l-layout">
          <div className="graph-legend">
            <p>
              The maximum value of 1.000 represents the aggregation of best scores
              achieved for all indicators in a given thematic area, taking into
              account all companies’ results. As the aggregate best score varies
              from one area to another, these charts cannot be used to compare
              company performances across different areas.
            </p>

            <p>
              All company results are based on public domain data that have been
              sourced by RMI analysts or provided by companies. In the case of a
              few companies, very little information was available. It is important
              to note that a low score may only reflect a lack of relevant
              information in the company’s publicly available documentation.
            </p>
          </div>
        </div>

        <section className="section overall-measurement-container">
          <div className="l-layout">
            <div className="row">
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
                <h2 id="indicator-by-indicator-results" className="text-left">
                  Detailed results
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
                <h2 id="mine-site-selection" className="title text-left">Selected Mine sites results</h2>
                <h3 className="subtitle text-left">Mine sites individually assessed but not included
                  {!mobile && <br />} in the overall company score
                </h3>
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
        <div className="accordion-header bg-darkblue">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12">
                <h2 id="indicator-by-indicator-results" className="text-left">
                  Tailings
                </h2>
              </div>
            </div>
          </div>
        </div>

        <section className="section -dark">
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
                <div className="mb-4"></div>
                <BeneficialOwnersTable />
              </div>
              <div className="col-xs-12 col-md-5">
                <SubsidiariesTable />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-5">
                <h3 id="tax-jurisdictions" className="title">Known Tax Jurisdictions</h3>
                {knownTaxJurisdictions.length ?
                  <Fragment>
                    <Table
                      columns={TAX_JURISDICTIONS_COLUMNS}
                      rows={knownTaxJurisdictions}
                      className="borderless"
                    />
                  </Fragment> : <Unknowndata asOf={false} />}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <h3 className="title">Investor/State investment disputes
                  <div className="title -small d-inline ml-1">(involvements since 2014)</div>
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
