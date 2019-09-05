import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { setPaginationPage, setPaginationLimit, resetPagination, getAdverseImpacts } from 'modules/adverse-impacts/adverse-impacts-actions';

import AdverseImpactsTable from './adverse-impacts-table-component';

class AdverseImpactsTableContainer extends PureComponent {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    getAdverseImpacts: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { pagination } = this.props;
    const { pagination: nextPagination } = nextProps;

    const paginationChanged = !isEqual(pagination, nextPagination);

    if (paginationChanged) {
      this.props.getAdverseImpacts({
        include: ['companies', 'mine-sites', 'thematic-areas'].join(','),
        sort: 'summarized_headline'
      });
    }
  }

  render() {
    return (
      <AdverseImpactsTable {...this.props} />
    );
  }
}

export default connect(
  state => ({
    data: state.adverseImpacts.list,
    pagination: state.adverseImpacts.pagination,
    loading: state.adverseImpacts.loading,
    filters: state.adverseImpactsPage.filters
  }),
  {
    setPaginationPage,
    setPaginationLimit,
    resetPagination,
    getAdverseImpacts
  }
)(AdverseImpactsTableContainer);
