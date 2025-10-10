/* eslint-disable @typescript-eslint/no-explicit-any */
import { timeAgo } from "@/common/timeAgo"
import { useSaveOrUpdateReactionSocialPostMutation } from "@/store/features/socialPost/social.api"
import { TSocialPost } from "@/store/storeTypes/social"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

interface PostCardProps {
  post: TSocialPost
}

const PostCard = ({ post }: PostCardProps) => {
  const [saveReaction] = useSaveOrUpdateReactionSocialPostMutation();
  const [isLiked, setIsLiked] = useState(!!post?.reaction?.length);
  const [likeCount, setLikeCount] = useState(post?.reaction?.length || 0);
  const userId = useSelector((state: any) => state.auth.user.profile._id);
  console.log(userId, "user");


  const handleLike = async () => {
    try {
      // optimistic update
      const nextLiked = !isLiked
      setIsLiked(nextLiked)
      setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1))

      // send only _id to backend
      await saveReaction({
        id: post._id,
        body: { reaction: true },
      }).unwrap()
    } catch (error) {
      console.error("Failed to update reaction:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
        <img
          src={
            post?.postedBy?.profile_photo?.trim()
              ? post.postedBy.profile_photo
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">
              {post?.postedBy?.firstName} {post?.postedBy?.lastName}
            </h3>
            {post?.profileType && (
              <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-[25px]">
                {post.profileType}
              </span>
            )}
            {post?.topic && (
              <span className="px-2 py-0.5 bg-gray-200 text-black text-xs rounded-[25px]">
                {post.topic}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{timeAgo(post?.createdAt)}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4 leading-relaxed">{post?.content}</p>

      {/* Post Image */}
      {post?.postImage && (
        <img
          src={post.postImage}
          alt="Post image"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* ✅ Reaction Buttons */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors 
           ${post?.reaction?.includes(userId)  ? "text-red-500" : "text-gray-600 hover:text-red-500"}
            `}

        >
          <Heart
            className={`w-5 h-5 cursor-pointer 
              ${post?.reaction?.includes(userId) ? "fill-current" : ""}
            `}

          />
          <span className="text-sm">{likeCount}</span>
        </button>

        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{post?.comments?.length || 0}</span>
        </button>

        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">{post?.share || 0}</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard;
