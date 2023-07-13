// {employeeId: '1001', employeeName: 'Ricky Antony', role: 'Web Designer', email:'abc@gmail.com', contact:'+234 802345 094', lastLogged: '08/09/2023 10:02', action: 'Checked User Account', status: 'Active'},
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles3.scss'

interface Log {
  employeeId: string,
  employeeName:string,
  role: string,
  email: string,
  contact: string,
  lastLogged: string,
  action: string;
  status: string;
}

interface LogProps {
  logs: Log[];
}

const DashboardUserLog: React.FC<LogProps> = ({logs}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Log>('employeeId');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    };
    
    const handleNext = () => {
      const nextIndex = startIndex + itemsPerPage;
      if (nextIndex < logs.length) {
        setStartIndex(nextIndex);
      }
    };
  
    const handlePrev = () => {
      const prevIndex = startIndex - itemsPerPage;
      if (prevIndex >= 0) {
        setStartIndex(prevIndex);
      }
    };
  
    const handleSort = (column: keyof Log) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortOrder('asc');
      }
    };
      
    const sortedTransactions = [...logs].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (sortColumn === 'lastLogged') {
          const dateA = new Date(a.lastLogged);
          const dateB = new Date(b.lastLogged);

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
      return 0;
    });

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className='user-log'>
            <div className="title">
                <div className='title-name'> Latest Transaction </div>
            </div>

            <div className='table-container'>
                <table>
                  <thead className='table-title'>
                    <tr>
                      <th onClick={() => handleSort('employeeId')}>
                        Employee ID {sortColumn === 'employeeId' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>
                      <th onClick={() => handleSort('employeeName')}>
                        Employee Name {sortColumn === 'employeeName' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>
                      <th onClick={() => handleSort('role')}>
                        Role {sortColumn === 'role' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>
        
                      <th onClick={() => handleSort('email')}>
                        Email {sortColumn === 'email' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>
        
                      <th onClick={() => handleSort('contact')}>
                        Contact {sortColumn === 'contact' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>

                      <th onClick={() => handleSort('lastLogged')}>
                        Last Logged {sortColumn === 'lastLogged' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>

                      <th onClick={() => handleSort('action')}>
                        Action {sortColumn === 'status' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>

                      <th onClick={() => handleSort('status')}>
                        Status {sortColumn === 'status' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </th>
                    </tr>
                  </thead>
        
                  <tbody>
                    {visibleTransactions.map((log, index) => (
                    <tr key={index}>
                        <td className='employeeId'>{log.employeeId}</td>
                        <td className='employeeName'>
                            <div className='d-flex'>
                                <img
                                    src={`https://xsgames.co/randomusers/assets/avatars/male/${Number(log.employeeId)%1000}.jpg`}
                                    alt={`Avatar ${log.employeeId + 1}`}
                                    className="normal-avatar"
                                />
                                {log.employeeName}
                            </div>
                        </td>
                        <td className='role'>{log.role}</td>
                        <td className='email'>{log.email}</td>
                        <td className='contact'>{log.contact}</td>
                        <td className='lastLogged'>{new Date(log.lastLogged).toLocaleDateString()} {new Date(log.lastLogged).toLocaleTimeString()}</td>
                        <td className='action'> {log.action} </td>
                        <td>
                            <div className={log.status}>
                                {log.status}
                            </div>
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            {/* Choose page option */}
            <div className='d-flex align-items-center'>
                <div>
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} entries
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
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
    
                </div>
            </div>
      
          </div>
        );
};

export default DashboardUserLog;
