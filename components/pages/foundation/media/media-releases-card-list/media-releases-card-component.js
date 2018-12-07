import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';

// styles
import styles from './media-releases-card-styles.scss';

class MediaReleaseCard extends PureComponent {
  static propTypes = {
    mediaRelease: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
  }



  static defaultProps = { mediaRelease: {} }

  handleClick = () => {
    const { onClick, mediaRelease } = this.props;
    onClick(mediaRelease);
  }

  render() {
    const { id, title, subtitle, summary } = this.props.mediaRelease;
    const currentLanguage = this.props.currentLanguage;
    return (

      <div
        className="c-media-releases-card"
      >
        <style jsx>{styles}</style>
        <Link
          route="media"
          params={{
            language: currentLanguage,
            id: id
          }}
        >
          <a>
            <h3 className="title">{title}</h3>
            <h3 className="subtitle">{subtitle}</h3>
            <p className="summary">{summary}</p>

          </a>

        </Link>


      </div>
    );
  }
}

export default MediaReleaseCard;
