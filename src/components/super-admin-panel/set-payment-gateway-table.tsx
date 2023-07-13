import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PaymentSetting {
    sn: number,
    name: string
    apiKey: string,
    service: string,
    status: string
}

interface PaymentSettingProps {
    paymentSettings: PaymentSetting[];
}
const SetPaymentGateWayTable: React.FC<PaymentSettingProps> = ({paymentSettings}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof PaymentSetting>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const statusClass: { [key: string]: string } = {
        'Activated': 'btn btn-success',
        'Deactivated': 'btn btn-secondary',
    };
    
    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < paymentSettings.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof PaymentSetting) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedSettings = [...paymentSettings].sort((a,b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];


        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0
    })

    const totalPages = Math.ceil(sortedSettings.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleSettings = sortedSettings.slice(startIndex, startIndex + itemsPerPage)
    return (
        <div > 
            <div className="d-flex vertical-align mb-4">
                <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedSettings.length)} of {sortedSettings.length} entries </div>
            
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
                            <th className="align-middle text-center" onClick={() => handleSort('name')}> 
                                Name
                                {sortColumn === 'name' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                        
                            <th className="align-middle text-center" onClick={() => handleSort('apiKey')}> 
                                API KEY
                                {sortColumn === 'apiKey' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('service')}> 
                                Service
                                {sortColumn === 'service' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" onClick={() => handleSort('status')}> 
                                Status
                                {sortColumn === 'status' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                            </th>
                            <th className="align-middle text-center" > Action </th>
                        </tr>
                    </thead>
                    <tbody >
                        {visibleSettings.map((setting, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center"> {setting.sn} </td>
                                <td className="align-middle text-center"> {setting.name} </td>
                                <td className="align-middle text-center"> {setting.apiKey} </td>
                                <td className="align-middle text-center"> {setting.service} </td>

                                <td className={`align-middle text-center`}>
                                    <div className={`${statusClass[setting.status]}`}>
                                     {setting.status}
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
export default SetPaymentGateWayTable