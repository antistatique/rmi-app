import { connect } from 'react-redux';

// actions
import { toggleModal } from 'modules/app/app-actions';
import { setResourceId } from 'modules/static-content/static-content-actions';


// component
import NewsBlock from './news-block-component';

export default connect(
  state => ({ news: state.staticContent.content.news }),
  {
    toggleModal,
    setResourceId
  }
)(NewsBlock);
