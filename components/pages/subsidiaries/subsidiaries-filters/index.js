import { connect } from 'react-redux';

// actions
import { setSearch, setPaginationPage, setFilters } from 'modules/subsidiaries/subsidiaries-actions';

// component
import SubsidiariesFilters from './subsidiaries-filters-component';

// selectors
import { parseCompanies } from './subsidiaries-filters-selectors';

export default connect(
  state => ({ companies: parseCompanies(state), selectedCompany: state.subsidiaries.filters.company }),
  {
    setSearch,
    setPaginationPage,
    setFilters
  }
)(SubsidiariesFilters);
