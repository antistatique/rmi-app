import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';
import Icon from 'components/common/icon';

import styles from './media-detail-styles.scss';


class MediaDetail extends PureComponent {

  static propTypes = {
    mediaRelease: PropTypes.array.isRequired,
    currentLanguage: PropTypes.string.isRequired
  }


  render() {
    const mediaRelease = this.props.mediaRelease;
    const currentLanguage = this.props.currentLanguage;
    return (
      <div>
        <style jsx>{styles}</style>
        <div className="page-intro back-section">
          <div className="l-layout">
            <div className="row">
              <div className="left-side">
              <Link
                route="media"
                params={{ language: currentLanguage}}
              >
                  <a className="go-back-link">
                    <Icon
                      name="large-arrow"
                      className="-large-arrow"
                    />
                    <h4>Go to media list</h4>
                  </a>
              </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content media-list">
          <section className="section -gray">
            <div className="l-layout">
              <div className="c-modal-content">
                <h3 className="title">{mediaRelease.title}</h3>
                <h3 className="subtitle">{mediaRelease.subtitle}</h3>
                <div dangerouslySetInnerHTML={{ __html: mediaRelease.text }}></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default MediaDetail;
