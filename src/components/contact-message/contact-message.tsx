import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Contact {
    sn: number,
    email: string,
    message: string[],
    name: string,
    date: string,
}


const ContactMessagesDiv: React.FC = () => {
    const contacts = [
        {sn: 1, email: 'jsx@gmail.com', message: ['Manage Customers', 'Manage Resellers', 'Payment History', 'SMS Delivery Reports', 'Voice Delivery Reports'], name: 'Seun Adeyemi', date: '03/09/2020' },
        {sn: 2, email: 'jsx@gmail.com' , message: ['Manage Customers', 'Manage Resellers', 'Payment History'], name: 'Seun Adeyemi', date: '03/09/2020' },
        {sn: 3, email: 'jsx@gmail.com', message: ['Manage Customers', 'Manage Resellers', 'Payment History'], name: 'Seun Adeyemi', date: '03/09/2020' },
        {sn: 4, email: 'jsx@gmail.com', message: ['Manage Customers', 'Manage Resellers', 'Payment History'], name: 'Seun Adeyemi', date: '03/09/2020' },  
    ]
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Contact>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < contacts.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof Contact) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedContact = [...contacts].sort((a,b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (sortColumn === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
  
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

    const totalPages = Math.ceil(sortedContact.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleContacts = sortedContact.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div className="bg-white border rounded "> 
            <div className="p-4 border-bottom fw-bold text-lg"> Contacts </div>
            <div className="p-4">
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
                            
                            <th className="align-middle text-center"  > 
                                Message
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('name')}> 
                                Name
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('date')}> 
                                Date
                                {sortColumn === 'date' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody >
                        {visibleContacts.map((item, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {item.sn} </td>
                                <td className="align-middle text-center"> {item.email} </td>
                                
                                <td className="align-middle"> 
                                    {item.message.map((item, index) => (
                                        <span key={index}> {item},  </span>
                                    ))}
                                </td>
                                <td className="align-middle text-center"> {item.name} </td>
                                <td className="align-middle text-center"> {item.date} </td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex vertical-align mb-4 pl-6">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedContact.length)} of {sortedContact.length} entries </div>
            
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
export default ContactMessagesDiv