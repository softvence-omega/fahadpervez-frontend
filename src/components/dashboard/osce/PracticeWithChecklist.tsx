import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import { Link } from "react-router-dom";

/**
 * Page data JSON (dynamic topics + items live here)
 * Edit this object to change topics/items/skills.
 */
type Level = "Novice" | "Confident" | "Expert" | null;

interface PatientScriptSection {
  topic: string;
  points: string[];
}
interface PageData {
  title: string;
  description: string;
  candidateInstructions: string[];
  patientScript: PatientScriptSection[];
  checklist: Record<string, string[]>; // topic -> array of item labels
  selfAssessment: string[]; // skill names
}

const pageData: PageData = {
  title: "Cardiovascular Examination (CVS)",
  description: "Practice the CVS examination from introduction to summary.",
  candidateInstructions: [
    "You are a medical student working in the emergency department",
    "A 34-year-old woman has presented for assessment",
    "Her presenting complaint is abdominal pain",
    "Please take a history",
    "At the end of the station, the examiner may ask you some further questions",
  ],
  patientScript: [
    {
      topic: "History of presenting complaint",
      points: [
        `Epigastric pain ("It's my tummy, it just hurts so much")`,
        `Site: epigastric ("It hurts in the middle, right under my ribs")`,
        `Onset: suddenly, 90 minutes ago ("It came on suddenly about one and a half hours ago")`,
        `Character: sharp ("It's a sharp, gripping pain")`,
      ],
    },
    {
      topic: "Past medical & surgical history",
      points: [
        `Gallstones ("I had gallstones a few months ago, but this pain is much worse")`,
        `Gestational diabetes ("I had diabetes whilst pregnant, but my sugars normalized afterwards")`,
      ],
    },
    {
      topic: "Drug history",
      points: [
        "Combined oral contraceptive pill (Gedarel 30/150)",
        "No known drug allergies",
      ],
    },
  ],
  checklist: {
    "Introduction & Consent": [
      "Introduce yourself to patient",
      "Obtain informed consent",
    ],
    "Hand Hygiene": ["Wash hands / sanitize"],
    "General Preparation": [
      "Ensure patient comfort",
      "Explain procedure clearly",
    ],
  },
  selfAssessment: ["Inspection", "Palpation", "Percussion", "Auscultation"],
};

/* Internal types for checklist state */
interface ChecklistItem {
  label: string;
  checked: boolean;
}
type ChecklistState = Record<string, ChecklistItem[]>;

export default function PracticeWithChecklist(): JSX.Element {
  // Timer
  const INITIAL_SECONDS = 600; // 10:00
  const initialTimeRef = useRef<number>(INITIAL_SECONDS);
  const [time, setTime] = useState<number>(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Checklist (dynamic from pageData)
  const createInitialChecklist = (): ChecklistState => {
    const state: ChecklistState = {};
    Object.keys(pageData.checklist).forEach((topic) => {
      state[topic] = pageData.checklist[topic].map((label) => ({
        label,
        checked: false,
      }));
    });
    return state;
  };

  const [checklist, setChecklist] = useState<ChecklistState>(() =>
    createInitialChecklist()
  );

  // Self-assessment (no default selection => null)
  const createInitialSelfAssessment = (): Record<string, Level> => {
    const map: Record<string, Level> = {};
    pageData.selfAssessment.forEach((skill) => {
      map[skill] = null;
    });
    return map;
  };
  const [selfAssessment, setSelfAssessment] = useState<Record<string, Level>>(
    () => createInitialSelfAssessment()
  );

  // Notes + submission state
  const [notes, setNotes] = useState<string>("");
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  // Timer effect (start/stop safe)
  useEffect(() => {
    if (isRunning) {
      if (timerRef.current == null) {
        timerRef.current = window.setInterval(() => {
          setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }
    } else {
      if (timerRef.current != null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current != null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  // keep checkedCount in sync with checklist
  useEffect(() => {
    const total = Object.values(checklist)
      .flat()
      .filter((i) => i.checked).length;
    setCheckedCount(total);
  }, [checklist]);

  // Format time mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Toggle a checkbox item
  const handleCheckboxChange = (topic: string, index: number): void => {
    setChecklist((prev) => {
      const topicItems = prev[topic] ?? [];
      const newItems = topicItems.map((it, i) =>
        i === index ? { ...it, checked: !it.checked } : it
      );
      return { ...prev, [topic]: newItems };
    });
  };

  // Self-assessment button click: acts like a select (only one selected per skill).
  // Clicking same level will toggle it off to null.
  const handleSelfAssessment = (
    skill: string,
    level: Exclude<Level, null>
  ): void => {
    setSelfAssessment((prev) => {
      const current = prev[skill];
      return { ...prev, [skill]: current === level ? null : level };
    });
  };

  // Complete Session -> collect data and POST to API
  const handleComplete = async (): Promise<void> => {
    // stop timer
    setIsRunning(false);

    // create payload
    const checklistPayload: Record<
      string,
      { label: string; checked: boolean }[]
    > = {};
    Object.keys(checklist).forEach((topic) => {
      checklistPayload[topic] = checklist[topic].map((it) => ({
        label: it.label,
        checked: it.checked,
      }));
    });

    const payload = {
      title: pageData.title,
      description: pageData.description,
      timeStartedSeconds: initialTimeRef.current,
      timeRemainingSeconds: time,
      timeTakenSeconds: initialTimeRef.current - time,
      completedAt: new Date().toISOString(),
      checklist: checklistPayload,
      selfAssessment,
      notes,
      totalChecked: checkedCount,
    };

    console.log(payload);

    try {
      setIsSubmitting(true);
      setSubmitResult(null);

      // Replace endpoint with your real API route
      const res = await fetch("/api/complete-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server responded ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      setSubmitResult("Session submitted successfully.");
      // optionally do something with returned data
      console.log("complete-session response:", data);
    } catch (err: unknown) {
      console.error(err);
      setSubmitResult(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Practice Again -> reset all interactive state
  const handlePracticeAgain = (): void => {
    setIsRunning(false);
    setTime(initialTimeRef.current);
    setNotes("");
    setChecklist(createInitialChecklist());
    setSelfAssessment(createInitialSelfAssessment());
    setSubmitResult(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* hide scrollbar for left panel but keep scrollable */}
      <style>{`
        .left-panel {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .left-panel::-webkit-scrollbar { display: none; } /* Chrome, Safari, Opera */
      `}</style>

      {/* Left Panel */}
      <div className="w-2/3 p-6 space-y-6 overflow-y-auto left-panel">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">{pageData.title}</h2>
          <p className="text-gray-600">{pageData.description}</p>
        </div>

        {/* Candidate Instructions */}
        <div>
          <h3 className="font-medium text-lg mb-2">Candidate Instructions</h3>
          <div className="bg-white px-4 py-7 rounded-lg shadow">
            <ul className="list-disc pl-5 space-y-2">
              {pageData.candidateInstructions.map((inst, idx) => (
                <li key={idx} className="text-sm text-[#111827]">
                  {inst}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Patient Script */}
        <div>
          <h3 className="font-medium text-lg mb-2">Patient Script</h3>
          <div className="bg-white px-4 py-7 rounded-lg shadow space-y-7">
            {pageData.patientScript.map((section, idx) => (
              <div key={idx}>
                <p className="bg-amber-600 px-2 py-1 text-white inline">
                  {section.topic}
                </p>
                <ul className="list-disc pl-5 space-y-2 my-5">
                  {section.points.map((pt, i) => (
                    <li key={i} className="text-[#111827]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Examiner Checklist</h3>
            <p>
              <span className="text-[#16A34A] font-semibold">
                {checkedCount}
              </span>{" "}
              /{" "}
              {Object.values(checklist).reduce(
                (acc, arr) => acc + arr.length,
                0
              )}{" "}
              completed
            </p>
          </div>

          {/* topics (dynamic) */}
          {Object.keys(checklist).map((topic) => {
            const items = checklist[topic];
            const completedForTopic = items.filter((i) => i.checked).length;
            return (
              <div key={topic} className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium mb-2 text-gray-800">{topic}</h4>
                  <small className="text-sm text-gray-500">
                    {completedForTopic}/{items.length}
                  </small>
                </div>

                <ul className="space-y-2 border border-slate-300 p-3 rounded-lg">
                  {items.map((item, idx) => (
                    <li key={`${topic}-${idx}`} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(topic, idx)}
                        aria-label={`${topic} - ${item.label}`}
                        className="mr-2"
                      />
                      <span
                        className={
                          item.checked ? "line-through text-gray-500" : ""
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Self-Assessment */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Self-Assessment Rating</h3>
          <div className="space-y-4">
            {pageData.selfAssessment.map((skill) => (
              <div key={skill}>
                <p className="mb-2 font-medium">{skill}</p>
                <div className="flex gap-3">
                  {(
                    ["Novice", "Confident", "Expert"] as Exclude<Level, null>[]
                  ).map((level) => {
                    const selected = selfAssessment[skill] === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleSelfAssessment(skill, level)}
                        className={`px-4 py-2 rounded border transition-colors ${
                          selected
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                        aria-pressed={selected}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            aria-label="Notes"
          />
        </div>

        {/* Session Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handlePracticeAgain}
            className="px-4 py-2 bg-gray-600 text-white rounded"
            type="button"
          >
            Practice Again
          </button>
          <button
            onClick={handleComplete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
            type="button"
          >
            {isSubmitting ? "Submitting..." : "Complete Session"}
          </button>
        </div>

        {/* optional small submission result */}
        {submitResult && (
          <div className="text-sm text-center mt-2">{submitResult}</div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-1/3 p-6 bg-gray-50 space-y-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-semibold">Timer</h3>
          <p className="text-4xl">{formatTime(time)}</p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => setIsRunning((s) => !s)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              type="button"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => setTime((prev) => prev + 60)}
              className="px-4 py-2 bg-green-500 text-white rounded"
              type="button"
            >
              +1 min
            </button>
            <button
              onClick={() => setTime((prev) => (prev > 0 ? prev - 60 : 0))}
              className="px-4 py-2 bg-red-500 text-white rounded"
              type="button"
            >
              -1 min
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-semibold">Video & Audio Tutorial</h3>
          <Link to={`/dashboard/osce-tutorial/${4}`}>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded w-full cursor-pointer"
              type="button"
            >
              Play Tutorial
            </button>
          </Link>
        </div>

        {/* Show selected self-assessment statuses on the right side */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Selected Self-Assessment</h3>
          <ul className="space-y-2 mt-3">
            {pageData.selfAssessment.map((skill) => (
              <li key={skill} className="flex justify-between items-center">
                <span>{skill}</span>
                <span className="text-sm font-medium">
                  {selfAssessment[skill] ?? "Not selected"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Related Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-500">
                CVS Module
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                Study Planner
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
