import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getMineSitesPagination } from 'modules/mine-sites/mine-sites-actions';

import * as actions from './table-mine-sites-actions';
import initialState from './table-mine-sites-initial-state';
import * as reducers from './table-mine-sites-reducers';

import { setPaginationPage, setPaginationLimit, resetPagination, setFilters, resetFilters } from './table-mine-sites-actions'
import { getCompanies, parseCountries, getMineSites } from './table-mine-sites-selectors';
import TableMineSitesComponent from './table-mine-sites-component';

export { actions, reducers, initialState };

class TableMineSitesContainer extends PureComponent {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    getMineSitesPagination: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { pagination, filters } = this.props;
    const { pagination: nextPagination, filters: nextFilters } = nextProps;

    const paginationChanged = !isEqual(pagination, nextPagination);
    const filtersChanged = !isEqual(filters, nextFilters);

    if (paginationChanged || filtersChanged) {
      this.props.getMineSitesPagination({ queryParams: { include: ['country', 'companies'].join(',') } });
    }
  }

  render() {
    return (
      <TableMineSitesComponent {...this.props} />
    );
  }
}

export default connect(
  state => ({
    mineSites: getMineSites(state),
    pagination: state.tableMineSites.pagination,
    filters: state.tableMineSites.filters,
    selectedCompany: state.tableMineSites.filters.company,
    selectedCountry: state.tableMineSites.filters.country,
    companies: getCompanies(state),
    countries: parseCountries(state)
  }),
  {
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    getMineSitesPagination,
    setFilters,
    resetFilters
  }
)(TableMineSitesContainer);
