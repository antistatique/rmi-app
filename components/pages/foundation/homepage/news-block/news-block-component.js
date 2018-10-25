import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'routes';


// styles
import styles from './news-block-styles.scss';

// constants
const NEWS_PER_BLOCK = 5;

class NewsBlock extends PureComponent {
  static propTypes = {
    news: PropTypes.array,
    setResourceId: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired

  }

  static defaultProps = { news: [] }

  static parseDate(date) {
    return moment(date).format('DD/MM/YY');
  }

  handleClick(id) {
    this.props.setResourceId(id);
    this.props.toggleModal(true);
  }



  render() {

    const news = this.props.news;
    const currentLanguage = this.props.currentLanguage;
    let sortedNews = news.sort((a, b) => new Date(a['publication-date'].split('/').reverse()) - new Date(b['publication-date'].split('/').reverse()));
    sortedNews = sortedNews.reverse().slice(0,NEWS_PER_BLOCK);
      return (
      <div>
        <style>{styles}</style>
          <div className="card card-cascade wider">
            <div className="view view-cascade gradient-card-header brown-gradient">
              <h2 className="card-header-title mb-3">News</h2>
            </div>
            <div className="card-body card-body-cascade text-center">

              <ul>
                  {sortedNews.map(_news => {
                      return _news.link < 0 ?
                      <li className="newsListItem" key={_news.id} >
                        <span className="date">{NewsBlock.parseDate(_news['publication-date'])}</span>
                        {_news.title}
                      </li>
                      :
                        <li className="newsListItem" >
                          <a href={_news.link} target="_blank">
                          <span className="date">{NewsBlock.parseDate(_news['publication-date'])}</span>
                          {_news.title}
                          </a></li>
                  })}
              </ul>
              <Link
                route="news"
                params={{ language: currentLanguage }}
              >
                <a className="brown-text d-flex flex-row-reverse p-2">
                  <h5 className="waves-effect waves-light">Read all news <i className="fa fa-angle-double-right ml-2"></i></h5>
                </a>
              </Link>
            </div>
          </div>
        </div>
    );
  }



}

export default NewsBlock;
