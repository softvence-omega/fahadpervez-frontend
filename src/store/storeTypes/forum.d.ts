type TForumGet = {
  _id: string;
  title: string;
  category: string;
  content: string;
  postedBy: {
    _id: string;
    firstName?: string;
    lastName?: string;
    profile_photo: string;
  };
  profileType: "student_profile"; // could be extended if other types exist
  tags: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type ForumPosts = TForumGet[];