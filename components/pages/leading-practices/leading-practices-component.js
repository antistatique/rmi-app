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
