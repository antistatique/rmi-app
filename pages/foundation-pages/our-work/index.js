import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page/index';
import Layout from 'components/layout/index';
import OurWork from 'components/pages/foundation/our-work/index';

// actions
import { getOurWork } from 'modules/static-content/static-content-actions';

class OurWorkPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getOurWork({}));

    return { ...props };
  }


  render() {
    return (
      <Layout
        title="Our Work | The Foundation"
        description="Welcome to RMI | Our Work"
      >
        <OurWork />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(OurWorkPage);
