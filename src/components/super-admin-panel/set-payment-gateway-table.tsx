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

interface PaymentSetting {
  sn: number;
  name: string;
  apiKey: string;
  service: string;
  status: string;
}

interface PaymentSettingProps {
  paymentSettingsData: PaymentSetting[];
}
const SetPaymentGateWayTable: React.FC<PaymentSettingProps> = ({
  paymentSettingsData,
}) => {
  const [paymentSettings, setPaymentSettings] = useState<PaymentSetting[]>(
    paymentSettingsData || []
  );
  const [editablePaymentSettings, setEditablePaymentSetting] =
    useState<PaymentSetting | null>(null);
  const [editedPaymentSettings, setEditedPaymentSettings] = useState<
    Partial<PaymentSetting>
  >({});

  const [isAddingPaymentSetting, setIsAddingPaymentSetting] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof PaymentSetting>("sn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const statusClass: { [key: string]: string } = {
    Activated: "btn btn-success",
    Deactivated: "btn btn-secondary",
  };
  const openAddRoleModal = () => {
    setIsAddingPaymentSetting(true);
  };

  const closeAddRoleModal = () => {
    setIsAddingPaymentSetting(false);
  };

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < paymentSettings.length) setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) setStartIndex(prevIndex);
  };
  const handleSort = (column: keyof PaymentSetting) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleEdit = (paymentSetting: PaymentSetting) => {
    setEditablePaymentSetting(paymentSetting);
    const paymentSettingToEdit = paymentSettings.find(
      (item) => item.sn === paymentSetting.sn
    );
    if (paymentSettingToEdit) {
      setEditedPaymentSettings(paymentSettingToEdit);
    }
  };

  const handleDelete = (paymentSetting: PaymentSetting) => {
    // Implement logic to delete the customer
    const updatedPaymentSettings = paymentSettings.filter(
      (c) => c.sn !== paymentSetting.sn
    );
    setPaymentSettings(updatedPaymentSettings);
  };

  const handleSave = (paymentSetting: PaymentSetting) => {
    if (
      !editedPaymentSettings.name ||
      !editedPaymentSettings.apiKey ||
      !editedPaymentSettings.service
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const updatedPaymentSettings = paymentSettings.map((c) => {
      if (c.sn === paymentSetting.sn) {
        return { ...c, ...editedPaymentSettings };
      }
      return c;
    });

    setPaymentSettings(updatedPaymentSettings);
    setEditablePaymentSetting(null);
    setEditedPaymentSettings({});
  };

  const sortedSettings = [...paymentSettings].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
  const toggleStatus = (setting: PaymentSetting) => {
    const updatedPaymentSettings = paymentSettings.map((s) =>
      s.sn === setting.sn
        ? {
            ...s,
            status: s.status === "Activated" ? "Deactivated" : "Activated",
          }
        : s
    );
    setPaymentSettings(updatedPaymentSettings);
  };

  const handleAddPaymentGateway = (
    name: string | undefined,
    apiKey: string | undefined,
    service: string | undefined,
    status: string | undefined
  ) => {
    if (!name || !apiKey || !service || !status) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newPaymentSetting: PaymentSetting = {
      sn: paymentSettings.length + 1,
      name: name,
      apiKey: apiKey,
      service: service,
      status: status,
    };
    setPaymentSettings([...paymentSettings, newPaymentSetting]);
    setStartIndex(0);
    setIsAddingPaymentSetting(false);
    setEditedPaymentSettings({});
    setEditablePaymentSetting(null);
  };

  const totalPages = Math.ceil(sortedSettings.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleSettings = sortedSettings.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <div className="border bg-white rounded">
        <div className="border-bottom p-4 mb-4 d-flex justify-content-between">
          <div className="text-xl fw-semibold ">Set Payment Gateway</div>
          <div className="ms-auto btn btn-success" onClick={openAddRoleModal}>
            + Add payment gateway
          </div>
        </div>
        <div>
          <Modal
            isOpen={isAddingPaymentSetting}
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
              <label className="mt-2 fw-semibold"> Name </label>
              <br />
              <input
                className="border w-100 mt-2 rounded"
                type="text"
                placeholder="Input Role"
                value={editedPaymentSettings.name || ""}
                onChange={(e) =>
                  setEditedPaymentSettings({
                    ...editedPaymentSettings,
                    name: e.target.value,
                  })
                }
              />
              <label className="mt-2 fw-semibold"> API Key </label>
              <input
                className="border w-100 mt-2 rounded"
                type="text"
                placeholder="Input role function"
                value={editedPaymentSettings.apiKey || ""}
                onChange={(e) =>
                  setEditedPaymentSettings({
                    ...editedPaymentSettings,
                    apiKey: e.target.value,
                  })
                }
              />
              <label className="mt-2 fw-semibold">Service</label>
              <br />
              <select
                className="border rounded w-100"
                value={editedPaymentSettings.service}
                onChange={(e) =>
                  setEditedPaymentSettings({
                    ...editedPaymentSettings,
                    service: e.target.value,
                  })
                }
              >
                <option value="">-- Select payment --</option>
                <option> Payment 1</option>
                <option> Payment 2</option>
              </select>
              <label className="mt-2 fw-semibold">Status</label>
              <br />
              <select
                className="border rounded w-100"
                value={editedPaymentSettings.status}
                onChange={(e) =>
                  setEditedPaymentSettings({
                    ...editedPaymentSettings,
                    status: e.target.value,
                  })
                }
              >
                <option value="">-- Select status --</option>
                <option> Activated</option>
                <option> Deactivated</option>
              </select>
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
                  handleAddPaymentGateway(
                    editedPaymentSettings.name,
                    editedPaymentSettings.apiKey,
                    editedPaymentSettings.service,
                    editedPaymentSettings.status
                  )
                }
              >
                Add
              </button>
            </div>
          </Modal>
        </div>
        <div className="d-flex vertical-align p-4">
          <div>
            {" "}
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, sortedSettings.length)} of{" "}
            {sortedSettings.length} entries{" "}
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

            <button onClick={handleNext} disabled={currentPage === totalPages}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
        <div className="p-4">
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
                  onClick={() => handleSort("name")}
                >
                  Name
                  {sortColumn === "name" && (
                    <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                  )}
                </th>

                <th
                  className="align-middle text-center"
                  onClick={() => handleSort("apiKey")}
                >
                  API KEY
                  {sortColumn === "apiKey" && (
                    <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                  )}
                </th>
                <th
                  className="align-middle text-center"
                  onClick={() => handleSort("service")}
                >
                  Service
                  {sortColumn === "service" && (
                    <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                  )}
                </th>
                <th
                  className="align-middle text-center"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortColumn === "status" && (
                    <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                  )}
                </th>
                <th className="align-middle text-center"> Action </th>
              </tr>
            </thead>
            <tbody>
              {visibleSettings.map((setting, index) => (
                <tr key={index}>
                  <td className="align-middle text-center"> {setting.sn} </td>
                  <td className="align-middle text-center">
                    {editablePaymentSettings &&
                    editablePaymentSettings.sn === setting.sn ? (
                      <input
                        className="w-100 border p-2"
                        value={editedPaymentSettings.name || ""}
                        onChange={(e) =>
                          setEditedPaymentSettings({
                            ...editedPaymentSettings,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span>{setting.name} </span>
                    )}
                  </td>
                  <td className="align-middle text-center">
                    {editablePaymentSettings &&
                    editablePaymentSettings.sn === setting.sn ? (
                      <input
                        className="w-100 border p-2"
                        value={editedPaymentSettings.apiKey || ""}
                        onChange={(e) =>
                          setEditedPaymentSettings({
                            ...editedPaymentSettings,
                            apiKey: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span> {setting.apiKey} </span>
                    )}
                  </td>
                  <td className="align-middle text-center">
                    {editablePaymentSettings &&
                    editablePaymentSettings.sn === setting.sn ? (
                      <select
                        className="w-100 border p-2 rounded"
                        value={editedPaymentSettings.service || ""}
                        onChange={(e) =>
                          setEditedPaymentSettings({
                            ...editedPaymentSettings,
                            service: e.target.value,
                          })
                        }
                      >
                        <option value="Payment1">Payment 1</option>
                        <option value="Payment2">Payment 2</option>
                        <option value="Payment3">Payment 3</option>
                      </select>
                    ) : (
                      <span> {setting.service} </span>
                    )}
                  </td>
                  <td className={`align-middle text-center`}>
                    <div
                      className={`${statusClass[setting.status]}`}
                      onClick={() => toggleStatus(setting)}
                    >
                      {setting.status}
                    </div>
                  </td>
                  <td className="align-middle text-center">
                    {editablePaymentSettings &&
                    editablePaymentSettings.sn === setting.sn ? (
                      <FontAwesomeIcon
                        className="mr-4"
                        icon={faSave}
                        onClick={() => handleSave(setting)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="mr-4"
                        icon={faPenToSquare}
                        onClick={() => handleEdit(setting)}
                      />
                    )}
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faTrash}
                      onClick={() => handleDelete(setting)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SetPaymentGateWayTable;
