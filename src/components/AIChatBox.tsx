import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Empty, Spin, Tag, Alert } from 'antd';
import { SendOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';
import { useAIStore } from '../store/useAIStore';
import { useUserStore } from '../store/useUserStore';
import './AIChatBox.scss';

const AIChatBox: React.FC = () => {
  const { messages, isGenerating, askQuestion, clearMessages } = useAIStore();
  const { role } = useUserStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAdmin = role === 'Admin';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input;
    setInput('');
    await askQuestion(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chatbox">
      <div className="chatbox-header">
        <h3>ZorFin AI Assistant</h3>
        {messages.length > 0 && isAdmin && (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={clearMessages}
          >
            Clear
          </Button>
        )}
      </div>

      {!isAdmin && (
        <Alert
          message="Admin Access Required"
          description="Only admin users can interact with the AI Assistant. Please contact your administrator for access."
          type="warning"
          showIcon
          icon={<LockOutlined />}
          style={{ margin: '1rem' }}
        />
      )}

      <div className="messages-container">
        {messages.length === 0 ? (
          <Empty
            description={
              isAdmin
                ? 'Start by asking about your finances'
                : 'Insufficient permissions'
            }
            style={{ marginTop: '2rem' }}
          />
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              <div className="message-bubble">
                {msg.role === 'assistant' && (
                  <Tag color="blue" className="ai-tag">
                    AI
                  </Tag>
                )}
                <p>{msg.content}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        {isGenerating && (
          <div className="message assistant loading">
            <div className="message-bubble">
              <Tag color="blue" className="ai-tag">
                AI
              </Tag>
              <Spin size="small" />
              <p>Analyzing your data...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <Input
          placeholder={
            isAdmin
              ? "Ask about your finances... (e.g., What's my balance? Where do I spend the most?)"
              : 'Admin only - Contact your administrator'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isGenerating || !isAdmin}
          className="chat-input"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={isGenerating}
          disabled={!input.trim() || isGenerating || !isAdmin}
          className="send-btn"
          title={!isAdmin ? 'Admin access required' : ''}
        />
      </div>
    </div>
  );
};

export default AIChatBox;
