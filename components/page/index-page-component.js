import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// actions
import { setRoute } from 'modules/routes/routes-actions';
import { mobileParser } from 'react-responsive-redux';
import { setMobileDetect } from 'modules/responsive/responsive-actions';
import { setCurrentLanguage } from 'modules/language/languages-actions';
import { getIndicators } from 'modules/indicators/indicators-actions';

// helpers
import { trackPage } from 'helpers/analytics';

class Page extends PureComponent {

  static async getInitialProps({ pathname, query, store, req, isServer }) {
    try {
      const { originalUrl } = req || {};
      const { routes } = store.getState();
      const { language } = query;

      // sets routing
      store.dispatch(setRoute({
        root: 'index',
        pathname: pathname.split('/')[1],
        tab: pathname.split('/')[2],
        query,
        originalUrl
      }));

      // Mobile detection
      if (isServer) {
        const mobileDetect = mobileParser(req);
        store.dispatch(setMobileDetect(mobileDetect));
      }

      // stores language
      if (language) store.dispatch(setCurrentLanguage(language));

      // retrieve resuls tree to populate navigation
      await store.dispatch(getIndicators({ 'filter[kind]': 'issue_areas' }));

      return { routes };
    } catch (e) {

      return e;
    }
  }

  componentDidMount() {
    trackPage();
  }

  componentWillReceiveProps(nextProps) {
    const { routes } = this.props;
    const { routes: nextRoutes } = nextProps;

    const routesChanged = !isEqual(routes, nextRoutes);

    if (routesChanged) trackPage();
  }
}

export default Page;
