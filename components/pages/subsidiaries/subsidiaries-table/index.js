import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

// actions
import { setPaginationPage, setPaginationLimit, resetPagination, getSubsidiaries, resetSearch } from 'modules/subsidiaries/subsidiaries-actions';

// selectors
import { parseSubsidiaries } from './subsidiaries-table-selectors';

// component
import SubsidiariesTable from './subsidiaries-table-component';

class SubsidiariesTableContainer extends PureComponent {
  static propTypes = {
    search: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,
    getSubsidiaries: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { search, pagination, filters } = this.props;
    const {
      search: nextSearch,
      pagination: nextPagination,
      filters: nextFilters
    } = nextProps;

    const searchChanged = search !== nextSearch;
    const paginationChanged = !isEqual(pagination, nextPagination);
    const filtersChanged = !isEqual(filters, nextFilters);

    if (searchChanged || paginationChanged || filtersChanged) {
      this.props.getSubsidiaries({
        include: ['company', 'country'].join(','),
        sort: 'name'
      });
    }
  }

  render() {
    return (
      <SubsidiariesTable {...this.props} />
    );
  }
}

export default connect(
  state => ({
    data: parseSubsidiaries(state),
    search: state.subsidiaries.search,
    pagination: state.subsidiaries.pagination,
    loading: state.subsidiaries.loading,
    filters: state.subsidiaries.filters
  }),
  {
    getSubsidiaries,
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    resetSearch
  }
)(SubsidiariesTableContainer);
