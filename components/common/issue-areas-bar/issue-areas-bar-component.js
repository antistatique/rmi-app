import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Icon from 'components/common/icon';

// constants
import { AREA_ISSUE_COLOURS } from 'constants/graph-colors';

// styles
import styles from './issue-areas-bar-styles.scss';

class IssueAreasBar extends PureComponent {
  static propTypes = {
    issueAreas: PropTypes.array.isRequired,
    selectedIssueArea: PropTypes.string,
    setIssueArea: PropTypes.func.isRequired
  };

  static defaultProps = { selectedIssueArea: null }

  constructor(props) {
    super(props);

    this.headOfBar = null;
    this.state = { stickyOffset: 0 };
  }

  componentDidMount() {
    // As we have multiple sticky header, we have to offset the css:sticky property to works.
    // We calculate the height of the 2 sticky headers and add it as offset.
    const siteHeader = document.querySelector('header');
    const companyHeader = document.querySelector('.c-companies-detail-header');

    // Setup the basic offset to 0.5 of the parent <section> element. CSS Sticky property badly deal
    // with padding on parent.
    let stickyOffset = 27.5;
    stickyOffset += companyHeader ? companyHeader.offsetHeight : 0;
    stickyOffset += siteHeader ? siteHeader.offsetHeight : 0;

    this.headOfBar = document.querySelector('#detailed-results') || document.querySelector('#indicator-by-indicator-results');

    this.setState({
      stickyOffset: stickyOffset,
    });
  }

  setIssueAreaJump = (id) => {
    const top = (this.headOfBar.getBoundingClientRect().top + window.pageYOffset) - 250;

    window.scrollTo({
      top, // scroll so that the element is at the top of the view
      behavior: 'smooth' // smooth scroll
    });
    this.props.setIssueArea(id);
  }

  getColor(issueArea) {
    const { selectedIssueArea } = this.props;

    return issueArea.id === selectedIssueArea ?
      AREA_ISSUE_COLOURS[issueArea.id] : 'transparent';
  }

  render() {
    const { issueAreas, selectedIssueArea } = this.props;

    return (
      <div className="c-issue-areas-bar align-items-start">
        <style jsx>{styles}</style>
        <ul
          className={this.state.stickyOffset ? 'sticky-top' : ''}
          style={
            this.state.stickyOffset ? { top: this.state.stickyOffset } : {}
          }
        >
          {issueAreas.map(issueArea => (
            <li
              key={issueArea.id}
              className={issueArea.id === selectedIssueArea ? 'active' : ''}
            >
              <button
                onClick={() => this.setIssueAreaJump(issueArea.id)}
              >
                <Icon
                  name={issueArea.id}
                  className={`${issueArea.id === selectedIssueArea ? 'active' : ''} -x-big`}
                  style={{ background: this.getColor(issueArea) }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default IssueAreasBar;
