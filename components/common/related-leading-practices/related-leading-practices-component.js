import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LinkModal from './link-modal-component';
import Icon from 'components/common/icon';
// styles
import styles from './related-leading-practices-styles.scss';

class RelatedLeadingPractices extends PureComponent {
  static propTypes = { leadingPractices: PropTypes.array.isRequired }

  render() {
    const { leadingPractices } = this.props;

    return (
      <div className="related-leading-practices block-section">
        <style jsx>{styles}</style>
        <h5 className="block-section-name"><Icon name="small-flag" className="-medium" style={{ marginRight: '3px', marginTop: '3px' }} />Related Leading Practices</h5>
        <ul>
          {leadingPractices.map(leadingPractice => (
            <LinkModal key={leadingPractice.id} leadingPractice={leadingPractice} />
          ))}
        </ul>
      </div>
    );
  }
}

export default RelatedLeadingPractices;
