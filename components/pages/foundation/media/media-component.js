import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import MediaReleasesCardList from './media-releases-card-list';
import MediaDetail from './media-detail';
import Modal from 'components/common/modal';
import ModalContent from './modal-content';

class Media extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired,
    mediaId: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setResourceId: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    modalOpen: PropTypes.bool.isRequired
  }

  closeModal = () => {
    this.props.toggleModal(false);
    this.props.setResourceId(null);
  }

  render() {
    const { content, modalOpen, mediaId, currentLanguage } = this.props;
    const { title, summary } = content;

    return (

      <div className="c-contact">


        { mediaId ? (
          <MediaDetail />
          ) : (
          <div>
          <div className="page-intro">
            <div className="l-layout">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="title">{title}</h2>
                </div>
                <div className="col-md-6">
                  <p>{summary}</p>
                </div>
              </div>
            </div>
          </div>

            <div className="page-content media-list">
              <section className="section -gray">
                <div className="l-layout">
                  <MediaReleasesCardList currentLanguage={currentLanguage} />
                </div>
              </section>
            </div>
          </div>

        )}

      </div>
    );
  }
}

export default Media;
