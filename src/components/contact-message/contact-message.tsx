import React, { useState } from "react";
import usersJson from "../../data/messages/users.json";
import conversationsJson from "../../data/messages/conversations.json";
import messagesJson from "../../data/messages/messages.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight,faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  recipient_id: number;
  content: string;
  timestamp: string;
}

interface GroupedConversation extends Conversation {
  mostRecentDate: string;
}
interface GroupedConversations {
  [email: string]: GroupedConversation[];
}
const ContactMessagesDiv: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsJson || []
  );
  const [users, setUsers] = useState<User[]>(usersJson || []);
  const [messages, setMessages] = useState<Message[]>(messagesJson || []);

  const getUserEmailById = (userId: number): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.email : "Unknown";
  };

  const getIdByUserEmail = (userEmail: string): number => {
    const user = users.find((user) => user.email === userEmail);
    return user ? user.id : 404;
  };

  // Group conversations by email and find the most recent date for each user
  const groupedConversations: GroupedConversations = conversations.reduce(
    (result: GroupedConversations, conversation) => {
      const email = getUserEmailById(conversation.messageTo) as string;
      if (!result[email]) {
        result[email] = [];
      }
      result[email].push({
        ...conversation,
        mostRecentDate: conversation.created_at,
      });
      return result;
    },
    {}
  );

  // Find the most recent date for each user
  Object.keys(groupedConversations).forEach((email) => {
    const conversations = groupedConversations[email];
    const mostRecentDate = conversations.reduce((latestDate, conversation) => {
      const conversationDate = new Date(conversation.created_at);
      return conversationDate > latestDate ? conversationDate : latestDate;
    }, new Date(0));

    groupedConversations[email].forEach((conversation) => {
      conversation.mostRecentDate = mostRecentDate.toLocaleString();
    });
  });

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;
  const [sortColumn, setSortColumn] =
    useState<keyof Conversation>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handlePageClick = (pageIndex: number) => {
    setStartIndex((pageIndex - 1) * itemsPerPage);
  };

  const handleNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    if (nextIndex < Object.keys(groupedConversations).length)
      setStartIndex(nextIndex);
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

  const sortedEmails = Object.keys(groupedConversations).sort(
    (emailA, emailB) => {
      const dateA = new Date(groupedConversations[emailA][0].mostRecentDate);
      const dateB = new Date(groupedConversations[emailB][0].mostRecentDate);

      if (dateA < dateB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }
  );

  const totalPages = Math.ceil(sortedEmails.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;
  const visibleEmails = sortedEmails.slice(
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
              <th className="align-middle text-center">SN</th>
              <th
                className="align-middle text-center"
                onClick={() => handleSort("messageTo")}
              >
                Email
                {sortColumn === "messageTo" && (
                  <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                )}
              </th>
              <th
                className="align-middle text-center"
                onClick={() => handleSort("created_at")}
              >
                Most Recent Date
                {sortColumn === "created_at" && (
                  <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                )}
              </th>
              <th className="align-middle text-center">
                Messages
                {sortColumn === "subject" && (
                  <span> {sortOrder === "asc" ? "▲" : "▼"} </span>
                )}
              </th>
              <th className="align-middle text-center">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleEmails.map((email, index) => (
              <tr key={index}>
                <td className="align-middle text-center"> {index + 1} </td>
                <td className="align-middle text-center"> {email} </td>
                <td className="align-middle text-center">
                  {" "}
                  {groupedConversations[email][0].mostRecentDate}{" "}
                </td>
                <td className="align-middle text-center">
                  {groupedConversations[email].map((conversation) => (
                     <span key={conversation.id}>{conversation.subject}, </span>
                  ))}...
                </td>
                <td className="align-middle text-center ">
                    <div className="text-primary rounded-pill border border-primary">
                        <FontAwesomeIcon icon={faEye} />
                        <Link to={`/contactMessages/user/${getIdByUserEmail(email)}`}> See more </Link>
                    </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex vertical-align mb-4 pl-6">
        <div>
          {" "}
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, sortedEmails.length)} of{" "}
          {sortedEmails.length} entries{" "}
        </div>
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
