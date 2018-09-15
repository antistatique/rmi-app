import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import IndexPageComponent from 'components/pages/index-homepage';

class IndexPage extends Page {
  render() {
    return (
      <Layout
        title="Index"
        description="Welcome to RMI | Index"
      >
        <IndexPageComponent />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(IndexPage);
