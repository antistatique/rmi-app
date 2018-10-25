import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';
import isEmpty from 'lodash/isEmpty';

// components
// styles
import styles from './news-list-styles.scss';
import NewsListCardList from './news-list-card-list';
class NewsListPage extends PureComponent {
  static propTypes = {
    news: PropTypes.array,
    currentLanguage: PropTypes.string,
    setResourceId: PropTypes.func
  }



  render() {

    return (

    <div className="c-news-list-page">
      <style jsx>{styles}</style>
      <div className="page-intro">
        <div className="l-layout">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title">News</h2>
            </div>
          </div>
        </div>
        </div>


        <div className="section -white">
          <div className="l-layout">
            <div className="c-news-list-container">
              <div className="row end-sm">
                <div className="col-xs-12 col-sm-12">
                    <NewsListCardList />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    );
  }
}

export default NewsListPage;
