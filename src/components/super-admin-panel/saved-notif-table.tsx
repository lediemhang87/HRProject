import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Notif {
  sn: number;
  page: string;
  title: string;
  message: string;
}

interface SavedNotifTableProps {
  notifs: Notif[];
  onEdit: (sn: number, updatedNotif: Partial<Notif>) => void;
  onDelete: (sn: number) => void;
}

const SavedNotifTable: React.FC<SavedNotifTableProps> = ({ notifs, onEdit, onDelete }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const [sortColumn, setSortColumn] = useState<keyof Notif>('sn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editableSn, setEditableSn] = useState<number | null>(null);
  const [editedNotif, setEditedNotif] = useState<Partial<Notif>>({});

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < notifs.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const handleSort = (column: keyof Notif) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    setStartIndex(0);
  };

  const handleEdit = (sn: number) => {

    setEditableSn(sn);
    const notifToEdit = notifs.find((notif) => notif.sn === sn);
    if (notifToEdit) {
      setEditedNotif(notifToEdit);
    }
  };

  const handleSave = (sn: number) => {
    if (!editedNotif.page || !editedNotif.title || !editedNotif.message) {
      alert('Please fill in all the required fields.');
      return;
    }
    onEdit(sn, editedNotif);
    setEditableSn(null);
    setEditedNotif({});
  };

  const handleDelete = (sn: number) => {
    onDelete(sn);
  };

  const sortedNotifs = [...notifs].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedNotifs.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleNotifs = sortedNotifs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded border">
      <div className="fw-semibold border-bottom p-4 d-flex vertical-align">Saved Notifications</div>

      <div className="vertical-align p-4">
        <div>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedNotifs.length)} of {sortedNotifs.length} entries
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

      <div className="p-4">
        <table className="w-100 grid-table">
          <thead className="background-lightgrey">
            <tr className="">
              <th onClick={() => handleSort('sn')}>
                S/N {sortColumn === 'sn' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th onClick={() => handleSort('page')}>
                Page {sortColumn === 'page' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th onClick={() => handleSort('title')}>
                Title {sortColumn === 'title' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th onClick={() => handleSort('message')}>
                Message {sortColumn === 'message' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleNotifs.map((notif) => (
              <tr key={notif.sn}>
                <td>{notif.sn}</td>
                {/* <td>{notif.page}</td> */}
                <td> {editableSn === notif.sn ? (
                  <div> 
                    <select 
                      className="w-100 border" 
                      value={editedNotif.page} 
                      onChange={(e) => setEditedNotif({ ...editedNotif, page: e.target.value })}>
                      <option value="">Select</option>
                      <option value="Landing Page Header">Landing Page Header</option>
                      <option value="HR Center Dasboard Admin">HR Center Dashboard Admin</option>
                      <option value="Login Page">Login Page</option>
                      <option value="OTP">OTP</option>
                      <option value="Dashboard">Dashboard</option>
                      <option value="Notification">Notification</option>
                    </select>
                  </div>
                ) : (notif.page)}</td>
                <td>
                  {editableSn === notif.sn ? (
                    <input
                      className="w-100 border p-2"
                      value={editedNotif.title || ''}
                      onChange={(e) => setEditedNotif({ ...editedNotif, title: e.target.value })}
                    />
                  ) : (
                    notif.title
                  )}
                </td>
                <td>
                  {editableSn === notif.sn ? (
                    <input
                      className="w-100 border p-2"
                      value={editedNotif.message || ''}
                      onChange={(e) => setEditedNotif({ ...editedNotif, message: e.target.value })}
                    />
                  ) : (
                    notif.message
                  )}
                </td>
                <td>
                  {editableSn === notif.sn ? (
                    <>
                      <FontAwesomeIcon
                        className="mr-5"
                        icon={faPen}
                        onClick={() => handleSave(notif.sn)}
                        style={{ cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        onClick={() => {
                          setEditableSn(null);
                          setEditedNotif({});
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className="mr-5"
                        icon={faPen}
                        onClick={() => handleEdit(notif.sn)}
                        style={{ cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        onClick={() => handleDelete(notif.sn)}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedNotifTable;
