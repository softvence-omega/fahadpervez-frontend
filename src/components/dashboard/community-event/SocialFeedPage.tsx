import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Filter, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  date: string;
}

interface SocialFeedPageProps {
  posts: Post[];
  isLoading: boolean;
}

const SocialFeedPage: React.FC<SocialFeedPageProps> = ({
  posts,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="flex gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <CardTitle>Social Feed</CardTitle>
        </div>
        <CardDescription>Stay connected with the community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Input placeholder="Search posts..." className="max-w-sm" />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {post.date}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {post.likes} likes
                </div>
              </div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-muted-foreground">{post.content}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  {post.comments} Comments
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default SocialFeedPage;
