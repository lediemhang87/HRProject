import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Manager {
    sn: number,
    accountManager: string
    dateAdded: string,
    role: string
}

interface ManagerProps {
    managers: Manager[];
}
const AccountManagerTable: React.FC<ManagerProps> = ({managers}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Manager>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const roleClass: { [key: string]: string } = {
        'Technical Support': 'btn btn-success',
        'Admin': 'btn btn-danger',
        'Customer Support': 'btn btn-warning',
        'Developer': 'btn btn-primary'
      };
    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < managers.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof Manager) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedManagers = [...managers].sort((a,b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (sortColumn === 'dateAdded') {
            const dateA = new Date(a.dateAdded);
            const dateB = new Date(b.dateAdded);
  
            if (dateA < dateB) {
            return sortOrder === 'asc' ? -1 : 1;
            }
            if (dateA > dateB) {
            return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        }

        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0
    })

    const totalPages = Math.ceil(sortedManagers.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleManagers = sortedManagers.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div > 
            <div className="d-flex vertical-align mb-4">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedManagers.length)} of {sortedManagers.length} entries </div>
            
                <div className="choose-page">
                    <button onClick={handlePrev}  disabled={currentPage === 0}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                    {Array.from ({length: totalPages} , (_,i) => (
                        <button key={i} onClick = {() => handlePageClick(i+1)} disabled={currentPage === i+1} className={currentPage === i+1 ? 'active' : ''} >
                            {i+1}
                        </button>
                    ))}

                    <button onClick={handleNext}  disabled={currentPage === totalPages}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </button>
                        
                </div>
            </div>
            <div >
                <table className="table table-bordered table-hover ">
                    <thead className="table-danger ">
                        <tr> 
                            <th className="align-middle text-center" onClick={() => handleSort('sn')}> 
                                S/N 
                                {sortColumn === 'sn' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('accountManager')}> 
                                Account Manager
                                {sortColumn === 'accountManager' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                        
                            <th className="align-middle text-center" onClick={() => handleSort('dateAdded')}> 
                                Date Added
                                {sortColumn === 'dateAdded' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('role')}> 
                                Role
                                {sortColumn === 'role' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" > Action </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleManagers.map((manager, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {manager.sn} </td>
                                <td className="align-middle text-center"> {manager.accountManager} </td>
                                <td className="align-middle text-center"> {manager.dateAdded} </td>

                                <td className={`align-middle`}>
                                    <div className={`${roleClass[manager.role]}`}>
                                     {manager.role}
                                    </div>
                                    
                                </td>
                                <td className="align-middle text-center"> 
                                    <FontAwesomeIcon className="mr-4" icon={faPenToSquare}/> 
                                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}
export default AccountManagerTable