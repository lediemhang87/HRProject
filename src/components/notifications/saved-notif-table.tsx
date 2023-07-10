import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Notif {
  sn: number;
  page:string;
  message: string;

}

interface SavedNotifTableProps {
  notifs: Notif[];
}

const SavedNotifTable: React.FC<SavedNotifTableProps> = ({notifs}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Notif>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
      };
    
      const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < notifs.length) {
          setStartIndex(nextIndex);
        }
      };
    
      const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0) {
          setStartIndex(prevIndex);
        }
      };
    
      const handleSort = (column: keyof Notif) => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(column);
          setSortOrder('asc');
        }
      };
        
        const sortedNotifs = [...notifs].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        // if (sortColumn === 'date') {
        //     const dateA = new Date(a.date);
        //     const dateB = new Date(b.date);
    
        //     if (dateA < dateB) {
        //     return sortOrder === 'asc' ? -1 : 1;
        //     }
        //     if (dateA > dateB) {
        //     return sortOrder === 'asc' ? 1 : -1;
        //     }
        //     return 0;
        // }

        if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

        const totalPages = Math.ceil(sortedNotifs.length / itemsPerPage);
        const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
        const visibleNotifs = sortedNotifs.slice(startIndex, startIndex + itemsPerPage);
        return (
            <div className=' background-white margin-top-20 padding-20 border'>
                <div className='font-weight-600 font-size-20 border-bottom'> Saved Notifications </div>

                <div className='vertical-align'>
                    <div className='margin-top-20 margin-bottom-20'>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedNotifs.length)} of {sortedNotifs.length} entries
                    </div>
                    <div className='choose-page '>
                        <button onClick={handlePrev} disabled={startIndex === 0}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => handlePageClick(i + 1)} disabled={currentPage === i + 1} className={currentPage === i + 1 ? 'active' : ''}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={handlePrev} disabled={startIndex === 0}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
    
                    </div>
                </div>
                <div className=' '>
                   <table className='width-100 grid-table'>
                     <thead className='background-pink'>
                       <tr>
                         <th onClick={() => handleSort('sn')}>
                           S/N {sortColumn === 'sn' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                         </th>
                         <th onClick={() => handleSort('page')}>
                           Page {sortColumn === 'page' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                         </th>
                         <th onClick={() => handleSort('message')}>
                           Message {sortColumn === 'message' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                         </th>
            
                         <th>
                           Action
                         </th>
            
            
                       </tr>
                     </thead>
            
                     <tbody>
                       {visibleNotifs.map((notif, index) => (
                        <tr key={index}>
                            <td> {notif.sn} </td>
                            <td>{notif.page}</td>
                            <td>${notif.message}</td>
                            <td> 
                                <FontAwesomeIcon className='margin-right-10'icon={faPenToSquare} />
                                <FontAwesomeIcon className='red' icon={faTrash} />
                            </td>
                            
                        </tr>
                       ))}
                     </tbody>
                   </table>
                </div>
                
            
       
                </div>
            );
};

export default SavedNotifTable;
