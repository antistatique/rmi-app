import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import { getCompanyCountryColor } from '../../companies/companies-helpers';
import Filters from './map-producing-countries-filters';
import { MAP_LEGEND } from './map-producing-countries-constants';

import styles from '../maps-and-tables-styles.scss';
 
class MapProducingCountries extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string,
    selectedCompany: PropTypes.string,
    setProducingCountriesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCountry: null, selectedCompany: null }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);

  onClickCompany = (selectedCompany) => {
    if (selectedCompany === this.props.selectedCompany) {
      this.props.setProducingCountriesFilters({ company: undefined });
    } else {
      this.props.setProducingCountriesFilters({ company: selectedCompany });
    }
  }

  onClickCountry = (geography, evt, map) => {
    const { ISO_A3 } = geography.properties;
    const country = this.props.countries.find(tempCountry => tempCountry.code === ISO_A3);
    if (country && this.props.selectedCountry === country.id) {
      return this.props.setProducingCountriesFilters({ country: undefined });
    }
    if (country) {
      this.props.setProducingCountriesFilters({ country: country.id });
    }
  }

  filterCompany = (company) => {
    const countries = company['producing-countries'].map(producingCountry => producingCountry.id);
    return countries.includes(this.props.selectedCountry);
  }

  render() {
    return (
      <div className="c-map-producing-countries">
        <style jsx>{styles}</style>
        <div className="row mb-4">
          <div className="col-xs-12 col-md-4">
            { (this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setProducingCountriesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setProducingCountriesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setProducingCountriesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="producing-countries"
              />
            }
            { (this.props.selectedCompany && !this.props.selectedCountry) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setProducingCountriesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setProducingCountriesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setProducingCountriesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="producing-countries"
              />
            }
            { (this.props.selectedCountry && this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setProducingCountriesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setProducingCountriesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setProducingCountriesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="producing-countries"
              />
            }
            { (!this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setProducingCountriesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setProducingCountriesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setProducingCountriesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="producing-countries"
              />
            }
          </div>
          <div className="col-xs-12 col-md-8">
            <Filters />
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapProducingCountries.setCountryColor}
              legend={MAP_LEGEND}
              onClick={this.onClickCountry}
            />
          </div>
        </div>
        <div className="row mb-2 text-white">
          <span style={{ fontSize: '20px' }}>Download data :</span>
        </div>
        <div className="row mb-2 text-white">
          <a className="downloadable-links" href="/static/files/RMI_Report_2020_Producing_Countries.xlsx" download>RMI_Report_2020_Producing_Countries</a>
        </div>
        <div className="row mb-2 text-white">
          <a className="downloadable-links" href="/static/files/RMI_Report_2020_Raw_Data_Producing_Countries.csv" download>RMI_Report_2020_Raw_Data_Producing_Countries</a>
        </div>
      </div>
    );
  }
}

export default MapProducingCountries;
