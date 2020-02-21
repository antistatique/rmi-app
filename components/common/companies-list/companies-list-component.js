import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import Spinner from 'components/common/spinner';
import CompaniesListItem from './companies-list-item';

// constants
import { COMPANIES_PER_ROW } from './companies-list-constants';

// styles
import styles from './companies-list-styles.scss';

class CompaniesList extends PureComponent {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    isFiveColumns: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    isCompanyPage: PropTypes.bool,
    currentLanguage: PropTypes.string.isRequired,
    taxJurisdictions: PropTypes.array,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseListLeave: PropTypes.func,
    onOpenTooltip: PropTypes.func,
    onCloseTooltip: PropTypes.func,
    onClick: PropTypes.func,
    selectedCountry: PropTypes.string,
    selectedCompany: PropTypes.string,
    countrySource: PropTypes.string,
    companiesFromProps: PropTypes.array
  }

  static defaultProps = {
    isCompanyPage: true,
    isFiveColumns: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseListLeave: () => {},
    taxJurisdictions: null,
    onOpenTooltip: null,
    onCloseTooltip: null,
    selectedCountry: null,
    selectedCompany: null,
    companiesFromProps: null,
    countrySource: null,
    onClick: null
  };

  render() {
    const {
      companies,
      loading,
      isFiveColumns,
      isCompanyPage,
      currentLanguage,
      onMouseEnter,
      onMouseLeave,
      taxJurisdictions,
      onMouseListLeave,
      onOpenTooltip,
      onCloseTooltip,
      selectedCountry,
      selectedCompany,
      companiesFromProps,
      countrySource,
      onClick
    } = this.props;

    return (
      <div className={`c-companies-list ${isFiveColumns ? 'five-columns' : ''}`} onMouseLeave={onMouseListLeave}>
        <style jsx>{styles}</style>
        <div className="content">
          {loading && <Spinner />}

          {companiesFromProps && companiesFromProps.map(company => (
            <CompaniesListItem
              key={company.id}
              company={company}
              currentLanguage={currentLanguage}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              isCompanyPage={isCompanyPage}
              onOpenTooltip={onOpenTooltip}
              onCloseTooltip={onCloseTooltip}
              selectedCountry={selectedCountry}
              selectedCompany={selectedCompany}
              countrySource={countrySource}
              taxJurisdictions={taxJurisdictions}
            />
          ))}

          {!companiesFromProps && !companies.length &&
            <div className="not-found">
              <span>No companies found under this criteria</span>
            </div>}
          {!companiesFromProps && companies.map(company => (
            <CompaniesListItem
              key={company.id}
              company={company}
              currentLanguage={currentLanguage}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              isCompanyPage={isCompanyPage}
              onOpenTooltip={onOpenTooltip}
              onCloseTooltip={onCloseTooltip}
              selectedCountry={selectedCountry}
              selectedCompany={selectedCompany}
              countrySource={countrySource}
              taxJurisdictions={taxJurisdictions}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CompaniesList;
