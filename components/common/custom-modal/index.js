import { connect } from 'react-redux';
import { resetModal, toggleModal } from 'modules/modal/modal-actions';

import Modal from './custom-modal-component';


export default connect(
  state => ({
    visible: state.modal.visible,
    content: state.modal.content,
    title: state.modal.title,
    links: state.modal.links
  }),
  { resetModal, toggleModal }
)(Modal);
