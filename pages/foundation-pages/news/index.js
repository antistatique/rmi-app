import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import NewsListPage from 'components/pages/foundation/news';

// actions
import { getHomePageContent } from 'modules/static-content/static-content-actions';

class NewsPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getHomePageContent({ include: ['news'].join(',') }));

    return { ...props };
  }


  render() {
    return (
      <Layout
        title="News | The Foundation"
        description="Welcome to RMI | News"
      >
        <NewsListPage />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(NewsPage);
