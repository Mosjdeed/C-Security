import { useEffect, useRef, useState } from "react";
import { mockResponses } from "../../data/mockChats";
import AiImage from "../../assets/aibot.png";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsSend, BsMic, BsArrowRepeat, BsStop } from "react-icons/bs";
import {
  BiMessageSquareDetail,
  BiCopy,
  BiLike,
  BiDislike,
  BiVolumeFull,
} from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  background: #2a2a2a;
  display: flex;
  flex-direction: column;
  overflow: hidden; // Add this
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center; // Center content
  ${props => props.isWelcome && `
    justify-content: center;
    overflow: hidden;
  `}
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 800px; // Adjusted width
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 100px; // Add space for fixed input area
`;

const WelcomeContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #4b5dff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const WelcomeText = styled.h1`
  color: white;
  font-size: 2.5rem !important;
  margin: 0;
  margin-bottom: 10px; // Added margin bottom
`;

const SubText = styled.p`
  color: #999;
  margin: 0;
  margin-bottom: 30px; // Added margin bottom
`;

const MessageWithAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%; // Add this to ensure proper alignment
`;
const Message = styled(motion.div)`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  position: relative;
  ${(props) =>
    props.sender === "user"
      ? `
    background: #4b5dff;
    margin-left: auto;
    color: white;
  `
      : `
    background: #3a3a3a;
    margin-right: auto;
    margin-left: 0; // Force bot messages to the left
    color: white;
  `}
`;

const MessageContent = styled.div`
  margin-bottom: ${(props) => (props.sender === "bot" ? "1.5rem" : "0")};
`;

const MessageActions = styled.div`
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #3a3a3a;
  border-radius: 0.5rem;
  margin-right: auto;
  max-width: 70%;
`;

const InputArea = styled.div`
  padding: 1rem;
  position: fixed; // Changed to fixed
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  background: #2a2a2a; // Added background
  z-index: 10;

  ${props => props.isWelcome && `
    bottom: 25%;
    background: transparent;
  `}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(58, 58, 58, 0.8);
  padding: 1rem 1.5rem; // Increased padding
  border-radius: 8px;
  backdrop-filter: blur(10px);
  margin: 0 auto;
  width: 95%; // Increased width
  max-width: 900px; // Increased max-width
  transform: translateX(20px); // Move right
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 1rem; // Slightly larger font
  padding: 0.5rem 0; // Added vertical padding
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #666;
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: #4b5dff;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(75, 93, 255, 0.1);
    border-radius: 4px;
  }
`;

const ActionIcon = styled(motion.button)`
  background: none;
  border: none;
  color: #666;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #4b5dff;
  }
`;

const AvatarImage = styled.img`
  width: ${(props) => (props.welcome ? "120px" : "32px")};
  height: ${(props) => (props.welcome ? "120px" : "32px")};
  border-radius: 50%;
  margin: ${(props) => (props.welcome ? "1rem 0" : "0")};
  object-fit: cover;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #4b5dff;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const FeedbackModal = styled(Modal)`
  .modal-content {
    background: #2a2a2a;
    color: white;
    border-radius: 12px;
  }
  .modal-header {
    border-bottom: 1px solid #333;
  }
  .modal-footer {
    border-top: 1px solid #333;
  }
  .close {
    color: white;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

const Star = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.active ? "#4b5dff" : "#666")};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #4b5dff;
  }
`;
const StopButton = styled(motion.button)`
  background: none;
  border: none;
  color: #4b5dff;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(75, 93, 255, 0.1);
    border-radius: 4px;
  }
`;

const TypingText = ({ text, shouldStop, messageId }) => {
  const [displayedText, setDisplayedText] = useState("");
  const timerRef = useRef(null);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (isStopped) return; // Don't continue if this message was stopped

    let index = 0;
    const typeNextChar = () => {
      if (index < text.length && !shouldStop) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timerRef.current = setTimeout(typeNextChar, 30);
      } else if (shouldStop) {
        setIsStopped(true);
      }
    };

    timerRef.current = setTimeout(typeNextChar, 30);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, shouldStop]);

  return <span>{displayedText}</span>;
};

function LoadingIndicator() {
  return (
    <TypingIndicator>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </TypingIndicator>
  );
}

function MessageComponent({ msg, onRegenerate, shouldStop }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messageState, setMessageState] = useState('typing'); // 'typing', 'stopped', 'complete'
  const isNew = msg.isNew;

  useEffect(() => {
    if (shouldStop && messageState === 'typing') {
      setMessageState('stopped');
    }
  }, [shouldStop]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text);
  };

  const handleRate = (value) => {
    setRating(value);
  };

  const handleTextToSpeech = () => {
    if (isSpeaking) return;
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(msg.text);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <MessageWithAvatar>
      {msg.sender === "bot" && <AvatarImage src={AiImage} alt="AI" />}
      <Message sender={msg.sender}>
        <MessageContent sender={msg.sender}>
          {isNew && msg.sender === "bot" ? (
            <TypingText 
              text={msg.text} 
              shouldStop={messageState === 'stopped' || shouldStop}
              messageId={msg.id}
            />
          ) : (
            msg.text
          )}
        </MessageContent>
        {msg.sender === "bot" && (
          <>
            <MessageActions>
              <ActionIcon onClick={handleCopy}>
                <BiCopy size={16} />
              </ActionIcon>
              <ActionIcon onClick={handleLike}>
                <BiLike size={16} color={isLiked ? "#4b5dff" : "#666"} />
              </ActionIcon>
              <ActionIcon onClick={() => setShowModal(true)}>
                <BiDislike size={16} />
              </ActionIcon>
              <ActionIcon onClick={handleTextToSpeech}>
                <BiVolumeFull size={16} />
              </ActionIcon>
              <ActionIcon onClick={onRegenerate}>
                <BsArrowRepeat size={16} />
              </ActionIcon>
            </MessageActions>

            <FeedbackModal
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
            >
              <Modal.Header>
                <Modal.Title>Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <StarRating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      active={star <= rating}
                      onClick={() => handleRate(star)}
                    >
                      {star <= rating ? (
                        <AiFillStar size={24} />
                      ) : (
                        <AiOutlineStar size={24} />
                      )}
                    </Star>
                  ))}
                </StarRating>
                <Form>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="We appreciate your feedback. Please share any comments or suggestions..."
                      className="bg-dark text-white border-0 p-3 outline-none"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  style={{ background: "#4b5dff" }}
                  onClick={() => setShowModal(false)}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </FeedbackModal>
          </>
        )}
      </Message>
    </MessageWithAvatar>
  );
}

export default function ChatArea({ selectedChat, messages, onUpdateMessages }) {
  const [inputValue, setInputValue] = useState("");
  const [showWelcome, setShowWelcome] = useState(!selectedChat && (!messages || messages.length === 0));
  const [isTyping, setIsTyping] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [shouldStopTyping, setShouldStopTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const responseTimeoutRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setShowWelcome(!selectedChat && (!messages || messages.length === 0));
  }, [selectedChat, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleStopResponse = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setShouldStopTyping(true);
    setIsResponding(false);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isResponding) return;

    setShouldStopTyping(false);
    const newUserMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
    };

    const updatedMessages = [...(messages || []), newUserMessage];
    onUpdateMessages(updatedMessages);
    setInputValue("");
    setShowWelcome(false);
    setIsResponding(true);
    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botResponse = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "bot",
        isNew: true,
        messageState: 'typing'
      };

      setIsTyping(false);
      
      const newMessages = [...updatedMessages, botResponse];
      onUpdateMessages(newMessages);
      
      typingTimeoutRef.current = setTimeout(() => {
        setIsResponding(false);
      }, randomResponse.length * 30 + 100);
    }, 1500);
  };

  const handleRegenerate = () => {
    if (!messages || messages.length === 0 || isResponding) return;

    setShouldStopTyping(false);
    const lastUserMessage = messages.filter(msg => msg.sender === "user").pop();
    if (lastUserMessage) {
      setIsResponding(true);
      setIsTyping(true);

      responseTimeoutRef.current = setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

        const botResponse = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "bot",
          isNew: true,
          messageState: 'typing'
        };

        setIsTyping(false);
        
        const newMessages = [...messages, botResponse];
        onUpdateMessages(newMessages);
        
        typingTimeoutRef.current = setTimeout(() => {
          setIsResponding(false);
        }, randomResponse.length * 30 + 100);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isResponding) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <MessagesArea isWelcome={showWelcome}>
        {showWelcome ? (
          <>
            <WelcomeContainer>
              <Logo>
                <BiMessageSquareDetail size={32} />
                c-security
              </Logo>
              <AvatarImage welcome src={AiImage} alt="AiImage" />
              <WelcomeText>Hi, I'm AI Chat</WelcomeText>
              <SubText>How can I help you today?</SubText>
            </WelcomeContainer>
            <InputArea isWelcome={true}>
              <InputContainer isWelcome={true}>
                <Input
                  placeholder={isResponding ? "Please wait for response..." : "Message AI Chat..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isResponding}
                  style={{ opacity: isResponding ? 0.7 : 1 }}
                />
                <ActionButtons>
                  <IconButton 
                    whileHover={{ scale: 1.1 }}
                    disabled={isResponding}
                    style={{ opacity: isResponding ? 0.7 : 1 }}
                  >
                    <BsMic size={20} />
                  </IconButton>
                  {isResponding ? (
                    <StopButton 
                      whileHover={{ scale: 1.1 }} 
                      onClick={handleStopResponse}
                    >
                      <BsStop size={20} />
                    </StopButton>
                  ) : (
                    <IconButton 
                      whileHover={{ scale: 1.1 }} 
                      onClick={handleSend}
                      disabled={isResponding}
                      style={{ opacity: isResponding ? 0.7 : 1 }}
                    >
                      <BsSend size={20} />
                    </IconButton>
                  )}
                </ActionButtons>
              </InputContainer>
            </InputArea>
          </>
        ) : (
          <>
            <MessagesList>
              {messages && messages.map((msg) => (
                <MessageComponent
                  key={msg.id}
                  msg={msg}
                  onRegenerate={handleRegenerate}
                  shouldStop={shouldStopTyping}
                />
              ))}
              {isTyping && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </MessagesList>
            <InputArea isWelcome={false}>
              <InputContainer isWelcome={false}>
                <Input
                  placeholder={isResponding ? "Please wait for response..." : "Message AI Chat..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isResponding}
                  style={{ opacity: isResponding ? 0.7 : 1 }}
                />
                <ActionButtons>
                  <IconButton 
                    whileHover={{ scale: 1.1 }}
                    disabled={isResponding}
                    style={{ opacity: isResponding ? 0.7 : 1 }}
                  >
                    <BsMic size={20} />
                  </IconButton>
                  {isResponding ? (
                    <StopButton 
                      whileHover={{ scale: 1.1 }} 
                      onClick={handleStopResponse}
                    >
                      <BsStop size={20} />
                    </StopButton>
                  ) : (
                    <IconButton 
                      whileHover={{ scale: 1.1 }} 
                      onClick={handleSend}
                      disabled={isResponding}
                      style={{ opacity: isResponding ? 0.7 : 1 }}
                    >
                      <BsSend size={20} />
                    </IconButton>
                  )}
                </ActionButtons>
              </InputContainer>
            </InputArea>
          </>
        )}
      </MessagesArea>
    </ChatContainer>
  );
}