import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-select";
import { GraduationCap, Users, Users2 } from "lucide-react";

interface StudyGroupPageProps {
  studyGroups: StudyGroup[];
  isLoading: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  subject: string;
  leader: string;
}
const StudyGroupPage: React.FC<StudyGroupPageProps> = ({
  studyGroups,
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
          <Users className="h-6 w-6" />
          <CardTitle>Study Groups</CardTitle>
        </div>
        <CardDescription>
          Connect and collaborate with fellow medical students
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studyGroups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {group.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {group.subject}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users2 className="h-4 w-4" />
                      {group.members} members
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {group.leader}
                </div>
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full">
                Join Group
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default StudyGroupPage;
