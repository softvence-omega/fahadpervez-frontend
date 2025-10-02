import { useState } from "react"
import PostCard from "./PostCard"
import MentorSearchFilter from "./MentorSearchFilter";
import img from "@/assets/dashboard/cardio.png";
import { Textarea } from "@/components/ui/textarea"
import { Image, Paperclip } from "lucide-react";
import MentorUploadFiles from "./MentorUploadFiles";
import ForumDetail from "./ForumDetail";
import CreateDiscussion from "./CreateDiscussion";
import { z } from "zod";

type ForumView = "list" | "detail" | "create";

interface Post {
    id: string
    author: {
        name: string
        handle: string
        avatar: string
        timeAgo: string
    }
    badge?: string
    category?: string
    content: string
    image?: string
    hashtags?: string[]
    likes: number
    comments: number
    shares: number
    isLiked?: boolean
}

// Zod schema for form validation
const postSchema = z.object({
    content: z.string().min(1, "Content is required"),
    image: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

const SocialFeed = () => {
    const [text, setText] = useState("");
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [view, setView] = useState<ForumView>("list");
    const [selectedForumId, setSelectedForumId] = useState<string | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [posts, setPosts] = useState<Post[]>([
        {
            id: "1",
            author: {
                name: "Dr. Sarah Chen",
                handle: "@dr.sarah.chen",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                timeAgo: "2 hours ago",
            },
            badge: "Mentor",
            category: "Cardiology",
            content:
                "Just finished an amazing case presentation on acute MI management! Golden hour matters, but comprehensive care extends far beyond.",
            image: img,
            hashtags: ["#Cardiology", "#MedicalEducation"],
            likes: 247,
            comments: 23,
            shares: 15,
        },
        {
            id: "2",
            author: {
                name: "Alex Thompson",
                handle: "@alex.thompson",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                timeAgo: "4 hours ago",
            },
            badge: "Moderator",
            content:
                "Great question: What's your go-to method for memorizing cranial nerves? Mnemonics? Songs?",
            likes: 89,
            comments: 34,
            shares: 8,
        },
        {
            id: "3",
            author: {
                name: "Jennifer Liu",
                handle: "@jennifer.liu",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
                timeAgo: "6 hours ago",
            },
            badge: "Peer",
            content:
                "NCLEX® review guide ready! Focus areas: Prioritization, delegation, infection control. Link in comments!",
            hashtags: ["#NCLEX", "#NursingEducation"],
            likes: 156,
            comments: 45,
            shares: 31,
        },
    ]);

    const handleLike = (postId: string) => {
        setPosts(
            posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                        isLiked: !post.isLiked,
                    }
                    : post,
            ),
        )
    };

    const handleBackToList = () => {
        setView("list");
        setSelectedForumId(null);
    };

    // Upload complete -> set the uploaded image
    const handleUploadComplete = (imageUrl: string) => {
        setUploadedImage(imageUrl);
        setShowUploadModal(false);
    };

    // Handle post submission - ONLY CONSOLE.LOG, NO UI UPDATE
    const handlePostSubmit = () => {
        try {
            // Prepare form data
            const formData: PostFormData = {
                content: text,
                image: uploadedImage || undefined,
            };

            // Validate with Zod
            const validatedData = postSchema.parse(formData);

            // Create FormData object for actual form submission
            const submissionFormData = new FormData();
            submissionFormData.append('content', validatedData.content);
            if (validatedData.image) {
                submissionFormData.append('image', validatedData.image);
            }

            // ONLY CONSOLE.LOG - NO UI UPDATE
            console.log('Form Data:', {
                content: validatedData.content,
                image: validatedData.image
            });

            // Reset form after console.log
            setText("");
            setUploadedImage(null);
        } catch (error) {
            console.error('Form validation error:', error);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        setText("");
        setUploadedImage(null);
    };

    return (
        <div>
            <div className="mb-4 md:mb-8 space-y-2">
                <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
                    Social Feed
                </h4>
                <p className="text-[14px] md:text-[16px] text-gray-600">Share knowledge, ask questions, and connect with the medical community</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4">
                    <MentorSearchFilter />
                </div>

                {/* Main Feed */}
                <div className="w-full lg:w-3/4 flex flex-col gap-4">
                    {/* Posts */}
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} onLike={handleLike} />
                        ))}
                    </div>

                    {/* Example Question Box */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3">
                            <div className="flex-1">
                                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-[25px]">Anatomy</span>
                                <h4 className="text-[16px] font-medium mt-2 mb-4 sm:mb-6">
                                    Best mnemonics for remembering cranial nerves?
                                </h4>
                                <p className="text-sm text-[#71717A] mb-4">
                                    I'm struggling to memorize all 12 cranial nerves. What mnemonics have worked best for you?
                                </p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="px-2 py-1 bg-[#F6F6F6] text-[#000] text-xs rounded border border-gray-400">#CranTips</span>
                                    <span className="px-2 py-1 bg-[#F6F6F6] text-[#000] text-xs rounded border border-gray-400">#Neurology</span>
                                </div>
                                <p className="text-sm text-gray-600 my-2">
                                    <span className="font-medium">Sarah M.</span> • 2nd Year • 2 hours ago
                                </p>
                                <button className="py-2 px-4 bg-[#418AFF] text-white rounded-[6px] hover:bg-blue-500 mt-2 sm:mt-0">Give Answer</button>
                            </div>
                        </div>
                    </div>

                    {/* New Post Box */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                        <h4 className="text-[16px] text-[#71717A] font-medium mb-4">
                            What's on your mind?
                        </h4>

                        {/* Show uploaded image preview */}
                        {uploadedImage && (
                            <div className="mb-4">
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded preview"
                                    className="max-w-full h-auto max-h-48 rounded-lg object-cover"
                                />
                            </div>
                        )}

                        <Textarea
                            className="w-full rounded-md h-24 p-3 text-sm placeholder:text-gray-500 resize-none"
                            placeholder="What's on your mind? Share a study tip, ask a question, or start a discussion..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 text-black">
                                {/* these open the modal */}
                                <button onClick={() => setShowUploadModal(true)} type="button">
                                    <Image className="w-5 h-5 cursor-pointer" />
                                </button>
                                <button onClick={() => setShowUploadModal(true)} type="button">
                                    <Paperclip className="w-5 h-5 cursor-pointer" />
                                </button>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap">
                                <button
                                    onClick={handlePostSubmit}
                                    disabled={!text.trim()}
                                    className="px-4 py-1.5 rounded bg-[#030213] text-white text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    Post
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-1.5 rounded bg-gray-100 text-black hover:bg-gray-300 text-sm font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditional Views */}
                {view === "detail" && selectedForumId && (
                    <ForumDetail forumId={selectedForumId} onBack={handleBackToList} />
                )}
                {view === "create" && <CreateDiscussion onBack={handleBackToList} />}

                {/* Upload Modal (overlay) */}
                {showUploadModal && (
                    <MentorUploadFiles
                        onClose={() => setShowUploadModal(false)}
                        onUploadComplete={handleUploadComplete}
                    />
                )}
            </div>
        </div>
    )
}

export default SocialFeed;