import React, { useState } from "react";
import usersJson from "../../data/messages/users.json";
import conversationsJson from "../../data/messages/conversations.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

interface User {
  id: number;
  email: string;
}

interface Conversation {
  id: number;
  messageTo: number;
  subject: string;
  created_at: string;
}

const ContactMessagesDiv: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsJson || []
  );
  const [users, setUsers] = useState<User[]>(usersJson || []);

  // Helper function to get the email of the user based on the ID
  const getUserEmailById = (userId: number): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.email : "Unknown";
  };

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;
  const [sortColumn, setSortColumn] = useState<keyof Conversation>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < conversations.length) setStartIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - itemsPerPage;
    if (prevIndex >= 0) setStartIndex(prevIndex);
  };

  const handleSort = (column: keyof Conversation) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  const sortedConversations = conversations.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === "created_at") {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

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

  const totalPages = Math.ceil(sortedConversations.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleConversations = sortedConversations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white border rounded ">
      <div className="p-4 border-bottom fw-bold text-lg"> Contacts </div>
      <div className="p-4">
        <table className="table table-bordered table-hover ">
          <thead className="table-danger ">
            <tr>
              <th className="align-middle text-center">
                SN
              </th>
              <th className="align-middle text-center" onClick={() => handleSort("messageTo")}>
                Email
                {sortColumn === "messageTo" && <span> {sortOrder === "asc" ? "▲" : "▼"} </span>}
              </th>
              <th className="align-middle text-center" onClick={() => handleSort("created_at")}>
                Most Recent Date
                {sortColumn === "created_at" && <span> {sortOrder === "asc" ? "▲" : "▼"} </span>}
              </th>
              <th className="align-middle text-center">
                Message Subject
                {sortColumn === "subject" && <span> {sortOrder === "asc" ? "▲" : "▼"} </span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleConversations.map((conversation, index) => (
              <tr key={conversation.id}>
                <td className="align-middle text-center"> {index + 1} </td>
                <td className="align-middle text-center"> {getUserEmailById(conversation.messageTo)} </td>
                <td className="align-middle text-center"> {conversation.created_at} </td>
                <td className="align-middle text-center"> {conversation.subject} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex vertical-align mb-4 pl-6">
        <div> Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedConversations.length)} of {sortedConversations.length} entries </div>
        <div className="choose-page">
          <button onClick={handlePrev} disabled={currentPage === 1}>
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
    </div>
  );
};

export default ContactMessagesDiv;
