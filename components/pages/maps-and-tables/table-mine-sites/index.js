import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { getMineSitesPagination } from 'modules/mine-sites/mine-sites-actions';

import * as actions from './table-mine-sites-actions';
import initialState from './table-mine-sites-initial-state';
import * as reducers from './table-mine-sites-reducers';

import { setPaginationPage, setPaginationLimit, resetPagination } from './table-mine-sites-actions'
import TableMineSitesComponent from './table-mine-sites-component';

export { actions, reducers, initialState };

class TableMineSitesContainer extends PureComponent {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    getMineSitesPagination: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    const { pagination: nextPagination } = nextProps;

    const paginationChanged = !isEqual(pagination, nextPagination);

    if (paginationChanged) {
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
    mineSites: state.mineSites.list,
    pagination: state.tableMineSites.pagination,
    filters: state.tableMineSites.filters
  }),
  {
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    getMineSitesPagination
  }
)(TableMineSitesContainer);
