/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  useLazyGetMeQuery,
  useUpdateProfileMutation,
} from "@/store/features/auth/auth.api";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/store/features/auth/auth.slice";
import Cookies from "js-cookie";

export default function EditStudentProfileModal({ open, setOpen, user }: any) {
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [getMe] = useLazyGetMeQuery();
  // const { data } = useGetMeQuery(undefined);
  console.log(user);

  const [firstName, setFirstName] = useState(user.profile?.firstName);
  const [lastName, setLastName] = useState(user.profile?.lastName);
  const [university, setUniversity] = useState(user.profile?.university);
  const [country, setCountry] = useState(user.profile?.country);
  const [yearOfStudy, setYearOfStudy] = useState(user.profile?.year_of_study);
  const [studentType, setStudentType] = useState(user.profile?.studentType);
  const [preparingFor, setPreparingFor] = useState(user.profile?.preparingFor);
  const [bio, setBio] = useState(user.profile?.bio);
  // const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      // Construct data object
      const studentData = {
        // role: user.account?.role,
        // student: {
        firstName,
        lastName,
        university,
        country,
        year_of_study: yearOfStudy,
        studentType,
        preparingFor,
        bio,
        // },

        // those field not set in frontend
        preference: {
          subject: user?.profile?.preference?.subject,
          systemPreference: user?.profile?.preference?.systemPreference,
          topic: user?.profile?.preference?.topic,
          subTopic: user?.profile?.preference?.subTopic,
        },
      };

      // Validate
      if (!firstName || !lastName || !university || !country || !yearOfStudy) {
        toast.error("Please fill all required fields");
        return;
      }

      // Prepare FormData
      const formDataToSend = new FormData();

      // if (photo) {
      //   formDataToSend.append("image", photo);
      // }

      formDataToSend.append("data", JSON.stringify(studentData));

      // API call
      const res = await updateProfile(formDataToSend).unwrap();

      if (res.success) {
        const meRes = await getMe(undefined).unwrap();

        console.log(meRes.data);
        dispatch(
          setUser({
            accessToken: Cookies.get("accessToken"),
            user: meRes?.data,
          })
        );

        toast.success("Profile updated successfully!");
        console.log("Response:", res);
      }

      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound /> Profile Information
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="grid gap-2">
            <Label>First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </div>

          <div className="grid gap-2">
            <Label>Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>

          <div className="grid gap-2">
            <Label>University</Label>
            <Input
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="National University"
            />
          </div>

          <div className="grid gap-2">
            <Label>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Bangladesh"
            />
          </div>

          <div className="grid gap-2">
            <Label>Year of Study</Label>
            <Input
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              placeholder="4th Year"
            />
          </div>

          <div className="grid gap-2">
            <Label>Student Type</Label>
            <Input
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              placeholder="Undergraduate"
            />
          </div>

          <div className="grid gap-2">
            <Label>Preparing For</Label>
            <Input
              value={preparingFor}
              onChange={(e) => setPreparingFor(e.target.value)}
              placeholder={preparingFor}
            />
          </div>

          <div className="grid col-span-2 gap-2">
            <Label>Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              placeholder={bio}
            />
          </div>

          {/* <div className="grid col-span-2 gap-2">
            <Label>Profile Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
          </div> */}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-blue-main hover:bg-blue-600 text-white cursor-pointer"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
