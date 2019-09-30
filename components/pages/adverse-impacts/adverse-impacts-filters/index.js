import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { getAdverseImpacts } from 'modules/adverse-impacts/adverse-impacts-actions'

import { parseCompanies, parseMineSites, parseIndicators, parseCategories } from './adverse-impacts-filters-selectors';
import { setFilters, resetFilters } from '../adverse-impacts-actions';

import AdverseImpactsFilters from './adverse-impacts-filters-component';

class AdverseImpactsFiltersContainer extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    getAdverseImpacts: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { filters } = this.props;
    const { filters: nextFilters } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) {
      this.props.getAdverseImpacts({
        include: ['companies', 'mine-sites', 'thematic-areas', 'adverse-impact-files', 'countries', 'categories'].join(','),
        sort: 'summarized_headline'
      });
    }
  }

  render() {
    return (
      <AdverseImpactsFilters {...this.props} />
    );
  }
}

export default connect(
  state => ({
    companies: parseCompanies(state),
    mineSites: parseMineSites(state),
    indicators: parseIndicators(state),
    categories: parseCategories(state),
    responsive: state.responsive,
    filters: state.adverseImpactsPage.filters
  }),
  {
    setFilters,
    resetFilters,
    getAdverseImpacts
  }
)(AdverseImpactsFiltersContainer);
