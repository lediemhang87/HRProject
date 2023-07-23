import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import usersJson from "../../data/messages/users.json";
import conversationsJson from "../../data/messages/conversations.json";
import messagesJson from "../../data/messages/messages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

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

interface RouteParams {
  userId: string;
  [key: string]: string | undefined;
}

const UserMessage: React.FC = () => {
  const { userId } = useParams<RouteParams>();
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsJson || []
  );
  const [users, setUsers] = useState<User[]>(usersJson || []);
  const [messages, setMessages] = useState<Message[]>(messagesJson || []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPhoneMode, setIsPhoneMode] = useState(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = (): void => {
      setIsPhoneMode(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getUserEmailById = (userId: string | undefined) => {
    const user = users.find((user) => user.id === Number(userId));
    return user ? user.email : "Unknown";
  };

  const [showMessageContentMap, setShowMessageContentMap] = useState<{
    [key: number]: boolean;
  }>({});

  const handleToggleMessageContent = (conversationId: number) => {
    setShowMessageContentMap((prevMap) => ({
      ...prevMap,
      [conversationId]: !prevMap[conversationId],
    }));
  };

  const userConversations = conversations
    .filter((conversation) => conversation.messageTo === Number(userId))
    .map((conversation) => {
      const sortedMessages = messages
        .filter((message) => message.conversation_id === conversation.id)
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      return { ...conversation, messages: sortedMessages };
    });

  const [inputMessages, setInputMessages] = useState<{ [key: number]: string }>(
    {}
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputMessages((prevInputMessages) => ({
      ...prevInputMessages,
      [name]: value,
    }));
  };

  const handleSendMessage = (conversationId: number) => {
    if (inputMessages[conversationId]?.trim() !== "") {
      // Find the active conversation
      const activeConversationObj = userConversations.find(
        (conversation) => conversation.id === conversationId
      );

      if (activeConversationObj) {
        // Create a new message object
        const newMessage: Message = {
          id: messages.length + 1, // Generate a unique ID for the new message
          conversation_id: conversationId,
          sender_id: 1, // Set the sender ID to 1 (system)
          recipient_id: Number(userId),
          content: inputMessages[conversationId],
          timestamp: new Date().toLocaleString(), // Set the current timestamp
        };

        // Add the new message to the messages state
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Clear the input field for the active conversation
        setInputMessages((prevInputMessages) => ({
          ...prevInputMessages,
          [conversationId]: "",
        }));

        // Scroll to the bottom of the messages container
        scrollMessagesToBottom(conversationId);
      }
    }
  };

  // Create a ref for the messages container
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll the messages container to the bottom
  const scrollMessagesToBottom = (conversationId: number) => {
    if (messagesContainerRef.current) {
      const messagesContainer = messagesContainerRef.current;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  return (
    <div className="default-background-color">
      <NavBar isPhoneMode={isPhoneMode} toggleSidebar={toggleSidebar} />
      <Container fluid>
        <Row>
          {(!isPhoneMode || isSidebarOpen) && (
            <Col lg={2}>
              <Sidebar activeItem="contactMessages" />
            </Col>
          )}
          <Col lg={9}>
            <div className="text-xl fw-bold mb-4">
              {" "}
              Conversation with {userId && getUserEmailById(userId)}{" "}
            </div>
            {userConversations.map((conversation) => (
              <div
                className="bg-white mb-4 border rounded"
                key={conversation.id}
              >
                <div className="p-4 fw-bold border-bottom d-flex">
                  Re: {conversation.subject}
                  <div className="ml-auto text-secondary">
                    {
                      conversation.messages[conversation.messages.length - 1]
                        .timestamp
                    }
                  </div>
                  <div className="text-center">
                    <button
                      className="ml-4 "
                      onClick={() =>
                        handleToggleMessageContent(conversation.id)
                      }
                    >
                      {" "}
                      Detail {"  "}
                      {showMessageContentMap[conversation.id] ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </button>
                  </div>
                </div>

                {showMessageContentMap[conversation.id] ? (
                  <div style={{ maxHeight: "400px", overflowY: "auto" }} ref={messagesContainerRef}>
                    <div>
                      {conversation.messages.map((message, index) => (
                        <div className="pb-1 pr-4 pl-4" key={message.id}>
                          {index === 0 || conversation.messages[index - 1].sender_id !== message.sender_id ? (
                            <p className={`text-secondary ${message.sender_id === 1 ? "text-end mr-6" : "ml-6"}`}>
                              {message.sender_id === 1 ? "System" : userId && getUserEmailById(userId)}
                            </p>
                          ) : null}
                          <div
                            key={message.id}
                            className={`fit-content mw-25 pr-8 pl-8 pt-2 pb-2 rounded-pill ${
                              message.sender_id === 1
                                ? "background-orange text-white ml-auto"
                                : "background-lightgrey"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex p-3 border-top">
                      <input
                        className="border w-100 rounded p-3"
                        placeholder="Type Message"
                        value={inputMessages[conversation.id] || ""}
                        name={conversation.id.toString()}
                        onChange={handleInputChange}
                      />
                      <div
                        className="vertical-align background-orange text-white p-3 rounded ml-4 cursor-pointer"
                        onClick={() => handleSendMessage(conversation.id)}
                      >
                        Send
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserMessage;
