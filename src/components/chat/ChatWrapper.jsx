// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import Sidebar from "./Sidebar";
// import ChatArea from "./ChatArea";

// const ChatContainer = styled.div`
//   display: flex;
//   height: 600px; // Adjusted from 100vh
//   width: 800px; // Added width
//   background: #1a1a1a;
//   color: white;
//   position: fixed;
//   bottom: 80px;
//   right: 20px;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 0 20px rgba(0,0,0,0.2);
//   z-index: 1000;
// `;

// const ChatWrapper = ({ onClose }) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleNewChat = () => {
//     if (currentMessages.length > 0) {
//       const chatExists = chats.some(chat => 
//         chat.messages.length === currentMessages.length &&
//         chat.messages[0].text === currentMessages[0].text
//       );
      
//       if (!chatExists) {
//         const newChat = {
//           id: Date.now(),
//           title: currentMessages[0].text.slice(0, 30) + "...",
//           date: "Today",
//           messages: [...currentMessages]
//         };
//         setChats(prevChats => [newChat, ...prevChats]);
//       }
//     }
//     setCurrentMessages([]);
//     setSelectedChat(null);
//   };

//   const handleSelectChat = (chat) => {
//     if (chat) {
//       setSelectedChat(chat);
//       setCurrentMessages(chat.messages);
//     } else {
//       setSelectedChat(null);
//       setCurrentMessages([]);
//     }
//   };

//   const handleUpdateMessages = (messages) => {
//     setCurrentMessages(messages);
//     if (selectedChat) {
//       if (messages.length > selectedChat.messages.length) {
//         const updatedChat = { 
//           ...selectedChat, 
//           messages,
//           date: "Today",
//           title: selectedChat.messages[0].text.slice(0, 30) + "..."
//         };
//         setSelectedChat(updatedChat);
        
//         const filteredChats = chats.filter(chat => chat.id !== selectedChat.id);
//         setChats([updatedChat, ...filteredChats]);
//       } else {
//         const updatedChat = { ...selectedChat, messages };
//         setSelectedChat(updatedChat);
//         setChats(prevChats => 
//           prevChats.map(chat => 
//             chat.id === selectedChat.id ? updatedChat : chat
//           )
//         );
//       }
//     }
//   };

//   const handleDeleteChat = (chatId) => {
//     setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
//     if (selectedChat && selectedChat.id === chatId) {
//       setSelectedChat(null);
//       setCurrentMessages([]);
//     }
//   };

//   const handleRenameChat = (chatId, newTitle) => {
//     setChats(prevChats =>
//       prevChats.map(chat =>
//         chat.id === chatId ? { ...chat, title: newTitle } : chat
//       )
//     );
//     if (selectedChat && selectedChat.id === chatId) {
//       setSelectedChat(prev => ({ ...prev, title: newTitle }));
//     }
//   };

//   return (
//     <ChatContainer>
//       <div className="position-absolute top-0 end-0 p-2">
//         <button 
//           className="btn btn-link text-white" 
//           onClick={onClose}
//         >
//           <Icon icon="mdi:close" />
//         </button>
//       </div>
//       <Sidebar 
//         isMobile={isMobile} 
//         onSelectChat={handleSelectChat} 
//         onNewChat={handleNewChat}
//         onDeleteChat={handleDeleteChat}
//         onRenameChat={handleRenameChat}
//         chats={chats}
//         selectedChat={selectedChat}
//       />
//       <ChatArea 
//         key={selectedChat ? selectedChat.id : 'new'}
//         selectedChat={selectedChat}
//         messages={currentMessages}
//         onUpdateMessages={handleUpdateMessages}
//       />
//     </ChatContainer>
//   );
// };

// export default ChatWrapper;