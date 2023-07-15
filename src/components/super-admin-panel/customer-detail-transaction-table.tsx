import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
    sn: number,
    date: string,
    amount: number,
    purpose: string
}

interface TransactionProps {
    transactions: Transaction[];
}
const CustomerDetailTransactionTable: React.FC<TransactionProps> = ({transactions}) => {

    

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Transaction>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < transactions.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof Transaction) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedTransactions = [...transactions].sort((a,b) => {
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

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div > 
            
            <div >
                <table className="table table-bordered table-hover ">
                    <thead className="table-secondary ">
                        <tr> 
                            <th className="align-middle text-center" onClick={() => handleSort('sn')}> 
                                S/N 
                                {sortColumn === 'sn' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>

                            <th className="align-middle text-center" onClick={() => handleSort('date')}> 
                                Date
                                {sortColumn === 'date' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('amount')}> 
                                Amount
                                {sortColumn === 'amount' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('purpose')}> 
                                Purpose
                                {sortColumn === 'purpose' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {transaction.sn} </td>
                                <td className="align-middle text-center"> {transaction.date} </td>
                                <td className="align-middle text-center"> {transaction.amount} </td>
                                <td className="align-middle text-center"> {transaction.purpose} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            <div className="d-flex vertical-align mb-4">
                <div className=" d-flex mr-auto">
                    <div className="vertical-align"> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} entries </div>
            
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
                

                <div className="background-orange text-white p-2 rounded"> Download </div>
            </div>

        </div>
    )
}
export default CustomerDetailTransactionTable