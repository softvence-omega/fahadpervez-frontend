import question from "@/assets/dashboard/question.svg";

interface ForumPost {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  tags: string[]
  category: string
}

interface ForumListProps {
  onForumClick: (id: string) => void
}

const ForumList = ({ onForumClick }: ForumListProps) => {
  const forums: ForumPost[] = [
    {
      id: "1",
      title: "Best mnemonics for remembering cranial nerves?",
      description:
        "I'm struggling to memorize all 12 cranial nerves and their functions. What mnemonics have worked best for you?",
      author: "Sumi M",
      timeAgo: "2 hours ago",
      tags: ["#CranTips", "#Neurology"],
      category: "Anatomy",
    },
    {
      id: "2",
      title: "Best mnemonics for remembering cranial nerves?",
      description:
        "I'm struggling to memorize all 12 cranial nerves and their functions. What mnemonics have worked best for you?",
      author: "Sumi M",
      timeAgo: "2 hours ago",
      tags: ["#CranTips", "#Neurology"],
      category: "Anatomy",
    },
    {
      id: "3",
      title: "Best mnemonics for remembering cranial nerves?",
      description:
        "I'm struggling to memorize all 12 cranial nerves and their functions. What mnemonics have worked best for you?",
      author: "Sumi M",
      timeAgo: "2 hours ago",
      tags: ["#CranTips", "#Neurology"],
      category: "Anatomy",
    },
  ]

  return (
    <div className="space-y-4">
      {forums.map((forum) => (
        <div
          key={forum.id}
          onClick={() => onForumClick(forum.id)}
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={question} alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{forum.title}</h3>
            </div>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white text-xs rounded-full w-fit">
              {forum.category}
            </span>
          </div>

          <p className="text-gray-600 mb-3 text-sm sm:text-base">{forum.description}</p>
          
          <div className="mt-4 sm:mt-6 space-y-2">
            <div className="flex gap-2 flex-wrap">
              {forum.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-black text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 ">
              {forum.author} • {forum.timeAgo}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ForumList;