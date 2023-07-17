import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface TeamMember {
    sn: number,
    email: string,
    role: string,
    status: string,
    dateAdded: string,
}


const TeamsViewTeamMember: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof TeamMember>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const teamMembers = [
        {sn: 1, email: 'jxy@email.com', role: 'Manager', status: 'Active', dateAdded: '03/09/1990'},
        {sn: 2, email: 'jxyz@email.com', role: 'Manager', status: 'Inactive', dateAdded: '03/09/1990'},
        {sn: 3, email: 'xyz@email.com', role: 'Manager', status: 'Active', dateAdded: '03/09/1990'},
        {sn: 4, email: 'xy@email.com', role: 'Manager', status: 'Inactive', dateAdded: '03/09/1990'},
    ]
    const statusClass: { [key: string]: string } = {
        'Active': 'btn btn-success',
        'Inactive': 'btn btn-danger',
      };

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < teamMembers.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof TeamMember) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedTeamMembers = [...teamMembers].sort((a,b) => {
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

    const totalPages = Math.ceil(sortedTeamMembers.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleTeamMembers = sortedTeamMembers.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div className="bg-white rounded border shadow-sm"> 
            <div className="p-4 border-bottom fw-bold text-lg"> Add Mew Team Members </div>
            <div className="p-4" >
                <table className="table table-bordered table-hover ">
                    <thead className="table-danger ">
                        <tr> 
                            <th className="align-middle text-center" onClick={() => handleSort('sn')}> 
                                S/N 
                                {sortColumn === 'sn' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('email')}> 
                                Email
                                {sortColumn === 'email' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('role')}> 
                                Role
                                {sortColumn === 'role' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('status')}> 
                                Status
                                {sortColumn === 'status' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('dateAdded')}> 
                                Date Added
                                {sortColumn === 'dateAdded' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            
                            <th className="align-middle text-center" > Action </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleTeamMembers.map((item, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {item.sn} </td>
                                <td className="align-middle text-center"> {item.email} </td>
                                <td className="align-middle text-center"> {item.role} </td>
                                
                                <td className={`align-middle text-center`}>
                                    <div className={`${statusClass[item.status]}`}>
                                     {item.status}
                                    </div>
                                    
                                </td>
                                <td className="align-middle text-center"> {item.dateAdded} </td>
                                <td className="align-middle text-center"> 
                                    <FontAwesomeIcon className="mr-4" icon={faPenToSquare}/> 
                                    <FontAwesomeIcon className="text-danger" icon={faTrash} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="d-flex vertical-align pl-6 pb-4">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedTeamMembers.length)} of {sortedTeamMembers.length} entries </div>
            
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

        </div>
    )
}
export default TeamsViewTeamMember