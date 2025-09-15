import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Star, User } from "lucide-react";
import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
}

interface MentorshipPageProps {
  mentors: Mentor[];
  isLoading: boolean;
}

const MentorshipPage: React.FC<MentorshipPageProps> = ({
  mentors,
  isLoading,
}) => {
  if (isLoading) {
    return <CommonSkeletonLoader />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-6 w-6" />
          <CardTitle>Mentorship</CardTitle>
        </div>
        <CardDescription>
          Find experienced mentors for your career
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({mentor.rating})
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mentor.specialty}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mentor.experience}
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Clock className="h-3 w-3" />
                    {mentor.availability}
                  </div>
                </div>
              </div>
              <Button className="w-full">Request Session</Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MentorshipPage;
