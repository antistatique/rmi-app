import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import Button from 'components/common/button';
import Modal from 'components/common/custom-modal';

// styles
import styles from './leading-practices-card-styles.scss';

class LeadingPracticesCard extends PureComponent {
  static propTypes = {
    leadingPractice: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      companies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string
      })),
      description: PropTypes.string
    }),
    currentLanguage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = { leadingPractice: {} }

  static shortDescription(description) {
    return `${description.replace(/^(.{120}[^\s]*).*/, '$1')}...`;
  }

  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
  }

  handleClick = () => {
    this.setState({ modalOpen: true });
  }

  buildLinks = () => {
    const companies = this.props.leadingPractice.companies.map((company) => {
      return {
        name: company.name,
        id: company.id,
        language: this.props.currentLanguage
      };
    });

    return companies;
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { leadingPractice, currentLanguage } = this.props;
    const { title, companies, description } = leadingPractice;
    const links = this.buildLinks();

    return (
      <div
        className="c-leading-practices-card"
      >
        <style jsx>{styles}</style>
        <h3 className="title">{title}</h3>
        {companies.map(company => (
          <h4 key={company.id} className="company">
            <Link
              route="companies"
              params={{
                language: currentLanguage,
                company: company.id
              }}
            >
              <a>{company.name}</a>
            </Link>
          </h4>
        ))}

        {description &&
          <p>{LeadingPracticesCard.shortDescription(description)}</p>}

        <Button
          className="-white"
          padding={false}
          onClick={this.handleClick}
        >
          Read more
        </Button>
        <Modal
          open={this.state.modalOpen}
          title={title}
          onClose={this.handleClose}
          links={links}
        >
          <div>
            <p>{description}</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default LeadingPracticesCard;
