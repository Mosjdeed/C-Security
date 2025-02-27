import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineUser, AiOutlineMore } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import LogoImage from "../../assets/logo.png"; 
import { useNavigate } from 'react-router-dom';


const SidebarContainer = styled(motion.div)`
  width: ${(props) => (props.isOpen ? "280px" : "0px")};
  height: 100vh;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: ${(props) => (props.isMobile ? "fixed" : "relative")};
  right: 0;
  top: 0;
  z-index: 1000;
  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? "100%" : "0px")};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const LogoContainer = styled.div`  
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const MenuButton = styled(ToggleButton)`
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 100;
`;

const NewChatButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #6e8efb, #4a6cf7);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  margin: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
    border-radius: 50%;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ChatList = styled.div`
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
`;

const DateLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
`;

const ChatItem = styled(motion.div)`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  right: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${(props) => (props.delete ? "#ff4d4d" : "white")};
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const ProfileSection = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Sidebar({ 
  isMobile, 
  onSelectChat, 
  onNewChat, 
  onDeleteChat, 
  onRenameChat,
  chats,
  selectedChat 
}) {
  const navigate = useNavigate();  
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatTitle, setNewChatTitle] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleChatSelect = (chat) => {
    onSelectChat(chat);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    onDeleteChat(chatId); // Call the parent's onDeleteChat function
    setOpenDropdownId(null);
  };

  const handleRenameChat = (chatId) => {
    setEditingChatId(chatId);
    setNewChatTitle(chats.find((chat) => chat.id === chatId).title);
    setOpenDropdownId(null);
  };

  const saveNewTitle = (chatId) => {
    onRenameChat(chatId, newChatTitle);
    setEditingChatId(null);
    setNewChatTitle("");
  };

  const handleNewChatClick = () => {
    onNewChat();
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <MenuButton onClick={toggleSidebar}>
          <HiMenuAlt2 size={24} />
        </MenuButton>
      )}
      <AnimatePresence>
        {isOpen && (
          <SidebarContainer
            isMobile={isMobile}
            isOpen={isOpen}
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "100%" : "280px" }}
            exit={{ width: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Header>
              <LogoContainer onClick={() => navigate('/')}>  {/* Add onClick here */}
                <img src={LogoImage} alt="Logo" />
              </LogoContainer>
              <ToggleButton onClick={toggleSidebar}>
                <IoMdClose size={20} />
              </ToggleButton>
            </Header>

            <NewChatButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewChatClick}
            >
              <BiMessageSquareDetail />
              New Chat
            </NewChatButton>

            <ChatList>
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <DateLabel>{chat.date}</DateLabel>
                  <ChatItem 
                    onClick={() => handleChatSelect(chat)}
                    style={{
                      background: selectedChat?.id === chat.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                    }}
                  >
                    {editingChatId === chat.id ? (
                      <input
                        type="text"
                        value={newChatTitle}
                        onChange={(e) => setNewChatTitle(e.target.value)}
                        onBlur={() => saveNewTitle(chat.id)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") saveNewTitle(chat.id);
                        }}
                        autoFocus
                      />
                    ) : (
                      chat.title
                    )}
                    <DropdownButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === chat.id ? null : chat.id);
                      }}
                    >
                      <AiOutlineMore size={18} />
                    </DropdownButton>
                    {openDropdownId === chat.id && (
                      <DropdownMenu
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <DropdownItem onClick={() => handleRenameChat(chat.id)}>
                          Rename
                        </DropdownItem>
                        <DropdownItem
                          delete
                          onClick={() => handleDeleteChat(chat.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </ChatItem>
                </motion.div>
              ))}
            </ChatList>

            <ProfileSection onClick={() => navigate('/view-profile')} style={{ cursor: 'pointer' }}>
              <span>My Profile</span>
              <ProfileIcon>
                <AiOutlineUser color="white" />
              </ProfileIcon>
            </ProfileSection>
          </SidebarContainer>
        )}
      </AnimatePresence>
    </>
  );
}