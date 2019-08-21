import React from 'react';
import PropTypes from 'prop-types';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import Companies from 'components/pages/companies';
import CompaniesDetail from 'components/pages/companies-detail';

// actions
import { getCompanies, getCompany, getCompaniesScores } from 'modules/companies/companies-actions';
import { getCountries } from 'modules/countries/countries-actions';
import { getCountriesWithCompanies } from 'components/pages/companies/companies-filters/companies-filters-actions';
import { getCommodities } from 'modules/commodities/commodities-actions';
import { getIndicators } from 'modules/indicators/indicators-actions';
import { getSubsidiaries } from 'modules/subsidiaries/subsidiaries-actions';

class CompaniesPage extends Page {
  static propTypes = {
    companyId: PropTypes.string,
    company: PropTypes.object
  }

  static defaultProps = { company: {} }

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    let print = false;

    // If we use a Link, the context doesn't have the req object, so we need this condition to not break the app
    if (context.req !== undefined) {
      // 5 is the length of the url when print route is called
      print = context.req.url.split('/')[context.req.url.split('/').length - 1] === 'print' ? true : false;
    }

    const state = context.store.getState();

    if (context.query.company) {
      // gets company info and relationships

      await context.store.dispatch(getCompany({
        companyId: context.query.company,
        queryParams: {
          include: ['country', 'secondary-country', 'producing-countries', 'mine-sites', 'mine-sites.country',
            'mine-sites.commodities', 'mine-sites.scores', 'scores', 'shareholders', 'subsidiaries',
            'beneficial-owners', 'company-country-tax-jurisdictions', 'company-country-tax-jurisdictions.country',
            'investment-disputes', 'fatality-reports', 'selected-mine-sites'
          ].join(','),
          'page[size]': 9999
        }
      }));

      // get all companies scores
      await context.store.dispatch(getCompaniesScores({
        'filter[kind]': ['overall_measurement_commitment', 'overall_measurement_action', 'overall_measurement_effectiveness'].join(','),
        'page[size]': 1000
      }));

      // gets indicators
      await context.store.dispatch(getIndicators({ 'page[size]': 1000 }));

      // gets subsidiaries
      await context.store.dispatch(getSubsidiaries({
        'filter[company]': context.query.company,
        sort: 'name',
        include: 'country'
      }));
    } else {
      await context.store.dispatch(getCompanies({
        include: ['country', 'secondary-country', 'mine-sites', 'mine-sites.country', 'mine-sites.commodities', 'selected-mine-sites'].join(','),
        sort: 'name'
      }));
      await context.store.dispatch(getCommodities({
        'fields[commodities]': ['name'].join(','),
        'filter[used]': true,
        sort: 'name'
      }));

      // populates country filter
      await context.store.dispatch(getCountriesWithCompanies({
        'fields[countries]': ['name', 'code'].join(','),
        'page[size]': 1000,
        'filter[hasCompanies]': true
      }));
    }


    if (context.isServer || (!context.isServer && !state.countries.list.length)) {
      await context.store.dispatch(getCountries({
        include: ['producing-companies', 'companies', 'secondary-companies'].join(','),
        sort: 'name',
        'fields[countries]': ['name', 'code', 'producing-companies', 'companies', 'secondary-companies'].join(','),
        'page[size]': 1000
      }));
    }

    return { print, ...props };
  }

  render() {
    const { companyId, company, print } = this.props;
    const { name } = company;

    const customTitle = !companyId ?
      'Companies' : `${name} - Company report`;

    return (
      <Layout
        title={customTitle}
        description="Welcome to RMI | Companies"
      >
        {companyId ?
          <CompaniesDetail print={print} /> : <Companies />}
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({
    companyId: state.routes.query.company,
    company: state.companies.list[0]
  }),
  null
)(CompaniesPage);
