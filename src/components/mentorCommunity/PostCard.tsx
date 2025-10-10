

import { timeAgo } from "@/common/timeAgo"
import { TSocialPost } from "@/store/storeTypes/social"
import { Heart, MessageCircle, Share2 } from "lucide-react"

// interface Post {
//     id: string
//     author: {
//         name: string
//         handle: string
//         avatar: string
//         timeAgo: string
//     }
//     badge?: string
//     category?: string
//     content: string
//     image?: string
//     hashtags?: string[]
//     likes: number
//     comments: number
//     shares: number
//     isLiked?: boolean
// }

interface PostCardProps {
    post: TSocialPost
    // onLike: (postId: string) => void
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
                <img src={post?.postedBy?.profile_photo  || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt={"Profile"} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{post?.postedBy?.firstName} {post?.postedBy?.lastName}</h3>
                        {post?.profileType && <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-[25px]">{post?.profileType}</span>}
                        {post?.topic && (
                            <span className="px-2 py-0.5 bg-gray-200 text-black text-xs rounded-[25px]">{post?.topic}</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500"> {timeAgo(post?.createdAt)}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

            {/* {post?.comments && (
                <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-24 sm:h-[256px] object-cover rounded-lg mb-4" />
            )} */}

            {/* {post.hashtags && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.hashtags.map((tag, index) => (
                        <span key={index} className="text-blue-600 text-sm">{tag}</span>
                    ))}
                </div>
            )} */}

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 pt-4 border-t border-gray-100">
                <button
                    // onClick={() => onLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${post.reaction.length ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
                >
                    <Heart className={`w-5 h-5 cursor-pointer ${post.reaction ? "fill-current" : ""}`} />
                    <span className="text-sm">{post?.reaction?.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post?.comments?.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{post?.share}</span>
                </button>
            </div>
        </div>
    )
}

export default PostCard;
