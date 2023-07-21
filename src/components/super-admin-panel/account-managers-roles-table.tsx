import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import {
  faPenToSquare,
  faTrash,
  faAngleLeft,
  faAngleRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

interface Role {
  sn: number;
  accountManagerRole: string;
  roleFunction: string;
  roles: string[];
  dateUpdated: string;
}

interface RoleProps {
  rolesData: Role[];
}

const selectRoleMultiOption =[
  {
    value: "Manage Customers",
    label: "Manage Customers",
  },
  {
    value: "Manage Resellers",
    label: "Manage Resellers",
  },
  {
    value: "Payment History",
    label: "Payment History",
  },
  {
    value: "SMS Delivery Reports",
    label: "SMS Delivery Reports",
  },
  {
    value: "Voice Delivery Reports",
    label: "Voice Delivery Reports",
  },
]

const AccountManagerRolesTable: React.FC<RoleProps> = ({ rolesData }) => {
  const [roles, setRoles] = useState<Role[]>(rolesData || []);
  const [editableRole, setEditableRole] = useState<Role | null>(null);
  const [editedRole, setEditedRole] = useState<Partial<Role>>({});
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Role>("sn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<
    { value: string; label: string }[]
  >(
    editedRole.roles
      ? editedRole.roles.map((role) => ({
          value: role,
          label: role,
        }))
      : []
  );

  const openAddRoleModal = () => {
    setIsAddingRole(true);
  };

  const closeAddRoleModal = () => {
    setIsAddingRole(false);
    setSelectedRoles([]); // Reset the selected roles when the modal is closed
  };

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < roles.length) setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) setStartIndex(prevIndex);
  };

  const handleSort = (column: keyof Role) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleEdit = (role: Role) => {
    setEditableRole(role);
    const roleToEdit = roles.find((item) => item.sn === role.sn);
    if (roleToEdit) {
      setEditedRole(roleToEdit);
      setSelectedRoles(
        roleToEdit.roles.map((role) => ({
          value: role,
          label: role,
        }))
      );
    }
  };

  const handleDelete = (role: Role) => {
    const updatedRoles = roles.filter((c) => c.sn !== role.sn);
    setRoles(updatedRoles);
  };

  const handleSave = (role: Role) => {
    if (!editedRole.accountManagerRole) {
      alert("Please fill in all the required fields.");
      return;
    }

    const updatedRoles = roles.map((c) => {
      if (c.sn === role.sn) {
        return { ...c, ...editedRole };
      }
      return c;
    });

    setRoles(updatedRoles);
    setEditableRole(null);
    setEditedRole({});
  };

  const sortedRoles = [...roles].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === "dateUpdated") {
      const dateA = new Date(a.dateUpdated);
      const dateB = new Date(b.dateUpdated);

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
    accountManagerRole: string | undefined,
    roleFunction: string | undefined
  ) => {
    if (!accountManagerRole || !selectedRoles.length || !roleFunction) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newRole: Role = {
      sn: roles.length + 1,
      accountManagerRole: accountManagerRole,
      roleFunction: roleFunction,
      roles: selectedRoles.map((role) => role.value),
      dateUpdated: new Date().toLocaleDateString(
        "en-US",
        {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }
      ),
    };
    setRoles([...roles, newRole]);
    setStartIndex(0);
    setIsAddingRole(false);
    setEditedRole({});
    setEditableRole(null);
    setSelectedRoles([]);
  };

  const totalPages = Math.ceil(sortedRoles.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleRoles = sortedRoles.slice(startIndex, startIndex + itemsPerPage);

  const handleRolesChange = (selectedOptions: any) => {
    setSelectedRoles(selectedOptions);
    setEditedRole({
      ...editedRole,
      roles: selectedOptions.map((option: any) => option.value),
      dateUpdated: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };

  return (
    <div>
      <div className="fw-semibold mb-4"> Managers </div>
      <div className="bg-white rounded border">
        <div className="fw-semibold border-bottom p-4 d-flex vertical-align ">
          <div className="mr-auto"> Account Managers </div>
          <div
            className=" background-orange rounded p-2 cursor-pointer"
            onClick={openAddRoleModal}
          >
            {" "}
            + Add New Manager Role{" "}
          </div>
        </div>
        <div className="p-4">
          <Modal
            isOpen={isAddingRole}
            onRequestClose={closeAddRoleModal}
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
              <label className="mt-2 fw-semibold"> Role</label>
              <br />
              <input
                className="border w-100 mt-2 rounded"
                type="text"
                placeholder="Input Role"
                value={editedRole.accountManagerRole || ""}
                onChange={(e) =>
                  setEditedRole({
                    ...editedRole,
                    accountManagerRole: e.target.value,
                  })
                }
              />
              <label className="mt-2 fw-semibold"> Role function </label>
              <input
                className="border w-100 mt-2 rounded"
                type="text"
                placeholder="Input role function"
                value={editedRole.roleFunction || ""}
                onChange={(e) =>
                  setEditedRole({
                    ...editedRole,
                    roleFunction: e.target.value,
                  })
                }
              />
              <label className="mt-2 fw-semibold">Roles:</label>
              <br />
              <Select
                value={selectedRoles}
                options={selectRoleMultiOption}
                isMulti
                onChange={handleRolesChange}
              />
            </div>
            <div className="mt-2 fit-content mx-auto ">
              <button
                className="btn btn-danger mr-2"
                onClick={closeAddRoleModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={() =>
                  handleAddManager(
                    editedRole.accountManagerRole,
                    editedRole.roleFunction
                  )
                }
              >
                Add
              </button>
            </div>
          </Modal>
          <div className="p-4">
            <div className="d-flex vertical-align mb-4">
              <div>
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, sortedRoles.length)} of{" "}
                {sortedRoles.length} entries
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
                      S/N{" "}
                      {sortColumn === "sn" && (
                        <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                      )}
                    </th>
                    <th
                      className="align-middle text-center"
                      onClick={() => handleSort("accountManagerRole")}
                    >
                      Account Manager Role{" "}
                      {sortColumn === "accountManagerRole" && (
                        <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                      )}
                    </th>
                    <th className="align-middle text-center">Function</th>
                    <th className="align-middle text-center">Roles</th>
                    <th
                      className="align-middle text-center"
                      onClick={() => handleSort("dateUpdated")}
                    >
                      dateUpdated{" "}
                      {sortColumn === "dateUpdated" && (
                        <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                      )}
                    </th>
                    <th className="align-middle text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRoles.map((role, index) => (
                    <tr key={index}>
                      <td className="align-middle text-center">{role.sn}</td>
                      <td className="align-middle text-center">
                        {editableRole && editableRole.sn === role.sn ? (
                          <select
                            className="w-100 border p-2"
                            value={editedRole.accountManagerRole || ""}
                            onChange={(e) =>
                              setEditedRole({
                                ...editedRole,
                                accountManagerRole: e.target.value,
                                dateUpdated: new Date().toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                ),
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
                          <span> {role.accountManagerRole} </span>
                        )}
                      </td>
                      <td className="align-middle text-center">
                        {editableRole && editableRole.sn === role.sn ? (
                          <input
                            className="w-100 border p-2"
                            value={editableRole.roleFunction || ""}
                            onChange={(e) =>
                              setEditedRole({
                                ...editableRole,
                                roleFunction: e.target.value,
                                dateUpdated: new Date().toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                ),
                              })
                            }
                          />
                        ) : (
                          <span> {role.roleFunction} </span>
                        )}
                      </td>
                      <td className="align-middle">
                        {editableRole && editableRole.sn === role.sn ? (
                          <Select
                            value={
                              editedRole.roles
                                ? editedRole.roles.map((role) => ({
                                    value: role,
                                    label: role,
                                  }))
                                : null
                            }
                            options={selectRoleMultiOption}
                            isMulti
                            onChange={handleRolesChange}
                          />
                        ) : (
                          role.roles.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))
                        )}
                      </td>
                      <td className="align-middle text-center">
                        {role.dateUpdated}
                      </td>
                      <td className="align-middle text-center">
                        {editableRole && editableRole.sn === role.sn ? (
                          <FontAwesomeIcon
                            className="mr-3"
                            icon={faSave}
                            onClick={() => handleSave(role)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="mr-3"
                            icon={faPenToSquare}
                            onClick={() => handleEdit(role)}
                          />
                        )}
                        <FontAwesomeIcon
                          className="text-danger"
                          icon={faTrash}
                          onClick={() => handleDelete(role)}
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
    </div>
  );
};

export default AccountManagerRolesTable;
