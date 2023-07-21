import { useState, useEffect } from "react";
import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faAngleLeft,
  faAngleRight,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

interface Feature {
  sn: number;
  price: number;
  planName: string;
  feature: string[];
  dateUpdated: string;
}

interface FeatureProps {
  featuresData: Feature[];
}

const selectRoleMultiOption = [
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
];
const SetFeaturesTable: React.FC<FeatureProps> = ({ featuresData }) => {
  const [features, setFeatures] = useState<Feature[]>(featuresData || []);
  const [editableFeature, setEditableFeature] = useState<Feature | null>(null);
  const [editedFeature, setEditedFeature] = useState<Partial<Feature>>({});
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Feature>("sn");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedFeatures, setSelectedFeatures] = useState<
    { value: string; label: string }[]
  >(
    editedFeature.feature
      ? editedFeature.feature.map((feature) => ({
          value: feature,
          label: feature,
        }))
      : []
  );

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < features.length) setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) setStartIndex(prevIndex);
  };

  const handleEdit = (feature: Feature) => {
    setEditableFeature(feature);
    const roleToEdit = features.find((item) => item.sn === feature.sn);
    if (roleToEdit) {
      setEditedFeature(roleToEdit);
      setSelectedFeatures(
        roleToEdit.feature.map((feature) => ({
          value: feature,
          label: feature,
        }))
      );
    }
  };

  const handleDelete = (feature: Feature) => {
    const updatedFeatures = features.filter((c) => c.sn !== feature.sn);
    setFeatures(updatedFeatures);
  };

  const handleSave = (feature: Feature) => {
    if (
      !editedFeature.planName ||
      !editedFeature.price ||
      selectedFeatures.length == 0
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const updatedRoles = features.map((c) => {
      if (c.sn === feature.sn) {
        return { ...c, ...editedFeature };
      }
      return c;
    });

    setFeatures(updatedRoles);
    setEditableFeature(null);
    setEditedFeature({});
  };

  const handleSort = (column: keyof Feature) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedFeatures = [...features].sort((a, b) => {
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

  const handleAddFeature = (
    planName: string | undefined,
    price: number | undefined,
    feature: string[] | undefined
  ) => {
    if (!planName || !feature || !price) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newFeature: Feature = {
      sn: features.length + 1,
      price: price,
      planName: planName,
      feature: feature,
      dateUpdated: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setFeatures([...features, newFeature]);
    setStartIndex(0);
    setEditableFeature(null);

    setSelectedFeatures([]);
    setEditedFeature({});
  };

  const totalPages = Math.ceil(sortedFeatures.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleFeatures = sortedFeatures.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFeaturesChange = (selectedOptions: any) => {
    setSelectedFeatures(selectedOptions);
    setEditedFeature({
      ...editedFeature,
      feature: selectedOptions.map((option: any) => option.value),
      dateUpdated: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };
  return (
    <div>
      <div className="fw-semibold mb-4"> Set Website Prices & Features </div>
      <div className="bg-white rounded border mb-8">
        <div className="fw-semibold border-bottom p-4 d-flex vertical-align ">
          <div className="mr-auto"> Set Default Prices </div>
          <div className=" background-orange rounded p-2 cursor-pointer" onClick={()=>setIsAddingRole(!isAddingRole)}>
            + Add New Pricing
          </div>
        </div>
        {isAddingRole && <div className="p-4">
          <div className="fw-semibold mb-10">
            {" "}
            Plans Pricing <span className="text-danger">*</span>
          </div>

          <div className="d-flex justify-content-center mb-6">
            <input
              className="w-25 h-100 border mr-8 rounded p-3 height-50"
              placeholder="Plan Name"
              onChange={(e) =>
                setEditedFeature({
                  ...editedFeature,
                  planName: e.target.value,
                })
              }
            />
            <input
              className="w-25 h-100 border mr-8 rounded p-3 height-50"
              placeholder="Plan price"
              onChange={(e) =>
                setEditedFeature({
                  ...editedFeature,
                  price: Number(e.target.value),
                })
              }
            />
            <br/>
                <Select
                className=" w-25 mr-8"
                styles={{
                    control: (provided) => ({
                      ...provided,
                      height: "100%",
                    }),
                  }}
                value={selectedFeatures}
                options={selectRoleMultiOption}
                isMulti
                placeholder="Select features"
                onChange={handleFeaturesChange}
                />
            
            <button
              className=" background-orange p-3 rounded text-white"
              onClick={() =>
                handleAddFeature(
                  editedFeature.planName,
                  editedFeature.price,
                  editedFeature.feature
                )
              }
            >
              Save
            </button>
          </div>
        </div>}
      </div>

      <div className="bg-white rounded border">
        <div className="fw-semibold border-bottom p-4 d-flex vertical-align ">
          <div className="mr-auto"> Set Features </div>
        </div>
        <div className="p-4">
          <div className="d-flex vertical-align mb-4">
            <div>
              {" "}
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, sortedFeatures.length)} of{" "}
              {sortedFeatures.length} entries{" "}
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
                    onClick={() => handleSort("planName")}
                  >
                    Plan Name
                    {sortColumn === "planName" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>
                  <th className="align-middle text-center">Price</th>
                  <th className="align-middle text-center">Features</th>
                  <th
                    className="align-middle text-center"
                    onClick={() => handleSort("dateUpdated")}
                  >
                    dateUpdated
                    {sortColumn === "dateUpdated" && (
                      <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                    )}
                  </th>
                  <th className="align-middle text-center"> Action </th>
                </tr>
              </thead>
              <tbody>
                {visibleFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td className="align-middle text-center"> {feature.sn} </td>

                    <td className="align-middle text-center">
                      {editableFeature && editableFeature.sn === feature.sn ? (
                        <input
                          className="w-100 border p-2"
                          value={editedFeature.planName || ""}
                          onChange={(e) =>
                            setEditedFeature({
                              ...editedFeature,
                              planName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <span> {feature.planName} </span>
                      )}
                    </td>
                    <td className="align-middle text-center">
                      {editableFeature && editableFeature.sn === feature.sn ? (
                        <input
                          className="w-100 border p-2"
                          value={editedFeature.price || ""}
                          onChange={(e) =>
                            setEditedFeature({
                              ...editedFeature,
                              price: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        <span>{feature.price}</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {editableFeature && editableFeature.sn === feature.sn ? (
                        <Select
                          value={
                            editedFeature.feature
                              ? editedFeature.feature.map((feature) => ({
                                  value: feature,
                                  label: feature,
                                }))
                              : null
                          }
                          options={selectRoleMultiOption}
                          isMulti
                          onChange={handleFeaturesChange}
                        />
                      ) : (
                        <div>
                          {feature.feature.map((item, index) => (
                            <span key={index}> {item}, </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="align-middle text-center">
                      {feature.dateUpdated}
                    </td>
                    <td className="align-middle text-center">
                      {editableFeature && editableFeature.sn === feature.sn ? (
                        <FontAwesomeIcon
                          className="mr-3"
                          icon={faSave}
                          onClick={() => handleSave(feature)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="mr-4"
                          icon={faPenToSquare}
                          onClick={() => handleEdit(feature)}
                        />
                      )}

                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        onClick={() => handleDelete(feature)}
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
export default SetFeaturesTable;
