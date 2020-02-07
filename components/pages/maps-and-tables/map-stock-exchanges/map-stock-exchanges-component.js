import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import { MAP_LEGEND } from './map-stock-exchanges-constants';
import { getCountryColor } from './map-stock-exchanges-helpers';
import Filters from './map-stock-exchanges-filters';

import styles from '../maps-and-tables-styles.scss';

class MapStockExchanges extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    selectedCountry: PropTypes.string,
    setStockExchangesFilters: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCountry: null, selectedCompany: null }

  static setCountryColor = geographyProperties => getCountryColor(geographyProperties);

  onClickCompany = (selectedCompany) => {
    if (selectedCompany === this.props.selectedCompany) {
      this.props.setStockExchangesFilters({ company: undefined });
    } else {
      this.props.setStockExchangesFilters({ company: selectedCompany });
    }
  }

  onClickCountry = (geography, evt, map) => {
    const { ISO_A3 } = geography.properties;
    const country = this.props.countries.find(tempCountry => tempCountry.code === ISO_A3);
    if (country && this.props.selectedCountry === country.id) {
      return this.props.setStockExchangesFilters({ country: undefined });
    }
    if (country) {
      this.props.setStockExchangesFilters({ country: country.id });
    }
  }

  filterCompany = (company) => {
    const countries = company['stock-exchanges'].map(stockExchange => stockExchange.country.id);
    return countries.includes(this.props.selectedCountry);
  }

  render() {
    return (
      <div className="c-map-stock-exchanges">
        <style jsx>{styles}</style>
        <div className="row mb-4">
          <div className="col-xs-12 col-md-4">
            { (this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setStockExchangesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setStockExchangesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setStockExchangesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                countrySource="stock-exchanges"
                isCompanyPage={false}
              />
            }
            { (this.props.selectedCompany && !this.props.selectedCountry) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setStockExchangesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setStockExchangesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setStockExchangesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="stock-exchanges"
              />
            }
            { (this.props.selectedCountry && this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => this.filterCompany(company))}
                onMouseEnter={({ id }) => { this.props.setStockExchangesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setStockExchangesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setStockExchangesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="stock-exchanges"
              />
            }
            { (!this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies}
                onMouseEnter={({ id }) => { this.props.setStockExchangesFilters({ company: id }); }}
                onMouseLeave={(company) => { this.props.setStockExchangesFilters({ company: company ? company.id : undefined }); }}
                onMouseListLeave={() => { this.props.setStockExchangesFilters({ company: undefined }); }}
                onClick={({ id }) => { this.onClickCompany(id); }}
                selectedCompany={this.props.selectedCompany}
                isCompanyPage={false}
                countrySource="stock-exchanges"
              />
            }
          </div>
          <div className="col-xs-12 col-md-8">
            <Filters />
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapStockExchanges.setCountryColor}
              legend={MAP_LEGEND}
              onClick={this.onClickCountry}
            />
          </div>
        </div>
        <div className="row mb-2 text-white">
          <span style={{ fontSize: '20px' }}>Download data :</span>
        </div>
        <div className="row mb-2 text-white">
          <a className="downloadable-links" href="/static/files/RMI_Report_2020_Stock_Exchanges.xlsx" download>RMI_Report_2020_Stock_Exchanges</a>
        </div>
        <div className="row mb-2 text-white">
          <a className="downloadable-links" href="/static/files/RMI_Report_2020_Raw_Data_Stock_Exchanges.csv" download>RMI_Report_2020_Raw_Data_Stock_Exchanges</a>
        </div>
      </div>
    );
  }
}

export default MapStockExchanges;
