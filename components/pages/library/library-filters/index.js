import { connect } from 'react-redux';

// actions
import { setSearch, setFilters, setPaginationPage } from 'modules/documents/documents-actions';

// selectors
import { parseCompanies } from './library-filters-selectors';

// component
import LibraryFilters from './library-filters-component';

export default connect(
  state => ({
    companies: parseCompanies(state),
    filters: state.documents.filters
  }),
  {
    setSearch,
    setFilters,
    setPaginationPage
  }
)(LibraryFilters);
