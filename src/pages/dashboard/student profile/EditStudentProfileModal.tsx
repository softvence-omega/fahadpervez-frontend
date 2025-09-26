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

export default function EditStudentProfileModal({
  open,
  setOpen,
}: //   onFinalSubmit,
any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [preparingFor, setPreparingFor] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = () => {
    console.log({
      fullName,
      email,
      phoneNumber,
      country,
      university,
      bio,
      preparingFor,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Cardiology Quiz"
            />
          </div>

          <div className="grid gap-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Anatomy"
            />
          </div>

          <div className="grid gap-2">
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Cardiovascular System"
            />
          </div>

          <div className="grid gap-2">
            <Label>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="grid gap-2">
            <Label>University</Label>
            <Input
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="grid gap-2">
            <Label>Preparing For</Label>
            <Input
              value={preparingFor}
              onChange={(e) => setPreparingFor(e.target.value)}
              placeholder="PLAB"
            />
          </div>

          <div className="grid col-span-2 gap-2">
            <Label>Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={8}
              cols={10}
              placeholder="I'm a homeowner who loves working with skilled professionals to tmprove my property. I value quality work and clear communication."
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className=" cursor-pointer"
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
