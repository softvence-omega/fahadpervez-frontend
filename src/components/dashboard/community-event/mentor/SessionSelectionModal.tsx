// components/session-selection-modal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Session {
  id: string;
  title: string;
  duration: number;
  price: number;
  description?: string;
}

interface SessionSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (selectedSessionId: string) => void;
  sessions?: Session[];
}

const defaultSessions: Session[] = [
  {
    id: "math-1",
    title: "Advanced Mathematics Tutoring",
    duration: 60,
    price: 25,
  },
  {
    id: "science-1",
    title: "Science Laboratory Session",
    duration: 45,
    price: 30,
  },
  {
    id: "language-1",
    title: "Language Practice Session",
    duration: 30,
    price: 15,
  },
];

export function SessionSelectionModal({
  isOpen,
  onClose,
  onBookNow,
  sessions = defaultSessions,
}: SessionSelectionModalProps) {
  const [selectedSession, setSelectedSession] = useState<string>(
    sessions[0]?.id || ""
  );
  const navigate = useNavigate();

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
  };

  const handleBookNow = () => {
    if (selectedSession) {
      onBookNow(selectedSession);

      const selectedSessionObj = sessions.find(s => s.id === selectedSession);
      navigate("/dashboard/confirm-booking", {
        state: {
          price: selectedSessionObj?.price,
          duration: selectedSessionObj?.duration,
          sessions: 1, // you can make this dynamic if needed
          mentorName: "Mouhammad",
          specialty: "Medical Consultant - Preventive & Clinical Care",
          mentorId: selectedSessionObj?.id, // using session id as mentorId (replace if you have real mentorId)
        },
      });
      // Optionally close the modal after booking
      // onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Select Sessions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              isSelected={selectedSession === session.id}
              onSelect={handleSessionSelect}
            />
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleBookNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedSession}
          >
            Book Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SessionCardProps {
  session: Session;
  isSelected: boolean;
  onSelect: (sessionId: string) => void;
}

function SessionCard({ session, isSelected, onSelect }: SessionCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
      onClick={() => onSelect(session.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
            }`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {session.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1 text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{session.duration} minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${session.price} per session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
