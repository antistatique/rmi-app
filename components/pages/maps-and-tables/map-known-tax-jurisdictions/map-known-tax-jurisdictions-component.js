import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';

import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import Filters from './map-known-tax-jurisdications-filters';
import { getCountryColor } from './map-known-tax-jurisdictions-helpers';

class MapTaxJurisdictions extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    taxJurisdictions: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string,
    selectedCompany: PropTypes.string,
    setKnownTaxFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCountry: null, selectedCompany: null }

  static setCountryColor = geographyProperties => getCountryColor(geographyProperties);

  onClickCompany = (selectedCompany) => {
    if (selectedCompany === this.props.selectedCompany) {
      this.props.setKnownTaxFilters({ company: undefined });
    } else {
      this.props.setKnownTaxFilters({ company: selectedCompany });
    }
  }

  onClickCountry = (geography, evt, map) => {
    const { ISO_A3 } = geography.properties;
    const country = this.props.countries.find(tempCountry => tempCountry.code === ISO_A3);
    if (country && this.props.selectedCountry === country.id) {
      return this.props.setKnownTaxFilters({ country: undefined });
    }
    if (country) {
      this.props.setKnownTaxFilters({ country: country.id });
    }
  }

  filterCompany = (company) => {
    const filteredTaxes = this.props.taxJurisdictions.filter(tax => tax.company.id === company.id);
    const selectedTaxJurisdictions = uniqBy(filteredTaxes, 'country.id');
    const countries = selectedTaxJurisdictions.map(tax => tax.country.id);
    return countries.includes(this.props.selectedCountry);
  }

  countriesHighlight = (company) => {
    const foundCompany = this.props.taxJurisdictions.filter(tax => tax.company.id === company.id);
    if (!foundCompany) {
      return [];
    }
    const selectedTaxJurisdictions = uniqBy(foundCompany, 'country.id');
    return selectedTaxJurisdictions.map(tax => tax.country.id);
  }

  render() {
    return (
      <div className="c-map-tax-jurisdictions">
        <div className="row mb-4">
          <div className="col-xs-12 col-md-4">
            { (this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setKnownTaxFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setKnownTaxFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setKnownTaxFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                taxJurisdictions={this.props.taxJurisdictions}
              />
            }
            { (this.props.selectedCompany && !this.props.selectedCountry) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setKnownTaxFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setKnownTaxFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setKnownTaxFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                taxJurisdictions={this.props.taxJurisdictions}
              />
            }
            { (this.props.selectedCountry && this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setKnownTaxFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setKnownTaxFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setKnownTaxFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                taxJurisdictions={this.props.taxJurisdictions}
              />
            }
            { (!this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setKnownTaxFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setKnownTaxFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setKnownTaxFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                taxJurisdictions={this.props.taxJurisdictions}
              />
            }
            
          </div>
          <div className="col-xs-12 col-md-8">
            <Filters />
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapTaxJurisdictions.setCountryColor}
              legend={[]}
              onClick={this.onClickCountry}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapTaxJurisdictions;
