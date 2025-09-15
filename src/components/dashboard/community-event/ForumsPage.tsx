import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Plus } from "lucide-react";

interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastPost: string;
}

interface ForumsPageProps {
  threads: ForumThread[];
  isLoading: boolean;
}

const ForumsPage: React.FC<ForumsPageProps> = ({ threads, isLoading }) => {

  if (isLoading) {
       return <CommonSkeletonLoader />;

  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <CardTitle>Forums</CardTitle>
        </div>
        <CardDescription>Join discussions and ask questions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-4">
          <Input placeholder="Search threads..." className="max-w-sm" />
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Thread
          </Button>
        </div>
        {threads.map((thread) => (
          <Card key={thread.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{thread.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>By {thread.author}</div>
                  <div className="flex items-center gap-4">
                    <span>{thread.replies} replies</span>
                    <span>{thread.views} views</span>
                    <span>{thread.lastPost}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ForumsPage;
