import { Col, Row } from "react-bootstrap"
import Map from '../../assets/dashboard/homepage/map.png'
import ProgressBar from "../progressbar"
import Australia from '../../assets/dashboard/countries/Australia.png'
import Canada from '../../assets/dashboard/countries/Canada.png'
import India from '../../assets/dashboard/countries/India.png'
import Pakistan from '../../assets/dashboard/countries/Pakistan.png'
import Russian from '../../assets/dashboard/countries/Russia.png'
import UK from '../../assets/dashboard/countries/UK.png'
import UnitedStates from '../../assets/dashboard/countries/UnitedStates.png'
import Sample from '../../assets/dashboard/countries/UnitedStates.png'


const DashboardLocation: React.FC = () => {
    const usersByLocation = [
      { country: 'India', percentage: 50 },
      { country: 'Canada', percentage: 30 },
      { country: 'Russia', percentage: 20 },
      { country: 'United Kingdom', percentage: 50 },
      { country: 'Australia', percentage: 50 },
      { country: 'United States', percentage: 50 },
      { country: 'Pakistan', percentage: 50 },
    ];
  
    return (
      <div className="users-by-location">
        <div className="img-wrapper">
          <div className="title">Active Users By Location</div>
          <img src={Map} alt="Map" className="map-img" />
        </div>
        <div className="user-by-location-content">
          {usersByLocation.map((location, index) => (
            <div key={index} className="location-item d-flex">
                <div>
                    <img
                    src={getCountryImage(location.country)}
                    alt={location.country}
                    className="country-img"
                    />
                </div>
                <div className="content">
                    <div className="country-name">{location.country}</div>
                    <div className="percentage"><ProgressBar percentage={location.percentage}/></div>
                </div>
              
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const getCountryImage = (country: string) => {
    switch (country) {
      case 'India':
        return India;
      case 'Canada':
        return Canada;
      case 'Russia':
        return Russian;
      case 'United Kingdom':
        return UK;
      case 'Australia':
        return Australia;
      case 'United States':
        return UnitedStates;
      case 'Pakistan':
        return Pakistan;
      default:
        return Sample;
    }
  };
  
  export default DashboardLocation;