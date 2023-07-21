import { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faAngleLeft,
  faAngleRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

interface Manager {
  sn: number;
  accountManager: string;
  dateAdded: string;
  role: string;
}

interface ManagerProps {
  managersData: Manager[];
}
const AccountManagerTable: React.FC<ManagerProps> = ({ managersData }) => {
  const [managers, setManagers] = useState<Manager[]>(managersData || []);
  const [editableManager, setEditableManager] = useState<Manager | null>(null);
  const [editedManager, setEditedManager] = useState<Partial<Manager>>({});
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Manager>("sn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddingManager, setIsAddingManager] = useState(false);

  const openAddManagerModal = () => {
    setIsAddingManager(true);
  };
  const closeAddManagerModal = () => {
    setIsAddingManager(false);
  };

  const roleClass: { [key: string]: string } = {
    "Technical Support": "btn btn-success",
    Admin: "btn btn-danger",
    "Customer Support": "btn btn-warning",
    Developer: "btn btn-primary",
  };
  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < managers.length) setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) setStartIndex(prevIndex);
  };
  const handleSort = (column: keyof Manager) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleEdit = (manager: Manager) => {
    setEditableManager(manager);
    const managerToEdit = managers.find((item) => item.sn === manager.sn);
    if (managerToEdit) {
      setEditedManager(managerToEdit);
    }
  };

  const handleDelete = (manager: Manager) => {
    // Implement logic to delete the customer
    const updatedCustomers = managers.filter((c) => c.sn !== manager.sn);
    setManagers(updatedCustomers);
  };

  const handleSave = (manager: Manager) => {
    if (!editedManager.accountManager || !editedManager.role) {
      alert("Please fill in all the required fields.");
      return;
    }

    const updatedManager = managers.map((c) => {
      if (c.sn === manager.sn) {
        return { ...c, ...editedManager };
      }
      return c;
    });

    setManagers(updatedManager);
    setEditableManager(null);
    setEditedManager({});
  };

  const sortedManagers = [...managers].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === "dateAdded") {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);

      if (dateA < dateB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleAddManager = (
    accountManager: string | undefined,
    role: string | undefined
  ) => {
    if (!accountManager || !role) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newManager: Manager = {
      sn: managers.length + 1,
      accountManager: accountManager,
      dateAdded: new Date().toISOString(),
      role: role,
    };

    setManagers([...managers, newManager]);
    setStartIndex(0);
    setIsAddingManager(false);
    setEditableManager(null);
    setEditedManager({});
  };
  const totalPages = Math.ceil(sortedManagers.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleManagers = sortedManagers.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <div className="fw-semibold mb-4"> Managers </div>
      <div className="bg-white rounded border">
        <div className="fw-semibold border-bottom p-4 d-flex vertical-align ">
          <div className="mr-auto"> Account Managers </div>
          <div
            className=" background-orange rounded p-2 cursor-pointer"
            onClick={openAddManagerModal}
          >
            + Add Account Manager
          </div>
        </div>
        <div className="p-4">
          <div className="d-flex vertical-align mb-4">
            <Modal
              isOpen={isAddingManager}
              onRequestClose={closeAddManagerModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent dark background
                  zIndex: 1000,
                },
                content: {
                  border: "none",
                  backgroundColor: "white",
                  maxWidth: "500px",
                  height: "fit-content",
                  margin: "auto",
                  marginTop: "auto",
                },
              }}
            >
              <div>
                <div className="text-lg fw-bold border-bottom">
                  Add Account Manager
                </div>
                <label className="mt-2 fw-semibold"> Name:</label>
                <br />
                <input
                  className="border w-100 mt-2 rounded"
                  type="text"
                  placeholder="Input manager name"
                  value={editedManager.accountManager || ""}
                  onChange={(e) =>
                    setEditedManager({
                      ...editedManager,
                      accountManager: e.target.value,
                    })
                  }
                />
                <label className="mt-2 fw-semibold">
                  Role
                </label>
                <select
                  className="w-100 border p-2 mt-2 rounded"
                  value={editedManager.role || ""}
                  onChange={(e) =>
                    setEditedManager({ ...editedManager, role: e.target.value })
                  }
                >
                  <option value="">Select Roles </option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Developer">Developer</option>
                </select>
                <div className="mt-2 fit-content mx-auto ">
                  <button className="btn btn-danger mr-2 "onClick={closeAddManagerModal}>Cancel</button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleAddManager(
                        editedManager.accountManager,
                        editedManager.role
                      )
                    }
                  >
                    Add
                  </button>
                 
                </div>
              </div>
            </Modal>
            <div>
              {" "}
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, sortedManagers.length)} of{" "}
              {sortedManagers.length} entries{" "}
            </div>

            <div className="choose-page">
              <button onClick={handlePrev} disabled={currentPage === 0}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  disabled={currentPage === i + 1}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
          <div>
            <table className="table table-bordered table-hover ">
              <thead className="table-danger ">
                <tr>
                  <th
                    className="align-middle text-center"
                    onClick={() => handleSort("sn")}
                  >
                    S/N
                    {sortColumn === "sn" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>
                  <th
                    className="align-middle text-center"
                    onClick={() => handleSort("accountManager")}
                  >
                    Account Manager
                    {sortColumn === "accountManager" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>

                  <th
                    className="align-middle text-center"
                    onClick={() => handleSort("dateAdded")}
                  >
                    Date Added
                    {sortColumn === "dateAdded" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>
                  <th
                    className="align-middle text-center"
                    onClick={() => handleSort("role")}
                  >
                    Role
                    {sortColumn === "role" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>
                  <th className="align-middle text-center"> Action </th>
                </tr>
              </thead>
              <tbody>
                {visibleManagers.map((manager, index) => (
                  <tr key={index}>
                    <td className="align-middle text-center"> {manager.sn} </td>
                    <td className="align-middle text-center">
                      {editableManager && editableManager.sn === manager.sn ? (
                        <input
                          className="w-100 border p-2"
                          value={editedManager.accountManager || ""}
                          onChange={(e) =>
                            setEditedManager({
                              ...editedManager,
                              accountManager: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <span> {manager.accountManager} </span>
                      )}
                    </td>
                    <td className="align-middle text-center">
                      {" "}
                      {manager.dateAdded}{" "}
                    </td>

                    <td className={`align-middle`}>
                      {/* <div className={`${roleClass[manager.role]}`}>
                                     
                                    </div> */}
                      {editableManager && editableManager.sn === manager.sn ? (
                        <select
                          className="w-100 border p-2"
                          value={editedManager.role || ""}
                          onChange={(e) =>
                            setEditedManager({
                              ...editedManager,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Admin">Admin</option>
                          <option value="Customer Support">
                            Customer Support
                          </option>
                          <option value="Developer">Developer</option>
                        </select>
                      ) : (
                        <span className={`${roleClass[manager.role]}`}>
                          {" "}
                          {manager.role}{" "}
                        </span>
                      )}
                    </td>
                    <td className="align-middle text-center">
                      {editableManager && editableManager.sn === manager.sn ? (
                        <FontAwesomeIcon
                          className="mr-3"
                          icon={faSave}
                          onClick={() => handleSave(manager)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="mr-3"
                          icon={faPenToSquare}
                          onClick={() => handleEdit(manager)}
                        />
                      )}

                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        onClick={() => handleDelete(manager)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountManagerTable;
