import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../styles3.scss';

interface Transaction {
  source: string;
  date: string;
  amount: number;
  txnType: string;
  status: string;
}

const DashboardLatestTransaction: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 7;
  const [sortColumn, setSortColumn] = useState<keyof Transaction>('source');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedFilter, setSelectedFilter] = useState<'today' | 'thisMonth' | 'thisQuarter'>('today');

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < filteredTransactions.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as 'today' | 'thisMonth' | 'thisQuarter');
    setStartIndex(0);
  };

  const filterTransactions = (filter: string): Transaction[] => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    const ninetyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);

    if (filter === 'today') {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.toDateString() === today.toDateString();
      });
    }

    if (filter === 'thisMonth') {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= thirtyDaysAgo && transactionDate <= today;
      });
    }

    if (filter === 'thisQuarter') {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= ninetyDaysAgo && transactionDate <= today;
      });
    }

    return transactions;
  };

  const transactions: Transaction[] = [
    { source: 'Hydratech Soft.', date: '07/15/2023', amount: 5.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Locus & Locus', date: '07/15/2023', amount: 5.99, txnType: 'Sub', status: 'Failed' },
    { source: 'XYZ Intl.', date: '07/01/2023', amount: 10.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Lendsqr Ltd', date: '07/01/2023', amount: 10.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Esya Inc', date: '07/01/2023', amount: 5.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Flutterwave', date: '07/01/2023', amount: 5.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Cynergy Tech.', date: '07/01/2023', amount: 5.99, txnType: 'Sub', status: 'Completed' },
    { source: 'ABC Corporation', date: '07/15/2023', amount: 8.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Acme Ltd', date: '07/15/2023', amount: 7.99, txnType: 'Sub', status: 'Failed' },
    { source: 'XYZ Corp', date: '07/05/2023', amount: 12.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company A', date: '07/08/2023', amount: 9.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company B', date: '07/10/2023', amount: 6.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Company C', date: '07/11/2023', amount: 11.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company D', date: '07/12/2023', amount: 7.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company E', date: '07/14/2023', amount: 8.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Company F', date: '07/17/2023', amount: 9.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company G', date: '04/18/2023', amount: 6.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Company H', date: '04/19/2023', amount: 11.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company I', date: '05/22/2023', amount: 7.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company J', date: '06/25/2023', amount: 8.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Company K', date: '07/01/2023', amount: 12.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company L', date: '06/05/2023', amount: 9.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company M', date: '05/10/2023', amount: 6.99, txnType: 'Sub', status: 'Failed' },
    { source: 'Company N', date: '05/15/2023', amount: 11.99, txnType: 'Sub', status: 'Completed' },
    { source: 'Company O', date: '05/20/2023', amount: 7.99, txnType: 'Sub', status: 'Completed' },
  ];

  const filteredTransactions = filterTransactions(selectedFilter);

  const handleSort = (column: keyof Transaction) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    setStartIndex(0)
  };
      
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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
    <div className="latest-transaction">
      <div className="title">
        <div className="title-name">Latest Transaction</div>
        <div className="sort">
          Filter By:
          <select className="p-2" id="mySelect" value={selectedFilter} onChange={handleFilterChange}>
            <option value="today">Today</option>
            <option value="thisMonth">This Month</option>
            <option value="thisQuarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead className="table-title">
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
                <td className="source">
                  <div className="d-flex">
                    <img src={`https://xsgames.co/randomusers/assets/avatars/male/0.jpg`} className="normal-avatar" />
                    {transaction.source}
                  </div>
                </td>

                <td className="date">{new Date(transaction.date).toLocaleDateString()}</td>

                <td className="amount">${transaction.amount}</td>

                <td className="txntype">{transaction.txnType}</td>

                <td>
                  <div className={transaction.status}>{transaction.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center">
        <div>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
        </div>

        <div className="choose-page ">
          <button onClick={handlePrev} disabled={startIndex === 0}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              disabled={currentPage === i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
            >
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

export default DashboardLatestTransaction;
