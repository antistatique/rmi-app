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
    selectedissueArea: PropTypes.string,
    setIssueArea: PropTypes.func.isRequired
  }

  static defaultProps = { selectedissueArea: null }

  constructor(props) {
    super(props);

    this.state = {
      stickyOffset: 0,
    };
  }

  getBackground(issueArea) {
    const { selectedissueArea } = this.props;

    return issueArea.id === selectedissueArea ?
      AREA_ISSUE_COLOURS[issueArea.id] : 'transparent';
  }

  componentDidMount() {
    // As we have multiple sticky header, we have to offset the css:sticky property to works.
    // We calculate the height of the 2 sticky headers and add it as offset.
    const siteHeader = document.querySelector('header');
    const companyHeader = document.querySelector('.c-companies-detail-header');

    if (companyHeader && siteHeader) {
      const stickyOffset = siteHeader.offsetHeight + companyHeader.offsetHeight + 25;
      this.setState({
        stickyOffset: stickyOffset,
      })
    }
  }

  render() {
    const { issueAreas, setIssueArea } = this.props;

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
            <li key={issueArea.id}>
              <button
                style={{ background: this.getBackground(issueArea) }}
                onClick={() => setIssueArea(issueArea.id)}
              >
                <Icon
                  name={issueArea.id}
                  className="-x-big"
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
