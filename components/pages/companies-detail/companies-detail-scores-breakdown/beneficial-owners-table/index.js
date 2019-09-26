import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import {
  getBeneficialOwners,
  setPaginationPage,
  setPaginationLimit,
  resetPagination
} from 'modules/beneficial-owners/beneficial-owners-actions';

import BeneficialOwnersTable from './beneficial-owners-table-component';

class BeneficialOwnerseTableContainer extends PureComponent {
  static propTypes = {
    beneficialOwners: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    getBeneficialOwners: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { pagination, company } = this.props;

    const { pagination: nextPagination } = nextProps;
    const { id } = company;

    const paginationChanged = !isEqual(pagination, nextPagination);

    if (paginationChanged) { this.props.getBeneficialOwners({ 'filter[company]': id }); }
  }

  componentWillUnmount() {
    this.props.resetPagination();
  }

  render() {
    return (
      <BeneficialOwnersTable {...this.props} />
    );
  }
}

export default connect(
  state => ({
    beneficialOwners: state.beneficialOwners.list,
    pagination: state.beneficialOwners.pagination,
    company: state.companies.currentCompany || {},
    beneficialOwnersDate: (state.companies.currentCompany || {})['beneficial-owners-date']
  }),
  {
    getBeneficialOwners,
    setPaginationPage,
    setPaginationLimit,
    resetPagination
  }
)(BeneficialOwnerseTableContainer);
