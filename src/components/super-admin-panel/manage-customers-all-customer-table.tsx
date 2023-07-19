import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faAngleLeft, faAngleRight, faSave } from "@fortawesome/free-solid-svg-icons";

interface Customer {
  sn: number,
  companyName: string,
  balance: number,
  dateCreated: string,
  lastLogin: string,
  currentPackage: string,
  fundOrDebit: string,
  customerID: string, 
  firstName: string, 
  lastName: string,
  companySub: string,
  email: string,
  phoneNumber: string,
  noOfEmployee: number,
  accountStatus: string,
  nextBilling: string,
  naira: number,
  usd: number,
  gbp: number,
  virtualAccountNo: string,
}

interface AllCustomerProps {
  customersData: Customer[];
}

const ManageCustomerAllCustomerTable: React.FC<AllCustomerProps> = ({ customersData }) => {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [editableCustomer, setEditableCustomer] = useState<Customer | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Customer>('sn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editedCustomer, setEditedCustomer] = useState<Partial<Customer>>({});
  const navigate = useNavigate();

  const handleRowClick = (customer: Customer) => {
    const url = `/superadminpanel/manage-customer/${String(customer.customerID)}`;
    navigate(url);
  };

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  }

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < customers.length)
      setStartIndex(nextIndex);
  }

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0)
      setStartIndex(prevIndex)
  }

  const handleSort = (column: keyof Customer) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc')
    }
  }

  const handleEdit = (customer: Customer) => {
   
    setEditableCustomer(customer);
    const customerToEdit = customers.find((item) => item.sn === customer.sn);
    if (customerToEdit) {
      setEditedCustomer(customerToEdit);
    }
  };
  
  const handleDelete = (customer: Customer) => {
    // Implement logic to delete the customer
    const updatedCustomers = customers.filter(
      (c) => c.customerID !== customer.customerID
    );
    setCustomers(updatedCustomers);
  };

  const handleSave = (customer: Customer) => {
    if (!editedCustomer.companyName || !editedCustomer.balance || !editedCustomer.currentPackage ) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    const updatedCustomers = customers.map((c) => {
      if (c.sn === customer.sn) {
        return { ...c, ...editedCustomer };
      }
      return c;
    });
  
    setCustomers(updatedCustomers);
    setEditableCustomer(null);
    setEditedCustomer({});
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortColumn === 'dateCreated') {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);

      if (dateA < dateB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    }

    if (sortColumn === 'lastLogin') {
      const dateA = new Date(a.lastLogin);
      const dateB = new Date(b.lastLogin);

      if (dateA < dateB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    }

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

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div >
      <div className="d-flex vertical-align mb-4">
        <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedCustomers.length)} of {sortedCustomers.length} entries </div>

        <div className="choose-page">
          <button onClick={handlePrev} disabled={currentPage === 0}>
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
      <div >
        <table className="table table-bordered table-hover ">
          <thead className="table-danger ">
            <tr>
              <th className="align-middle text-center" onClick={() => handleSort('sn')}>
                S/N
                {sortColumn === 'sn' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle" onClick={() => handleSort('companyName')}>
                Company Name
                {sortColumn === 'companyName' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle" onClick={() => handleSort('balance')}>
                Balance
                {sortColumn === 'balance' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle" onClick={() => handleSort('dateCreated')}>
                Date Created
                {sortColumn === 'dateCreated' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle" onClick={() => handleSort('lastLogin')}>
                Last Login
                {sortColumn === 'lastLogin' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle text-center" onClick={() => handleSort('currentPackage')}>
                Current Package
                {sortColumn === 'currentPackage' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle text-center" onClick={() => handleSort('fundOrDebit')}>
                Fund Or Debit
                {sortColumn === 'fundOrDebit' && <span> {sortOrder === 'asc' ? '▲' : '▼'} </span>}
              </th>
              <th className="align-middle text-center"> Edit Profile </th>
              <th className="align-middle text-center"> Action </th>
            </tr>
          </thead>
          <tbody>
            {visibleCustomers.map((customer, index) => (
              <tr key={index}>
                <td className="align-middle text-center"> {customer.sn} </td>
                {editableCustomer && editableCustomer.sn === customer.sn ? (
                    <td className="align-middle cursor-pointer link-dark">
                        <input
                        className="w-100 border p-2"
                        value={editedCustomer.companyName || ''}
                        onChange={(e) =>
                            setEditedCustomer({ ...editedCustomer, companyName: e.target.value })
                        }
                        />
                    </td>
                ) : (
                    <td
                        className="align-middle cursor-pointer link-dark"
                        onClick={() => handleRowClick(customer)}
                    >
                    {customer.companyName}
                </td>
                )}
                <td className="align-middle">  
                {editableCustomer && editableCustomer.sn === customer.sn ? (
                     <input
                     className="w-100 border p-2"
                     value={editedCustomer.balance || ''}
                     onChange={(e) =>
                         setEditedCustomer({ ...editedCustomer, balance: Number(e.target.value) })
                     }
                     />
                ) : (
                    <span> {customer.balance} </span>
                )}
                </td>
                <td className="align-middle"> {customer.dateCreated} </td>
                <td className="align-middle"> {customer.lastLogin} </td>
                <td className="align-middle text-center">
                {editableCustomer && editableCustomer.sn === customer.sn ? (
                    <select
                    className="w-100 border p-2"
                    value={editedCustomer.currentPackage || ''}
                    onChange={(e) =>
                    setEditedCustomer({ ...editedCustomer, currentPackage: e.target.value }) }>
                        <option value="Essential">Essential</option>
                        <option value="Boost">Boost</option>
                        <option value="Perform">Perform</option>
                    </select>
                ) : (
                    <span> {customer.currentPackage}  </span>
                ) }
                 </td>
                <td className="align-middle text-center">
                  <div className={`${customer.fundOrDebit === 'fund-or-debit' ? 'btn btn-danger' : ''}`}>
                    {customer.fundOrDebit === 'fund' ? 'Fund' : ''}
                    {customer.fundOrDebit === 'debit' ? 'Debit' : ''}
                    {customer.fundOrDebit === 'fund-or-debit' ? 'Fund/Debit' : ''}
                  </div>
                </td>



                <td className="align-middle text-center">
                {editableCustomer && editableCustomer.sn === customer.sn ? (
                  <FontAwesomeIcon icon={faSave} onClick={() => handleSave(customer)} />
                ) : 
                   <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(customer)} />
                }
                </td>
                <td className="text-danger align-middle text-center">
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(customer)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCustomerAllCustomerTable;
