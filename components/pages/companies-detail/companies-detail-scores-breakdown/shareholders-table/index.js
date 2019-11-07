import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

// Actions
import {
  getShareholders,
  setPaginationPage,
  setPaginationLimit,
  resetPagination,
  setSearch,
  resetSearch
} from 'modules/shareholders/shareholders-actions';

import ShareholdersTable from './shareholders-table-component';

class ShareholdersTableContainer extends PureComponent {
  static propTypes = {
    shareholders: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    search: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired,
    getShareholders: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired
  }
  componentWillReceiveProps(nextProps) {
    const { pagination, search, company } = this.props;

    const {
      pagination: nextPagination,
      search: nextSearch
    } = nextProps;
    const { id } = company;

    const paginationChanged = !isEqual(pagination, nextPagination);
    const searchChanged = search !== nextSearch;

    if (paginationChanged || searchChanged) {
      this.props.getShareholders({ 'filter[company]': id });
    }
  }

  componentWillUnmount() {
    this.props.resetSearch();
    this.props.resetPagination();
  }

  render() {
    return (
      <ShareholdersTable {...this.props} />
    );
  }
}

export default connect(
  state => ({
    shareholders: state.shareholders.list,
    pagination: state.shareholders.pagination,
    shareholdersDate: (state.companies.currentCompany || {})['shareholders-date'],
    company: state.companies.currentCompany || {},
    search: state.shareholders.search
  }),
  {
    getShareholders,
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    setSearch,
    resetSearch
  }
)(ShareholdersTableContainer);
