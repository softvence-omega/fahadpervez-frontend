import question from "@/assets/dashboard/question.svg";
import GlobalLoader from "@/common/GlobalLoader";
import { useAllForumGetQuery } from "@/store/features/forum/forum.api";
import { TForumGet } from "@/store/storeTypes/forum";

interface ForumListProps {
  onForumClick: (id: string) => void;
}

const ForumList = ({ onForumClick }: ForumListProps) => {
  // Fetch forum posts
  const { data, isLoading, isError } = useAllForumGetQuery(undefined);

  // Loading state
  if (isLoading) return <GlobalLoader />;

  // Error or empty data
  if (isError || !data || data.length === 0)
    return <p className="text-center text-gray-500">No forum posts available</p>;

  return (
    <div className="space-y-4">
      {data?.data?.map((post: TForumGet) => ( 
        <div
          key={post._id}
          onClick={() => onForumClick(post._id)}
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          {/* Header: Icon + Title + Category */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={question} alt="icon" className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{post.title}</h3>
            </div>
            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white text-xs rounded-full w-fit">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-3 text-sm sm:text-base">{post.content}</p>

          {/* Tags and Author */}
          <div className="mt-4 sm:mt-6 space-y-2">
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-black text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {post.postedBy.firstName} {post.postedBy.lastName} •{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumList;
