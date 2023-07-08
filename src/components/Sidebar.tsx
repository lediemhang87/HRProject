import './styles.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faHouse, faUsers, faUsersRectangle, 
    faCalendarDays,faBusinessTime, faGear, faRightFromBracket, faPhoneVolume,
    faEnvelope, faUserGear, faUser, faCalendarCheck, faDollarSign, faSignsPost
} from '@fortawesome/free-solid-svg-icons'




function Sidebar(): JSX.Element {
    const [isSuperAdminPanelDropdownOpen, setIsSuperAdminPanelDropdownOpen] = useState(false);

    const toggleDropdownSuperAdminPanel = () => {
        setIsSuperAdminPanelDropdownOpen(!isSuperAdminPanelDropdownOpen);
    };
    return(
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li className="sidebar-item active">
                    
                    <a href="#" className="sidebar-link ">
                        <div className='font-awesome-icon active'> <FontAwesomeIcon className='icon ' icon={faHouse} /> Home </div>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon' onClick={toggleDropdownSuperAdminPanel}>
                                <FontAwesomeIcon className='icon' icon={faUsersRectangle} /> 
                                Super Admin Panel 
                                <FontAwesomeIcon className='icon right-arrow' icon={faAngleRight}/>     
                        </div>
                        
                    </a>
                </li>
                {isSuperAdminPanelDropdownOpen && (
                    <div className="super-admin-panel-dropdown-content">
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faEnvelope} />  Notifications </div>
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faUser} /> Manage Customers </div>
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faUserGear} /> Account Managers </div>
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faCalendarCheck} /> Account Manager Roles </div>
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faDollarSign} /> Set Website Procing </div>
                        <div className='sidebar-dropdown-item'> <FontAwesomeIcon className='icon' icon={faSignsPost} /> Set Payment Gateway </div>
                    </div>
                )}
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faCalendarDays} /> Payroll Report </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faBusinessTime} /> Sales Report </div>

                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> 
                            <FontAwesomeIcon className='icon' icon={faUsers} /> 
                            Teams
                            <FontAwesomeIcon className='icon right-arrow' icon={faAngleRight}/> 
                        </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faPhoneVolume} /> Contact Messsages </div>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faGear} /> Settings </div>
                        
                    </a>
                </li>
               
                <li className="logout-sidebar-item  ">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon logout '> <FontAwesomeIcon className='icon' icon={faRightFromBracket} /> Logout </div>
                    </a>
                </li>
            </ul>
      </div>
    )
}
export default Sidebar
