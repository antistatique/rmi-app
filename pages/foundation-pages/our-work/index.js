import React from 'react';
import PropTypes from 'prop-types';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page/index';
import Layout from 'components/layout/index';
import OurWork from 'components/pages/foundation/our-work/index';
import IndexesPageComponent from 'components/pages/foundation/indexes';

// actions
import { getOurWork } from 'modules/static-content/static-content-actions';

class OurWorkPage extends Page {
  static propTypes = { ourworkSection: PropTypes.string };

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getOurWork({}));

    return { ...props };
  }


  render() {

    const ourworkSection = this.props.ourworkSection;
    return (
      <Layout
        title="Our Work | The Foundation"
        description="Welcome to RMI | Our Work"
      >

        { ourworkSection === undefined ? (
          <OurWork />
        ) : (
           <IndexesPageComponent />
        )}

      </Layout>
    );
  }
}


export default withRedux(
  initStore,
  state => ({ ourworkSection: state.routes.query.section }),
  {}
)(OurWorkPage);
