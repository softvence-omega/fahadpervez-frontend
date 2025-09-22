// import  { useState } from "react";
// import { Search, Phone, Video, MoreHorizontal, Send, Paperclip, Lightbulb, Heart, ThumbsUp } from "lucide-react";

// const LiveChat = () => {
//   const [message, setMessage] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState("general");

//   const rooms = [
//     {
//       id: "general",
//       name: "General Discussion",
//       members: 1247,
//       lastMessage: "Anyone studying for USMLE...",
//       timestamp: "2 min ago",
//       isActive: true,
//       unread: 0
//     },
//     {
//       id: "cardiology",
//       name: "Cardiology Study Group",
//       members: 456,
//       lastMessage: "ECG interpretation tips?",
//       timestamp: "5 min ago",
//       isActive: false,
//       unread: 3
//     },
//     {
//       id: "surgery",
//       name: "Surgery Residents",
//       members: 189,
//       lastMessage: "Case discussion tomorrow",
//       timestamp: "1 hour ago",
//       isActive: true,
//       unread: 0
//     },
//     {
//       id: "nursing",
//       name: "Nursing Students",
//       members: 892,
//       lastMessage: "NCLEX prep materials",
//       timestamp: "3 hours ago",
//       isActive: false,
//       unread: 1
//     }
//   ];

//   const messages = [
//     {
//       id: 1,
//       author: {
//         name: "Sarah Chen",
//         avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face",
//         isOnline: true
//       },
//       timestamp: "10:30 AM",
//       content: "Hi everyone! I'm struggling with understanding cardiac output calculations. Can anyone help explain?",
//       reactions: {
//         heart: 3,
//         thumbsUp: 5
//       },
//       replies: []
//     },
//     {
//       id: 2,
//       author: {
//         name: "Dr. Rodriguez",
//         avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face",
//         isOnline: true
//       },
//       timestamp: "10:32 AM",
//       content: "Cardiac Output = Heart Rate × Stroke Volume. It's the amount of blood pumped by the heart per minute. For a normal adult, it's about 5L/min.",
//       replyTo: {
//         author: "Sarah Chen",
//         preview: "Hi everyone! I'm struggling with understanding car..."
//       },
//       reactions: {
//         heart: 3,
//         thumbsUp: 5
//       },
//       aiSuggestion: {
//         icon: "💡",
//         text: "AI Suggestion",
//         content: "This explanation covers the basics well. Consider adding factors that affect cardiac output."
//       },
//       replies: []
//     },
//     {
//       id: 3,
//       author: {
//         name: "Alex Thompson",
//         avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//         isOnline: false
//       },
//       timestamp: "10:35 AM",
//       content: "That's super helpful! Are there any good mnemonics for remembering the factors that affect stroke volume?",
//       replyTo: {
//         author: "Dr. Rodriguez",
//         preview: "Cardiac Output = Heart Rate × Stroke Volume. It's..."
//       },
//       reactions: {
//         heart: 2,
//         thumbsUp: 3
//       },
//       replies: []
//     },
//     {
//       id: 4,
//       author: {
//         name: "Dr. Martinez",
//         avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face",
//         isOnline: true
//       },
//       timestamp: "10:38 AM",
//       content: "Try 'PPP' - Preload, Postload (afterload), and Pump function (contractility). These are the three main factors affecting stroke volume!",
//       replyTo: {
//         author: "Alex Thompson",
//         preview: "That's super helpful! Are there any good mnemonics..."
//       },
//       reactions: {
//         heart: 8,
//         thumbsUp: 12
//       },
//       replies: []
//     }
//   ];

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       // Handle sending message logic here
//       setMessage("");
//     }
//   };

//   const formatReactions = (reactions) => {
//     const total = Object.values(reactions).reduce((sum, count) => sum + count, 0);
//     return total;
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         {/* Sidebar Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex space-x-4 mb-4">
//             <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
//               Rooms
//             </button>
//             <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
//               Messages
//             </button>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search chats..."
//               className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Rooms List */}
//         <div className="flex-1 overflow-y-auto">
//           {rooms.map((room) => (
//             <div
//               key={room.id}
//               onClick={() => setSelectedRoom(room.id)}
//               className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedRoom === room.id ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
//               }`}
//             >
//               <div className="flex items-center justify-between mb-1">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   </div>
//                   <h4 className="font-medium text-gray-900 text-sm">{room.name}</h4>
//                   {room.isActive && (
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   )}
//                 </div>
//                 {room.unread > 0 && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     {room.unread}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mb-1">{room.members} members</p>
//               <div className="flex items-center justify-between">
//                 <p className="text-xs text-gray-600 truncate flex-1 mr-2">{room.lastMessage}</p>
//                 <span className="text-xs text-gray-400">{room.timestamp}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="px-6 py-4 border-b border-gray-200 bg-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
//                 <div className="w-3 h-3 bg-white rounded-full"></div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">General Discussion</h3>
//                 <p className="text-sm text-gray-500">1247 members</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
//                 <Phone size={18} />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
//                 <Video size={18} />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
//                 <MoreHorizontal size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-6 overflow-y-auto space-y-4">
//           {messages.map((msg) => (
//             <div key={msg.id} className="group">
//               <div className="flex items-start space-x-3">
//                 <div className="relative">
//                   <img
//                     src={msg.author.avatar}
//                     alt={msg.author.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   {msg.author.isOnline && (
//                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <h4 className="font-medium text-gray-900 text-sm">{msg.author.name}</h4>
//                     <span className="text-xs text-gray-500">{msg.timestamp}</span>
//                   </div>

//                   {/* Reply indicator */}
//                   {msg.replyTo && (
//                     <div className="mb-2 p-2 bg-gray-100 rounded-lg text-xs text-gray-600 border-l-2 border-gray-300">
//                       <span className="font-medium">Replying to: {msg.replyTo.author}</span>
//                       <p className="truncate mt-1">{msg.replyTo.preview}</p>
//                     </div>
//                   )}

//                   <div className="bg-gray-100 p-3 rounded-lg max-w-2xl">
//                     <p className="text-gray-800 text-sm leading-relaxed">{msg.content}</p>
//                   </div>

//                   {/* AI Suggestion */}
//                   {msg.aiSuggestion && (
//                     <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl">
//                       <div className="flex items-center space-x-2 mb-1">
//                         <Lightbulb size={14} className="text-yellow-600" />
//                         <span className="text-xs font-medium text-yellow-800">{msg.aiSuggestion.text}</span>
//                       </div>
//                       <p className="text-xs text-yellow-700">{msg.aiSuggestion.content}</p>
//                     </div>
//                   )}

//                   {/* Reactions */}
//                   <div className="flex items-center space-x-4 mt-2">
//                     <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500">
//                       <Heart size={12} />
//                       <span>{msg.reactions.heart}</span>
//                     </button>
//                     <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-500">
//                       <ThumbsUp size={12} />
//                       <span>{msg.reactions.thumbsUp}</span>
//                     </button>
//                     <button className="text-xs text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
//                       Reply
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* AI Tip */}
//         <div className="px-6 py-2 bg-yellow-50 border-t border-yellow-200">
//           <div className="flex items-center space-x-2">
//             <Lightbulb size={14} className="text-yellow-600" />
//             <span className="text-xs text-yellow-700">AI Tip: Use medical terminology for better study discussions</span>
//           </div>
//         </div>

//         {/* Input Bar */}
//         <div className="p-4 border-t border-gray-200 bg-white">
//           <div className="flex items-end space-x-3">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                 <Paperclip size={18} />
//               </button>
//             </div>
//             <button
//               onClick={handleSendMessage}
//               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveChat;

import { useState } from "react";
import {
  Search,

  MoreHorizontal,
  Send,
  Paperclip,
  Lightbulb,
  Heart,
  ThumbsUp,
  Menu,
  X,

} from "lucide-react";

const LiveChat = () => {
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Rooms");

  const rooms = [
    {
      id: "general",
      name: "General Discussion",
      members: 1247,
      lastMessage: "Anyone studying for USMLE...",
      timestamp: "2 min ago",
      isActive: true,
      unread: 0,
    },
    {
      id: "cardiology",
      name: "Cardiology Study Group",
      members: 456,
      lastMessage: "ECG interpretation tips?",
      timestamp: "5 min ago",
      isActive: false,
      unread: 3,
    },
    {
      id: "surgery",
      name: "Surgery Residents",
      members: 189,
      lastMessage: "Case discussion tomorrow",
      timestamp: "1 hour ago",
      isActive: true,
      unread: 0,
    },
    {
      id: "nursing",
      name: "Nursing Students",
      members: 892,
      lastMessage: "NCLEX prep materials",
      timestamp: "3 hours ago",
      isActive: false,
      unread: 1,
    },
  ];

  const messages = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face",
        isOnline: true,
      },
      timestamp: "10:30 AM",
      content:
        "Hi everyone! I'm struggling with understanding cardiac output calculations. Can anyone help explain?",
      reactions: {
        heart: 3,
        thumbsUp: 5,
      },
      replies: [],
    },
    {
      id: 2,
      author: {
        name: "Dr. Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face",
        isOnline: true,
      },
      timestamp: "10:32 AM",
      content:
        "Cardiac Output = Heart Rate × Stroke Volume. It's the amount of blood pumped by the heart per minute. For a normal adult, it's about 5L/min.",
      replyTo: {
        author: "Sarah Chen",
        preview: "Hi everyone! I'm struggling with understanding car...",
      },
      reactions: {
        heart: 3,
        thumbsUp: 5,
      },
      aiSuggestion: {
        icon: "💡",
        text: "AI Suggestion",
        content:
          "This explanation covers the basics well. Consider adding factors that affect cardiac output.",
      },
      replies: [],
    },
    {
      id: 3,
      author: {
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        isOnline: false,
      },
      timestamp: "10:35 AM",
      content:
        "That's super helpful! Are there any good mnemonics for remembering the factors that affect stroke volume?",
      replyTo: {
        author: "Dr. Rodriguez",
        preview: "Cardiac Output = Heart Rate × Stroke Volume. It's...",
      },
      reactions: {
        heart: 2,
        thumbsUp: 3,
      },
      replies: [],
    },
    {
      id: 4,
      author: {
        name: "Dr. Martinez",
        avatar:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face",
        isOnline: true,
      },
      timestamp: "10:38 AM",
      content:
        "Try 'PPP' - Preload, Postload (afterload), and Pump function (contractility). These are the three main factors affecting stroke volume!",
      replyTo: {
        author: "Alex Thompson",
        preview: "That's super helpful! Are there any good mnemonics...",
      },
      reactions: {
        heart: 8,
        thumbsUp: 12,
      },
      replies: [],
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message logic here
      setMessage("");
    }
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const selectedRoomData = rooms.find((room) => room.id === selectedRoom);

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 
        w-80 sm:w-96 lg:w-80 xl:w-96
        bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Chat Rooms</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex space-x-2 sm:space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("Rooms")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === "Rooms"
                  ? "text-white bg-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => setActiveTab("Messages")}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === "Messages"
                  ? "text-white bg-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Messages
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Rooms List */}
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => handleRoomSelect(room.id)}
              className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedRoom === room.id
                  ? "bg-blue-50 border-r-2 border-r-blue-600"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {room.name}
                  </h4>
                  {room.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                {room.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                    {room.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-1">
                {room.members} members
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600 truncate flex-1 mr-2">
                  {room.lastMessage}
                </p>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {room.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden flex-shrink-0"
              >
                <Menu size={18} />
              </button>

              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full"></div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {selectedRoomData?.name || "General Discussion"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {selectedRoomData?.members || 1247} members
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4 " />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto space-y-3 sm:space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="group">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={msg.author.avatar}
                    alt={msg.author.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  {msg.author.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {msg.author.name}
                    </h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Reply indicator */}
                  {msg.replyTo && (
                    <div className="mb-2 p-2 sm:p-3 bg-gray-100 rounded-lg text-xs text-gray-600 border-l-2 border-gray-300">
                      <span className="font-medium">
                        Replying to: {msg.replyTo.author}
                      </span>
                      <p className="truncate mt-1">{msg.replyTo.preview}</p>
                    </div>
                  )}

                  <div className="bg-gray-100 p-2.5 sm:p-3 rounded-lg">
                    <p className="text-gray-800 text-sm leading-relaxed break-words">
                      {msg.content}
                    </p>
                  </div>

                  {/* AI Suggestion */}
                  {msg.aiSuggestion && (
                    <div className="mt-2 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Lightbulb className="text-yellow-600 flex-shrink-0 w-3 h-3 md:w-[14px] md:h-[14px]" />
                        <span className="text-xs font-medium text-yellow-800">
                          {msg.aiSuggestion.text}
                        </span>
                      </div>
                      <p className="text-xs text-yellow-700 break-words">
                        {msg.aiSuggestion.content}
                      </p>
                    </div>
                  )}

                  {/* Reactions */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mt-2">
                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500">
                      <Heart className=" w-[10px] h-[10px] md:w-3 md:h-3" />
                      <span>{msg.reactions.heart}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-500">
                      <ThumbsUp className=" w-[10px] h-[10px] md:w-3 md:h-3" />
                      <span>{msg.reactions.thumbsUp}</span>
                    </button>
                    <button className="text-xs text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tip */}
        <div className="px-3 sm:px-4 lg:px-6 py-2 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center space-x-2">
            <Lightbulb className="text-yellow-600 flex-shrink-0 w-3 h-3 md:w-[14px] md:h-[14px]" />
            <span className="text-xs text-yellow-700">
              AI Tip: Use medical terminology for better study discussions
            </span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full p-2.5 sm:p-3 pr-10 sm:pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2.5 sm:p-3 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
