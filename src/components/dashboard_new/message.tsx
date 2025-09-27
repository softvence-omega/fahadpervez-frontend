import React, { useState } from 'react';
import { Search, MessageCircle, Users, User, ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';

// Types
interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
  isGroup?: boolean;
  memberCount?: number;
  lastMessage?: string;
  timeAgo?: string;
  userType: 'individual' | 'group' | 'mentor';
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isReplyTo?: string;
  replyContent?: string;
  hasExplanation?: boolean;
  explanationText?: string;
}

// Demo Data
const demoUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Isabella',
    avatar: '/api/placeholder/32/32',
    status: 'online',
    lastSeen: 'Hi, how are you - 01:25 pm',
    userType: 'individual'
  },
  {
    id: '2', 
    name: 'Dr Elina Harrison',
    avatar: '/api/placeholder/32/32',
    status: 'online',
    lastSeen: 'See you - 01:25 pm',
    userType: 'mentor'
  },
  {
    id: '3',
    name: 'Isabella',
    avatar: '/api/placeholder/32/32', 
    status: 'offline',
    lastSeen: 'Hi, how are you - 01:25 pm',
    userType: 'individual'
  },
  {
    id: '4',
    name: 'General Discussion',
    avatar: '/api/placeholder/32/32',
    status: 'offline',
    lastSeen: '2 hrs ago',
    isGroup: true,
    memberCount: 1247,
    lastMessage: 'Anyone studying for USMLE ...',
    userType: 'group'
  },
  {
    id: '5',
    name: 'Study Group - Cardiology',
    avatar: '/api/placeholder/32/32',
    status: 'offline', 
    lastSeen: '2 hrs ago',
    isGroup: true,
    memberCount: 156,
    lastMessage: 'Tomorrow\'s quiz preparation...',
    userType: 'group'
  },
  {
    id: '6',
    name: 'Dr. Sarah Martinez',
    avatar: '/api/placeholder/32/32',
    status: 'online',
    lastSeen: 'Available for questions - 30 min ago',
    userType: 'mentor'
  },
  {
    id: '7',
    name: 'Prof. Michael Chen',
    avatar: '/api/placeholder/32/32',
    status: 'offline',
    lastSeen: 'Office hours: Mon-Fri 2-4pm',
    userType: 'mentor'
  }
];

const demoMessages: Message[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userAvatar: '/api/placeholder/32/32',
    content: 'Hi everyone! I\'m struggling with understanding cardiac output calculations. Can anyone help to explain?',
    timestamp: '10:30 AM',
    likes: 4,
    replies: 5
  },
  {
    id: '2', 
    userId: '2',
    userName: 'Dr. Rodriguez',
    userAvatar: '/api/placeholder/32/32',
    content: 'Cardiac Output = Heart Rate × Stroke Volume. It\'s the amount of blood pumped by the heart per minute. For a normal adult, it\'s about 5L/min.',
    timestamp: '10:32 AM',
    likes: 4,
    replies: 5,
    isReplyTo: 'Sarah Chen',
    replyContent: 'Replying to: Hi everyone! I\'m struggling with understanding car...',
    hasExplanation: true,
    explanationText: 'This explanation covers the basics well! Cardiac output factors that affect cardiac output.'
  },
  {
    id: '3',
    userId: '3', 
    userName: 'Alex Thompson',
    userAvatar: '/api/placeholder/32/32',
    content: 'That\'s super helpful! Are there any good mnemonics for remembering the factors that affect stroke volume?',
    timestamp: '10:35 AM',
    likes: 0,
    replies: 0,
    isReplyTo: 'Dr. Rodriguez',
    replyContent: 'Replying to: Cardiac Output = Heart Rate × StrokeVolume. It\'s...',
    hasExplanation: true,
    explanationText: 'This explanation covers the basics well! Cardiac output factors that affect cardiac output.'
  }
];

// Sidebar Component
const ChatSidebar: React.FC<{
  users: ChatUser[];
  activeUserId: string;
  onUserSelect: (userId: string) => void;
}> = ({ users, activeUserId, onUserSelect }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on active tab and search query
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "All") {
      return matchesSearch;
    } else if (activeTab === "Groups") {
      return matchesSearch && user.userType === "group";
    } else if (activeTab === "Mentor") {
      return matchesSearch && user.userType === "mentor";
    }

    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Top Section: Search + Tabs */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
        {/* Search Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by, contact or keyword"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex">
          {["All", "Groups", "Mentor"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section: User List */}
      <div className="flex-1 border border-gray-200 rounded-lg overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No {activeTab.toLowerCase()} found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                activeUserId === user.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {user.userType === "group" ? (
                    <Users className="w-6 h-6 text-gray-600" />
                  ) : user.userType === "mentor" ? (
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">Dr</span>
                    </div>
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                    {user.userType === "group" && user.memberCount && (
                      <span className="ml-1 text-xs text-gray-500">
                        {user.memberCount} members
                      </span>
                    )}
                    {user.userType === "mentor" && (
                      <span className="ml-1 text-xs text-blue-600 font-medium">
                        Mentor
                      </span>
                    )}
                  </h4>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {user.lastMessage || user.lastSeen}
                </p>
                {user.timeAgo && (
                  <p className="text-xs text-gray-400 mt-1">{user.timeAgo}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


// Main Chat Component
const ChatMain: React.FC<{
  messages: Message[];
  activeUser: ChatUser | undefined;
}> = ({ messages, activeUser }) => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-gray-600 mr-2" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">General Discussion</h2>
            <p className="text-sm text-gray-500">
              {activeUser?.isGroup ? `${activeUser.memberCount} members` : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
            {/* Reply Context */}
            {message.isReplyTo && (
              <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                <span className="font-medium">Replying to: {message.isReplyTo}</span>
                <p className="truncate">{message.replyContent}</p>
              </div>
            )}

            {/* Message Header */}
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {message.userName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{message.userName}</span>
                  <span className="text-sm text-gray-500">{message.timestamp}</span>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="mb-3">
              <p className="text-gray-800">{message.content}</p>
            </div>

            {/* Explanation Banner */}
            {message.hasExplanation && (
              <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">{message.explanationText}</p>
              </div>
            )}

            {/* Message Actions */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" />
                <span>{message.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageSquare className="w-4 h-4" />
                <span>{message.replies}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Chat Interface Component
const ChatInterface: React.FC = () => {
  const [activeUserId, setActiveUserId] = useState('4');
  const activeUser = demoUsers.find(user => user.id === activeUserId);

  return (
    <div className="h-screen flex bg-gray-100 gap-6 p-6">
      {/* Left Container - Sidebar */}
      <div className="w-80 bg-white border border-gray-200 rounded-lg flex flex-col">
        <ChatSidebar 
          users={demoUsers}
          activeUserId={activeUserId}
          onUserSelect={setActiveUserId}
        />
      </div>
      
      {/* Right Container - Chat Content */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col">
        <ChatMain 
          messages={demoMessages}
          activeUser={activeUser}
        />
      </div>
    </div>
  );
};


export default ChatInterface;