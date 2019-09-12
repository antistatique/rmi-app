import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LinkModal from './link-modal-component';
// styles
import styles from './related-leading-practices-styles.scss';

class RelatedLeadingPractices extends PureComponent {
  static propTypes = { leadingPractices: PropTypes.array.isRequired }

  render() {
    const { leadingPractices } = this.props;

    return (
      <div className="related-leading-practices block-section">
        <style jsx>{styles}</style>
        <h5 className="block-section-name">Related leading practices</h5>
        <ul>
          {leadingPractices.map(leadingPractice => (
            <LinkModal leadingPractice={leadingPractice} />
          ))}
        </ul>
      </div>
    );
  }
}

export default RelatedLeadingPractices;
