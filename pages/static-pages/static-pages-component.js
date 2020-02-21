import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';

import StaticPageComponent from 'components/pages/static-page';

import { getStaticPage } from 'modules/static-pages/static-pages-actions';

class StaticPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getStaticPage({ slug: context.query.slug }));

    return { ...props };
  }

  render() {
    const { content, loading } = this.props;
    return (
      <Layout
        title={content.title}
        description="Welcome to RMI | Results - Overall"
      >
        <StaticPageComponent
          content={content}
          loading={loading}
        />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({
    content: state.staticPages.content,
    loading: state.staticPages.loading
  }),
  {}
)(StaticPage);
