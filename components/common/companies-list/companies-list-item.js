import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router, Link } from 'routes';
import Tether from 'react-tether';
import uniqBy from 'lodash/uniqBy';

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
    taxJurisdictions: PropTypes.array,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onOpenTooltip: PropTypes.func,
    onCloseTooltip: PropTypes.func,
    onClick: PropTypes.func,
    selectedCountry: PropTypes.string,
    selectedCompany: PropTypes.string,
    countrySource: PropTypes.string
  }

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    taxJurisdictions: null,
    onOpenTooltip: null,
    onCloseTooltip: null,
    selectedCountry: null,
    selectedCompany: null,
    countrySource: null,
    onClick: null
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

  handleCountryHighlight = () => {
    if (this.props.taxJurisdictions) {
      const foundCompany = this.props.taxJurisdictions.filter(tax => tax.company.id === this.props.company.id);
      if (!foundCompany) {
        return false;
      }
      const selectedTaxJurisdictions = uniqBy(foundCompany, 'country.id');
      const countriesTax = selectedTaxJurisdictions.map(tax => tax.country.id);
      return countriesTax.includes(this.props.selectedCountry);
    }
    if (!this.props.countrySource) {
      return this.props.selectedCountry === this.props.company.country.id;
    }
    const countries = this.props.company[this.props.countrySource].map((countrySource) => {
      if (countrySource.country) {
        return countrySource.country.id;
      }
      return countrySource.id;
    });
    return countries.includes(this.props.selectedCountry);
  }

  render() {
    const { isCompanyPage, currentLanguage, company, onMouseEnter, onMouseLeave, selectedCountry, selectedCompany, onClick } = this.props;
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
              <a className={`company-name ${(selectedCountry && (selectedCountry === company.country.id || selectedCountry === company['secondary-country'].id)) ? 'highlighted' : ''}`}>{name}</a>
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
            onClick={onClick ? () => onClick(company) : this.handleToggle}
            onMouseEnter={() => onMouseEnter(company)}
            onMouseLeave={() => onMouseLeave(company)}
          >
            <span className={`company-name ${this.handleCountryHighlight() || selectedCompany === id ? 'highlighted' : ''}`}>{name}</span>
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
