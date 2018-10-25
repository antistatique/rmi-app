import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// components
import Spinner from 'components/common/spinner';
import Button from 'components/common/button';

// styles
import styles from './news-list-card-styles.scss';

class NewsListCardList extends PureComponent {
  static propTypes = {
    news: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setResourceId: PropTypes.func.isRequired
  };

  openModal({ id }) {
    this.props.setResourceId(id);
    this.props.toggleModal(true);
  }

  handleClick = news => this.openModal(news)


  static parseDate(date) {
    return moment(date).format('DD/MM/YY');
  }


  render() {
    const { news, loading, currentLanguage } = this.props;

    console.log('hehoo', news);
    return (
      <div className="news-list-card-list">
          <div className="row -equal-height">
            {news.map(_news => (
              <div className="col-md-12" key={_news.id}>
                <div
                  className="c-news-card-item">
                  <style jsx>{styles}</style>
                      <a className="-white" target="_blank" href={_news.link} >  <p> <span className="date">
                        {NewsListCardList.parseDate(_news['publication-date'])}
                      </span> {_news.title}</p>
                      </a>
                  </div>
                </div>
            ))}
          </div>
      </div>
    );
  }
}

export default NewsListCardList;
