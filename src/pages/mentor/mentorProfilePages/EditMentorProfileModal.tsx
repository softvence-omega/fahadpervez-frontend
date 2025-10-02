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

export default function EditMentorProfileModal({ open, setOpen }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [medicalSpeciality, setMedicalSpeciality] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [postGraduate, setPostGraduate] = useState("");
  const [yearOfExperience, setYearOfExperience] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      medicalSpeciality,
      currentRole,
      postGraduate,
      yearOfExperience,
      bio,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound /> Profile Information
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 space-y-4">
          <div className="grid gap-2">
            <Label>First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid gap-2">
            <Label>Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="col-span-2 grid gap-2">
            <Label>Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah.johnson@email.com"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid gap-2">
            <Label>Medical Speciality</Label>
            <Input
              value={medicalSpeciality}
              onChange={(e) => setMedicalSpeciality(e.target.value)}
              placeholder="e.g. Cardiology"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid gap-2">
            <Label>Current Role</Label>
            <Input
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Resident Doctor"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid gap-2">
            <Label>Post Graduate</Label>
            <Input
              value={postGraduate}
              onChange={(e) => setPostGraduate(e.target.value)}
              placeholder="e.g. MD, MS"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid gap-2">
            <Label>Year of Experience</Label>
            <Input
              type="number"
              value={yearOfExperience}
              onChange={(e) => setYearOfExperience(e.target.value)}
              placeholder="e.g. 5"
              className="border-red-700 border-dashed"
            />
          </div>

          <div className="grid col-span-2 gap-2">
            <Label>Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={8}
              cols={10}
              placeholder="Write about yourself..."
              className="border-red-700 border-dashed"
            />
          </div>
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
            onClick={handleSubmit}
            className="bg-blue-main hover:bg-blue-600 text-white cursor-pointer"
          >
            Update Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
