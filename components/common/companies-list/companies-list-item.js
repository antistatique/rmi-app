import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';
import Tether from 'react-tether';

// helpers
import { trackEvent, trackLink } from 'helpers/analytics';

// components
import CompaniesListTooltip from './companies-list-tooltip';

// styles
import styles from './companies-list-styles.scss';

class CompaniesListItem extends PureComponent {
  static propTypes = {
    company: PropTypes.object.isRequired,
    isCompanyPage: PropTypes.bool.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onOpenTooltip: PropTypes.func,
    onCloseTooltip: PropTypes.func,
    selectedCountry: PropTypes.string
  }

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onOpenTooltip: null,
    onCloseTooltip: null,
    selectedCountry: null
  }

  constructor(props) {
    super(props);

    this.state = { visibility: false };
  }

  handleToggle = () => {
    const { company, onOpenTooltip } = this.props;
    const { visibility } = this.state;
    this.setState({ visibility: !visibility });

    if (onOpenTooltip) onOpenTooltip(company);

    trackEvent('click', `Clicks on mine sites of company: ${company.name}`, company);
  }

  handleClick = (company) => {
    const { id } = company;

    trackLink(`/companies/${id}`, 'Clicks on company detail ', () => {
      Router.pushRoute('company', { company: id, language: this.props.currentLanguage });
    });
  }

  handleClose = () => {
    const { onCloseTooltip, company } = this.props;
    this.setState({ visibility: false });

    if (onCloseTooltip) onCloseTooltip(company);
  }

  render() {
    const { isCompanyPage, currentLanguage, company, onMouseEnter, onMouseLeave, selectedCountry } = this.props;
    const { name, id, 'selected-mine-sites': mineSites } = company;
    const { visibility } = this.state;

    if (isCompanyPage) {
      return (
        <Fragment>
          <style jsx>{styles}</style>
          <div
            className="companies-list-item"
            onClick={this.handleToggle}
            onMouseEnter={() => onMouseEnter(company)}
            onMouseLeave={onMouseLeave}
          >
            <Link
              route="company"
              params={{
                language: currentLanguage,
                company: id
              }}
            >
              <a className={`company-name ${(selectedCountry === company.country.id || selectedCountry === company['secondary-country'].id) ? 'highlighted' : ''}`}>{name}</a>
            </Link>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <style jsx>{styles}</style>
        <Tether
          attachment="top center"
          targetAttachment="bottom center"
          className="companies-list-tooltip-tether"
          key={id}
          constraints={[
            {
              to: 'scrollParent',
              attachment: 'together none',
              pin: true
            }
          ]}
        >
          <div
            className="companies-list-item"
            onClick={this.handleToggle}
          >
            <span className={`company-name ${selectedCountry === company.country.id ? 'highlighted' : ''}`}>{name}</span>
          </div>
          {visibility &&
            <CompaniesListTooltip
              mineSites={mineSites}
              handleClose={this.handleClose}
              company={this.props.company}
              currentLanguage={currentLanguage}
            />}
        </Tether>
        {visibility &&
          <div
            className="veil"
            onClick={this.handleClose}
          />}
      </Fragment>
    );
  }
}

export default CompaniesListItem;
