import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Role {
    sn: number,
    accountManagerRole: string,
    function: string,
    roles: string[],
    dateUpdated: string
}

interface RoleProps {
    roles: Role[];
}
const AccountManagerRolesTable: React.FC<RoleProps> = ({roles}) => {

    

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Role>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < roles.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof Role) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedRoles = [...roles].sort((a,b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (sortColumn === 'dateUpdated') {
            const dateA = new Date(a.dateUpdated);
            const dateB = new Date(b.dateUpdated);
  
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

    const totalPages = Math.ceil(sortedRoles.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleRoles = sortedRoles.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div > 
            <div className="d-flex vertical-align mb-4">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedRoles.length)} of {sortedRoles.length} entries </div>
            
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
                            <th className="align-middle text-center" onClick={() => handleSort('accountManagerRole')}> 
                                Account Manager Role
                                {sortColumn === 'accountManagerRole' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center"> 
                                Function
                            </th>
                            <th className="align-middle text-center" > 
                                Roles
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('dateUpdated')}> 
                                dateUpdated
                                {sortColumn === 'dateUpdated' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" > Action </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleRoles.map((role, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {role.sn} </td>
                                <td className="align-middle text-center"> {role.accountManagerRole} </td>
                                <td className="align-middle text-center"> {role.function} </td>
                                <td className="align-middle"> 
                                    {role.roles.map((item, index) => (
                                        <div key={index}> {item} </div>
                                    ))}
                                </td>
                                <td className="align-middle text-center"> {role.dateUpdated} </td>
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
export default AccountManagerRolesTable