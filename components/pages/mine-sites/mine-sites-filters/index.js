import { connect } from 'react-redux';

// selectors
import { parseMineSites, geCurrentMineSiteOption } from './mine-sites-filters-selectors';

// component
import MineSiteFilters from './mine-sites-filters-component';

export default connect(
  state => ({
    mineSites: parseMineSites(state),
    selectedMineSite: state.mineSitesPage.filters.selectedMineSite,
    currentLanguage: state.language.current
  }),
  {}
)(MineSiteFilters);
