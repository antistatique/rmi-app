// redux
import { connect } from 'react-redux';

import { getHomePageContent, setResourceId } from 'modules/static-content/static-content-actions';
import { toggleModal } from 'modules/app/app-actions';

import NewsList from './news-list-component';

export default connect(
  state => ({
    news: state.staticContent.content.news,
  }),
  {
    setResourceId,
    getHomePageContent
  }
)(NewsList);
