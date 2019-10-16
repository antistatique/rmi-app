import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import CompaniesList from 'components/common/companies-list';
import { getCompanyCountryColor } from '../../companies/companies-helpers';
import Filters from './map-stock-exchanges-filters';

class MapStockExchanges extends PureComponent {
  static propTypes = {
    paths: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    selectedCompany: PropTypes.string,
    selectedCountry: PropTypes.string,
    resetSelectedCompany: PropTypes.func.isRequired,
    setSelectedCompany: PropTypes.func.isRequired
  }

  static defaultProps = { selectedCountry: null, selectedCompany: null }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-stock-exchanges">
        <div className="row mb-4">
          <div className="col-xs-12 col-md-4">
            { (this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => company.country.id === this.props.selectedCountry || company['secondary-country'].id === this.props.selectedCountry)}
                onMouseEnter={({ id }) => { this.props.setSelectedCompany(id); }}
                onMouseLeave={() => { this.props.resetSelectedCompany(); }}
              />
            }
            { (this.props.selectedCompany && !this.props.selectedCountry) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => company.id === this.props.selectedCompany)}
                onMouseEnter={({ id }) => { this.props.setSelectedCompany(id); }}
                onMouseLeave={() => { this.props.resetSelectedCompany(); }}
              />
            }
            { (this.props.selectedCountry && this.props.selectedCompany) &&
              <CompaniesList
                companiesFromProps={this.props.companies.filter(company => company.id === this.props.selectedCompany && (company.country.id === this.props.selectedCountry || company['secondary-country'].id === this.props.selectedCountry))}
                onMouseEnter={({ id }) => { this.props.setSelectedCompany(id); }}
                onMouseLeave={() => { this.props.resetSelectedCompany(); }}
              />
            }
            { (!this.props.selectedCountry && !this.props.selectedCompany) &&
              <CompaniesList
                onMouseEnter={({ id }) => { this.props.setSelectedCompany(id); }}
                onMouseLeave={() => { this.props.resetSelectedCompany(); }}
              />
            }
          </div>
          <div className="col-xs-12 col-md-8">
            <Filters />
            <Map
              paths={this.props.paths}
              center={[40, 10]}
              setCountryColor={MapStockExchanges.setCountryColor}
              legend={[]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapStockExchanges;
