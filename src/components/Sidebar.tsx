import './styles.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faHouse, faUsers, faUsersRectangle, 
    faCalendarDays,faBusinessTime, faGear, faRightFromBracket, faPhoneVolume,
    faEnvelope, faUserGear, faUser, faCalendarCheck, faDollarSign, faSignsPost
} from '@fortawesome/free-solid-svg-icons'


interface SidebarProps {
    activeItem: string;
  }
  
function Sidebar({ activeItem, }: SidebarProps): JSX.Element {
    const activeSuperAdminPanel = (activeItem == 'superAdminPanel') || (activeItem == 'manageCustomer') || (activeItem == 'accountManager')
                                || (activeItem == 'accountManagerRoles') || (activeItem == 'websitePricing') || (activeItem == 'paymentGateway');

    const [isSuperAdminPanelDropdownOpen, setIsSuperAdminPanelDropdownOpen] = useState(activeSuperAdminPanel);

    const toggleDropdownSuperAdminPanel = () => {
        setIsSuperAdminPanelDropdownOpen(!isSuperAdminPanelDropdownOpen);
    };

    const activeTeam = (activeItem == 'addNewTeamMember') || (activeItem == 'viewTeamMember');

    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(activeTeam);

    const toggleDropdownTeam = () => {
        setIsTeamDropdownOpen(!isTeamDropdownOpen);
    };
    
    return(
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li className={`sidebar-item ${activeItem === 'home' ? 'active' : ''}`}>
                    
                    <a href="/dashboard" className="sidebar-link ">
                        <div className={`sidebar-item-content `}> <FontAwesomeIcon className='icon ' icon={faHouse} /> Home </div>
                    </a>
                </li>
                <li className={`sidebar-item ${isSuperAdminPanelDropdownOpen || activeSuperAdminPanel ? 'active' : ''}`}>
                    <a href="#" className="sidebar-link">
                        <div className='sidebar-item-content' onClick={toggleDropdownSuperAdminPanel}>
                                <FontAwesomeIcon className='icon' icon={faUsersRectangle} /> 
                                Super Admin Panel 
                                <FontAwesomeIcon className='icon right-arrow' icon={faAngleRight}/>     
                        </div>
                        
                    </a>
                </li>

                {/* superAdminPanel */}
                {isSuperAdminPanelDropdownOpen && (
                    <div className="super-admin-panel-dropdown-content ">
                        <a href="/superadminpanel/notification" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'superAdminPanel' ? 'active' : ''}`}> 
                            <FontAwesomeIcon className='icon' icon={faEnvelope} />  
                            Notifications </div>
                        </a>

                        <a href="/superadminpanel/manage-customer" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'manageCustomer' ? 'active' : ''}`}> 
                                <FontAwesomeIcon className='icon' icon={faUser} /> 
                                Manage Customers 
                            </div>
                        </a>
                        <a href="/superadminpanel/account-manager" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'accountManager' ? 'active' : ''}`}> 
                                <FontAwesomeIcon className='icon' icon={faUserGear} /> 
                                Account Managers 
                            </div>
                        </a>
                        <a href="/superadminpanel/account-manage-roles" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'accountManagerRoles' ? 'active' : ''}`}> 
                                <FontAwesomeIcon className='icon' icon={faCalendarCheck} /> 
                                Account Manager Roles 
                            </div>
                        </a>
                        <a href="/superadminpanel/website-pricing" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'websitePricing' ? 'active' : ''}`} > 
                                <FontAwesomeIcon className='icon' icon={faDollarSign} /> 
                                Set Website Pricing 
                            </div>
                        </a>
                        
                        <a href="/superadminpanel/payment-gateway" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'paymentGateway' ? 'active' : ''}`}> <FontAwesomeIcon className='icon' icon={faSignsPost} /> 
                                Set Payment Gateway 
                            </div>
                        </a>
                    </div>
                )}
                <li className={`sidebar-item ${activeItem === 'payrollReport' ? 'active' : ''}`}>
                    <a href="/payrollReport" className="sidebar-link">
                        <div className='sidebar-item-content'> <FontAwesomeIcon className='icon' icon={faCalendarDays} /> Payroll Report </div>
                        
                    </a>
                </li>
                <li className={`sidebar-item ${activeItem === 'salesReport' ? 'active' : ''}`}>
                    <a href="/salesReport" className="sidebar-link">
                        <div className='sidebar-item-content'> <FontAwesomeIcon className='icon' icon={faBusinessTime} /> Sales Report </div>

                    </a>
                </li>
                <li className={`sidebar-item ${isTeamDropdownOpen || activeTeam ? 'active' : ''}`}>
                    <a href="#" className="sidebar-link" >
                        <div className='sidebar-item-content' onClick={toggleDropdownTeam}> 
                            <FontAwesomeIcon className='icon' icon={faUsers} /> 
                            Teams
                            <FontAwesomeIcon className='icon right-arrow' icon={faAngleRight}/> 
                        </div>
                        
                    </a>
                </li>

                {isTeamDropdownOpen && (
                    <div className="super-admin-panel-dropdown-content ">
                        <a href="/team/addNewTeamMember" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'addNewTeamMember' ? 'active' : ''}`}> 
                            <FontAwesomeIcon className='icon' icon={faEnvelope} />  
                            Add New Team Member </div>
                        </a>

                        <a href="/team/viewTeamMember" className="sidebar-link">
                            <div className={`sidebar-dropdown-item ${activeItem === 'viewTeamMember' ? 'active' : ''}`}> 
                                <FontAwesomeIcon className='icon' icon={faUser} /> 
                                View Team Member
                            </div>
                        </a>
                      
                    </div>
                )}
                <li className={`sidebar-item ${activeItem === 'contactMessages' ? 'active' : ''}`}>
                    <a href="/contactMessages" className="sidebar-link">
                        <div className='sidebar-item-content'> <FontAwesomeIcon className='icon' icon={faPhoneVolume} /> Contact Messsages </div>
                    </a>
                </li>
                <li className={`sidebar-item ${activeItem === 'settings' ? 'active' : ''}`}>
                    <a href="/settings" className="sidebar-link">
                        <div className='sidebar-item-content'> <FontAwesomeIcon className='icon' icon={faGear} /> Settings </div>
                        
                    </a>
                </li>
               
                <li className="logout-sidebar-item  ">
                    <a href="/" className="sidebar-link">
                        <div className='sidebar-item-content logout '> <FontAwesomeIcon className='icon' icon={faRightFromBracket} /> Logout </div>
                    </a>
                </li>
            </ul>
      </div>
    )
}
export default Sidebar
