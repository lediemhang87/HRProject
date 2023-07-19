import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Feature {
    sn: number,
    planName: string,
    features: string[],
    dateUpdated: string
}

interface FeatureProps {
    features: Feature[];
}
const SetFeaturesTable: React.FC<FeatureProps> = ({features}) => {

    

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;
    const [sortColumn, setSortColumn] = useState<keyof Feature>('sn');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handlePageClick = (pageIndex: number) => {
        setStartIndex((pageIndex - 1) * itemsPerPage);
    }

    const handleNext = () => {
        const nextIndex = startIndex + itemsPerPage;
        if (nextIndex < features.length) 
            setStartIndex(nextIndex);
    }

    const handlePrev = () => {
        const prevIndex = startIndex - itemsPerPage;
        if (prevIndex >= 0)
            setStartIndex (prevIndex)
    }
    const handleSort = (column: keyof Feature) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc')
        }
    }


    const sortedFeatures = [...features].sort((a,b) => {
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

    const totalPages = Math.ceil(sortedFeatures.length / itemsPerPage);
    const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
    const visibleFeatures = sortedFeatures.slice(startIndex, startIndex + itemsPerPage)
    return (
    <div>
        <div className="fw-semibold mb-4"> Set Website Prices & Features </div>
            <div className="bg-white rounded border mb-8">
                <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> 
                    <div className="mr-auto"> Set Default Prices  </div>
                    <div className=" background-orange rounded p-2"> + Add New Pricing </div>
                </div>
                <div className="p-4">
                    <div className="fw-semibold mb-10"> Plans Pricing <span className="text-danger">*</span></div>

                    <div className="d-flex justify-content-center mb-6">
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                        <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                            <option> 1 </option>
                            <option> 2 </option>
                        </select>
                        <button className=" background-orange p-3 rounded text-white"> Save </button>
                    </div>

                    <div className="d-flex justify-content-center mb-6">
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                        <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                            <option> 1 </option>
                            <option> 2 </option>
                        </select>
                        <button className=" background-orange p-3 rounded text-white"> Save </button>
                    </div>

                    <div className="d-flex justify-content-center mb-6">
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Name"/>
                        <input className='w-25 border mr-8 rounded p-3' placeholder="Plan Price"/>
                        <select className=' w-25 mr-16 border rounded p-3' placeholder="Frequency">
                            <option> 1 </option>
                            <option> 2 </option>
                        </select>
                        <button className=" background-orange p-3 rounded text-white"> Save </button>
                    </div>
                </div>

                
            </div>
   
                        
                        
        <div className="bg-white rounded border">
            <div className="fw-semibold border-bottom p-4 d-flex vertical-align "> 
                <div className="mr-auto"> Set Features  </div>
            </div>
            <div className="p-4">
                <div className="d-flex vertical-align mb-4">
                    <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedFeatures.length)} of {sortedFeatures.length} entries </div>
                
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
                                <th className="align-middle text-center" onClick={() => handleSort('planName')}> 
                                    Plan Name
                                    {sortColumn === 'planName' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                                </th>
                                <th className="align-middle text-center"> 
                                    Features
                                </th>
                                <th className="align-middle text-center" onClick={() => handleSort('dateUpdated')}> 
                                    dateUpdated
                                    {sortColumn === 'dateUpdated' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
                                </th>
                                <th className="align-middle text-center" > Action </th>
                            </tr>
                        </thead>
                        <tbody >
                            {visibleFeatures.map((feature, index) => (
                                <tr key={index}>
                                    <td className="align-middle text-center"> {feature.sn} </td>
                                    <td className="align-middle text-center"> {feature.planName} </td>
                                    <td className="align-middle"> 
                                        {feature.features.map((item, index) => (
                                            <span key={index}> {item},  </span>
                                        ))}
                                    </td>
                                    <td className="align-middle text-center"> {feature.dateUpdated} </td>
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
            </div>
        </div>
    )
}
export default SetFeaturesTable