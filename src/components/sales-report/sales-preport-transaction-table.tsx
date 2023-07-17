import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
    id: number,
    transactionContent: string,
    userName: string,
    dateAndTime: string,
    amount: number,
    status: string
}

const SalesReportTransactionTable: React.FC = () => {

    const payrollTransactions = [
        {id: 1, transactionContent: 'March Salary', userName: 'Bonnie Green', dateAndTime: '04/23/2023', amount: 2300, status: 'Completed'},
        {id: 2, transactionContent: 'Tax Disbursement', userName: 'Bonnie Green', dateAndTime: '04/23/2023', amount: -670, status: 'Completed'},
        {id: 3, transactionContent: 'March Salary', userName: 'Louis & Louis', dateAndTime: '04/23/2023', amount: 234, status: 'Cancelled'},
        {id: 4, transactionContent: 'Tax Disbursement', userName: 'Louis & Louis', dateAndTime: '04/23/2023', amount: 5000, status: 'In progress'},
        {id: 5, transactionContent: 'March Salary', userName: 'Jese Leos', dateAndTime: '04/23/2023', amount: 2300, status: 'In progress'},
        {id: 6, transactionContent: 'Housing Disbursement', userName: 'Jese Leos', dateAndTime: '04/23/2023', amount: 280, status: 'Completed'},
    ]
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Transaction>('dateAndTime');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const roleClass: { [key: string]: string } = {
        'Completed' : 'background-lightgreen text-success',
        'Cancelled' : 'background-lightPink text-danger',
        'In progress': 'background-lightBlue text-darkblue'
      };
    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < payrollTransactions.length) 
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


    const sortedTransactions = [...payrollTransactions].sort((a,b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        
        if (sortColumn === 'dateAndTime') {
            const dateA = new Date(a.dateAndTime);
            const dateB = new Date(b.dateAndTime);
  
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
        <div className="border p-4 rounded shadow-sm bg-white mb-4"> 
            <div className="fw-bold"> Transactions </div>
            <div className="text-secondary text-xs mb-2"> This is a list of latest transaction</div>
            <div className=" ">
                <table className="table table-striped ">
                    <thead className="table-secondary ">
                        <tr> 
                            <th className="align-middle text-secondary  " onClick={() => handleSort('transactionContent')}> 
                                TRANSACTION
                                {sortColumn === 'transactionContent' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                        
                            <th className="align-middle text-secondary " onClick={() => handleSort('dateAndTime')}> 
                                DATE & TIME
                                {sortColumn === 'dateAndTime' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-secondary " onClick={() => handleSort('amount')}> 
                                AMOUNT
                                {sortColumn === 'amount' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-secondary " onClick={() => handleSort('status')}> 
                                STATUS
                                {sortColumn === 'status' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleTransactions.map((item, index) => (
                            <tr key={index}>
                                <td className="align-middle "> {item.transactionContent} by 
                                    <span className="fw-bold"> {item.userName} </span> </td>
                                <td className="align-middle text-secondary"> {item.dateAndTime} </td>
                                <td className="align-middle fw-semibold "> {item.amount < 0 ? '-' : ''}${Math.abs(item.amount)} </td>
                                <td className={`align-middle `}> 
                                    <div className={`${roleClass[item.status]} fit-content pl-3 pr-3 rounded fw-semibold`}>
                                        {item.status} 
                                    </div> 
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex vertical-align mb-4">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} entries </div>
            
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
export default SalesReportTransactionTable