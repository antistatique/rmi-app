// redux

import { connect } from 'react-redux';

// actions
import { toggleModal } from 'modules/app/app-actions';
import { setResourceId } from 'modules/static-content/static-content-actions';

import NewsListCardList from './news-list-card-list-component';

export default connect(

state => ({ news: state.staticContent.content.news }),
  {
    toggleModal,
    setResourceId
  }
)(NewsListCardList);
