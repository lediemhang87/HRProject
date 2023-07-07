import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


function Sidebar(): JSX.Element {
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
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faBriefcase} /> My Jobs </div>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faUsers} /> Manage Candidates </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faMessage} /> Interviews </div>

                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faChartColumn} /> My projects </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faQuestionCircle} /> Talent Request </div>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faBuilding} /> Skill Center </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faListCheck} /> HR Center </div>
                        
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                        <div className='font-awesome-icon'> <FontAwesomeIcon className='icon' icon={faUser} /> Profile </div>
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
