import { createContext, useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import AiTutorSidebar from "./AiTutorSidebar";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "All Communities", link: "/dashboard/all-communities" },
  { name: "Create New Discussion", link: "/dashboard/create-new-discussion" },
];

export interface Message {
  role: "user" | "ai";
  content: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

export interface ChatContextType {
  chats: Chat[];
  currentChatId: number | null;
  setCurrentChatId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredChats: Chat[];
  addNewChat: () => void;
  updateChatTitle: (id: number, title: string) => void;
  addMessage: (chatId: number, message: Message) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

const dummyChats: Chat[] = [
  {
    id: 1,
    title: "Medical Anatomy Class",
    messages: [
      {
        role: "ai",
        content:
          "AI medical anatomy is a fascinating and challenging subject...",
      },
      { role: "user", content: "I need Cardiology Notes" },
      {
        role: "ai",
        content:
          "Sure! Do you want general cardiology notes or a specific topic like heart failure or arrhythmias?",
      },
      { role: "user", content: "Give me detailed notes on Heart Failure" },
      {
        role: "ai",
        content:
          "Heart Failure occurs when the heart cannot pump blood efficiently. It is classified into left-sided, right-sided, systolic, and diastolic failure. Causes include hypertension, coronary artery disease, and valvular disorders...",
      },
      { role: "user", content: "Can you also create a quiz from these notes?" },
      {
        role: "ai",
        content:
          "Of course! I can generate a cardiology quiz on Heart Failure. How many questions would you like?",
      },
      { role: "user", content: "Generate 10 questions at basic level" },
      {
        role: "ai",
        content:
          "✅ Done! A 10-question basic-level quiz on Heart Failure has been generated for you.",
      },
    ],
  },
  {
    id: 2,
    title: "Neuroanatomy Study Session",
    messages: [
      {
        role: "ai",
        content:
          "Neuroanatomy deals with the structure and organization of the nervous system, including the brain, spinal cord, and peripheral nerves.",
      },
      { role: "user", content: "I need notes on the Cerebellum" },
      {
        role: "ai",
        content:
          "The cerebellum is located at the back of the brain and is responsible for motor coordination, balance, and posture. It consists of two hemispheres and is connected to the brainstem via three pairs of cerebellar peduncles.",
      },
      { role: "user", content: "Explain its functional divisions" },
      {
        role: "ai",
        content:
          "The cerebellum is divided into three functional regions: (1) Vestibulocerebellum – controls balance and eye movements, (2) Spinocerebellum – regulates body and limb movements, and (3) Cerebrocerebellum – involved in planning and initiating voluntary activity.",
      },
      { role: "user", content: "Good. Now make a quiz from these notes" },
      {
        role: "ai",
        content:
          "Sure! How many questions and difficulty level would you prefer?",
      },
      { role: "user", content: "5 questions, intermediate level" },
      {
        role: "ai",
        content:
          "✅ Done! A 5-question intermediate-level quiz on Cerebellum has been generated.",
      },
    ],
  },
  {
    id: 3,
    title: "Cardiology Notes",
    messages: [{ role: "user", content: "I need Cardiology Notes" }],
  },
];

const AITutor = () => {
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  useEffect(() => {
    setFilteredChats(
      chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, chats]);

  const addNewChat = () => {
    const newChat: Chat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const updateChatTitle = (id: number, title: string) => {
    setChats(chats.map((chat) => (chat.id === id ? { ...chat, title } : chat)));
  };

  const addMessage = (chatId: number, message: Message) => {
    setChats(
      chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const value: ChatContextType = {
    chats,
    currentChatId,
    setCurrentChatId,
    searchQuery,
    setSearchQuery,
    filteredChats,
    addNewChat,
    updateChatTitle,
    addMessage,
  };

  return (
    <ChatContext.Provider value={value}>
        <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex h-screen bg-gray-100">
        <AiTutorSidebar />
        <main className="flex-1 flex flex-col">
          <ChatWindow />
        </main>
      </div>
    </ChatContext.Provider>
  );
};

export default AITutor;
