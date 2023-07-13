import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles3.scss'

interface Transaction {
  source: string;
  date:string;
  amount: number;
  txnType: string;
  status: string;
}

interface TransactionsProps {
  transactions: Transaction[];
}

const DashboardLatestTransaction: React.FC<TransactionsProps> = ({transactions}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 7;
    const [sortColumn, setSortColumn] = useState<keyof Transaction>('source');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
      };
    
    const handleNext = () => {
      const nextIndex = startIndex + itemsPerPage;
      if (nextIndex < transactions.length) {
        setStartIndex(nextIndex);
      }
    };
    
    const handlePrev = () => {
      const prevIndex = startIndex - itemsPerPage;
      if (prevIndex >= 0) {
        setStartIndex(prevIndex);
      }
    };
  
    const handleSort = (column: keyof Transaction) => {
      if (sortColumn === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortOrder('asc');
      }
    };
        
    const sortedTransactions = [...transactions].sort((a, b) => {
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
      return 0;
    });

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);
    return (
      <div className='latest-transaction'>
          <div className="title">

            <div className='title-name'> Latest Transaction </div>
              <div className='sort'> Sort by: 
                  <select id="mySelect">
                    <option value="option1">Today</option>
                    <option value="option2">This Month</option>
                    <option value="option3">This quarter</option>
                  </select>
              </div>
            </div>

            <div className='table-container'>
              <table>
                <thead className='table-title'>
                  <tr>
                    <th onClick={() => handleSort('source')}>
                      Source {sortColumn === 'source' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                    <th onClick={() => handleSort('date')}>
                      Date {sortColumn === 'date' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                    <th onClick={() => handleSort('amount')}>
                      Amount {sortColumn === 'amount' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </th>
      
                    <th onClick={() => handleSort('txnType')}>
                      Txn Type {sortColumn === 'txnType' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </th>
      
                    <th onClick={() => handleSort('status')}>
                      Status {sortColumn === 'status' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </th>
      
      
                  </tr>
                </thead>
      
                <tbody>
                  {visibleTransactions.map((transaction, index) => (
                    <tr key={index}>
                        <td className='source'>
                            <div className='d-flex'>
                                <img src={`https://xsgames.co/randomusers/assets/avatars/male/0.jpg`} className="normal-avatar"/>
                                {transaction.source}
                            </div>
                        </td>

                        <td className='date'>
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>

                        <td className='amount'>
                          ${transaction.amount}
                        </td>

                        <td className='txntype'> 
                          {transaction.txnType} 
                        </td>
                        
                        <td>
                            <div className={transaction.status}>
                                {transaction.status}
                            </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

                    <button onClick={handlePrev} disabled={currentPage === totalPages}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        
    
        </div>
      );
};

export default DashboardLatestTransaction;
