import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Modal from 'components/common/modal';
import Select from 'components/common/select';
import Paginator from 'components/common/paginator';
import LeadingPracticesCardList from './leading-practices-card-list';
import ModalContent from './modal-content';

// styles
import styles from './leading-practices-styles.scss';

class LeadingPracticesPage extends PureComponent {
  static propTypes = {
    topics: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    leadingPracticesPagination: PropTypes.object.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    setPaginationPage: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
    getLeadingPractices: PropTypes.func.isRequired,
    setLeadingPracticesFilters: PropTypes.func.isRequired,
    resetLeadingPracticesFilters: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    setSelectedLeadingPractice: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetLeadingPracticesFilters();
    this.props.resetPagination();
  }

  handlePagination = (nextPage) => {
    this.props.setPaginationPage(nextPage);
    this.props.getLeadingPractices({ include: ['companies'].join(',') });
  };

  handleCompany = (selectedCompany) => {
    const { filters } = this.props;
    const { topic } = filters;

    this.props.setPaginationPage(1);
    this.props.setLeadingPracticesFilters({ company: selectedCompany.value, topic: topic ? topic.value : null });
  };

  handleTopic = (selectedTopic) => {
    const { filters } = this.props;
    const { company } = filters;

    this.props.setPaginationPage(1);
    this.props.setLeadingPracticesFilters({ company: company ? company.value : '', topic: selectedTopic.value });
  };

  closeModal = () => {
    this.props.toggleModal(false);
    this.props.setSelectedLeadingPractice(null);
  }

  render() {
    const { topics, companies, leadingPracticesPagination, filters, modalOpen } = this.props;
    const { size, page, limit } = leadingPracticesPagination;
    const { topic, company } = filters;

    return (
      <div className="c-leading-practices-page">
        <style jsx>{styles}</style>
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-lg-5">
                <h2 className="title">Leading Practices</h2>
              </div>
              <div className="col-lg-7">
                <p>
                  In line with its emphasis on encouraging continuous
                  improvement and learning, RMI recognises companies
                  that are developing innovative approaches. Potential
                  leading practices were identified by RMI analysts
                  during the assessment, and companies were invited to
                  provide information on any of their activities or
                  processes they consider to be leading practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section -dark">
          <div className="l-layout">
            <div className="leading-practices-container">
              <div className="d-md-flex justify-content-md-end">
                <div className="mr-md-4">
                  <div className="filters-container">
                    <Select
                      onChange={this.handleCompany}
                      options={companies}
                      placeholder="Select a company"
                      theme="light"
                      selectedValue={company}
                      className="-underline"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="filters-container">
                    <Select
                      onChange={this.handleTopic}
                      options={topics}
                      placeholder="Select a topic"
                      theme="light"
                      selectedValue={topic}
                      className="-underline"
                    />
                  </div>
                </div>
              </div>
              <LeadingPracticesCardList />
              <div className="paginator-container">
                <Paginator
                  options={{
                    size,
                    page,
                    limit
                  }}
                  onChange={this.handlePagination}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
        >
          <ModalContent />
        </Modal>
      </div>
    );
  }
}

export default LeadingPracticesPage;
