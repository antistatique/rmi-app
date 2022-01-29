import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Select from 'components/common/select';
import LeadingPracticesCardList from './leading-practices-card-list';

// styles
import styles from './leading-practices-styles.scss';

class LeadingPracticesPage extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    topics: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    setLeadingPracticesFilters: PropTypes.func.isRequired,
    resetLeadingPracticesFilters: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetLeadingPracticesFilters();
  }

  handleIndicator = (selectedIndicator) => {
    this.props.setLeadingPracticesFilters({ indicator: selectedIndicator.value });
  }

  handleCompany = (selectedCompany) => {
    this.props.setLeadingPracticesFilters({ company: selectedCompany.value });
  }

  handleTopic = (selectedTopic) => {
    this.props.setLeadingPracticesFilters({ topic: selectedTopic.value });
  }

  render() {
    const { companies, filters, topics } = this.props;
    const { company, topic } = filters;

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
                  This section summarises 88 Leading Practices that have been identified during the assessments for the RMI Reports 2018, 2020 and 2022.
                  The practices included here show a level of innovation or ambition beyond current industry norms. While some of the information may no longer be current,
                  the 88 summaries are shown here in order to support industry-wide learning on these topics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section -dark">
          <div className="l-layout">
            <div className="leading-practices-container">
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <div className="filters-container">
                    <Select
                      onChange={this.handleTopic}
                      options={topics}
                      placeholder="Select a Topic"
                      theme="light"
                      selectedValue={topic}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className="filters-container">
                    <Select
                      onChange={this.handleCompany}
                      options={companies}
                      placeholder="Select a Company"
                      theme="light"
                      selectedValue={company}
                    />
                  </div>
                </div>
              </div>
              <LeadingPracticesCardList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeadingPracticesPage;
