import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
  subtopics: Subtopic[];
}

interface System {
  id: string;
  name: string;
  topics: Topic[];
}

interface AddSubjectModalProps {
  onClose: () => void;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ onClose }) => {
  const [subjectName, setSubjectName] = useState("");
  const [systems, setSystems] = useState<System[]>([]);

  const addSystem = () => {
    setSystems([...systems, { id: crypto.randomUUID(), name: "", topics: [] }]);
  };

  const addTopic = (systemId: string) => {
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: [
                ...sys.topics,
                { id: crypto.randomUUID(), name: "", subtopics: [] },
              ],
            }
          : sys
      )
    );
  };

  const addSubtopic = (systemId: string, topicId: string) => {
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: sys.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      subtopics: [
                        ...t.subtopics,
                        { id: crypto.randomUUID(), name: "" },
                      ],
                    }
                  : t
              ),
            }
          : sys
      )
    );
  };

  const updateSystemName = (systemId: string, value: string) => {
    setSystems((prev) =>
      prev.map((sys) => (sys.id === systemId ? { ...sys, name: value } : sys))
    );
  };

  const updateTopicName = (
    systemId: string,
    topicId: string,
    value: string
  ) => {
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: sys.topics.map((t) =>
                t.id === topicId ? { ...t, name: value } : t
              ),
            }
          : sys
      )
    );
  };

  const updateSubtopicName = (
    systemId: string,
    topicId: string,
    subtopicId: string,
    value: string
  ) => {
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: sys.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      subtopics: t.subtopics.map((s) =>
                        s.id === subtopicId ? { ...s, name: value } : s
                      ),
                    }
                  : t
              ),
            }
          : sys
      )
    );
  };

  const removeSystem = (id: string) =>
    setSystems((prev) => prev.filter((sys) => sys.id !== id));

  const removeTopic = (systemId: string, topicId: string) =>
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: sys.topics.filter((t) => t.id !== topicId),
            }
          : sys
      )
    );

  const removeSubtopic = (
    systemId: string,
    topicId: string,
    subtopicId: string
  ) =>
    setSystems((prev) =>
      prev.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              topics: sys.topics.map((t) =>
                t.id === topicId
                  ? {
                      ...t,
                      subtopics: t.subtopics.filter((s) => s.id !== subtopicId),
                    }
                  : t
              ),
            }
          : sys
      )
    );

  const handleSave = () => {
    console.log({ subjectName, systems });
    onClose();
  };

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
    error: "text-red-500 text-sm mt-1",
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <CommonBorderWrapper className="w-full max-w-lg relative max-h-[95vh] overflow-y-auto ">
        <div className=" space-y-5  ">
          <ModalCloseButton onClick={onClose} />
          <FormHeader
            title="Add New Subject"
            subtitle=" Create a hierarchical table of contents for your subject."
          />

          <div className="">
            <label className={inputClass.label}>Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g., Anatomy"
              className={inputClass.input}
            />
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between ">
              <label className={inputClass.label}>Systems</label>
              <CommonButton onClick={addSystem} className="">
                + Add System
              </CommonButton>
            </div>

            {systems.map((system) => (
              <div
                key={system.id}
                className="border border-black/10 rounded-lg p-3 mb-3 bg-gray-50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={system.name}
                    onChange={(e) =>
                      updateSystemName(system.id, e.target.value)
                    }
                    placeholder="System name (e.g., Cardiovascular System)"
                    className={`!bg-[#EFF6FF] ${inputClass.input}`}
                  />
                  <button
                    onClick={() => removeSystem(system.id)}
                    className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-2">
                    <label className={inputClass.label}>Topics</label>
                    <CommonButton
                      onClick={() => addTopic(system.id)}
                      className="flex items-center gap-2"
                    >
                      <span>
                        <GoPlus className="w-4 h-4" />
                      </span>
                      Add Topic
                    </CommonButton>
                  </div>

                  {system.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="border border-[#CBD5E1] rounded-md p-4   "
                    >
                      <div className="flex items-center gap-2 ">
                        <input
                          type="text"
                          value={topic.name}
                          onChange={(e) =>
                            updateTopicName(system.id, topic.id, e.target.value)
                          }
                          placeholder="Topic name (e.g., Heart)"
                          className={inputClass.input}
                        />
                        <button
                          onClick={() => removeTopic(system.id, topic.id)}
                          className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="">
                        <div className="flex items-center justify-between my-2">
                          <label className={inputClass.label}>Subtopics</label>
                          <CommonButton
                            onClick={() => addSubtopic(system.id, topic.id)}
                            className=" flex items-center gap-2"
                          >
                            <span>
                              <GoPlus className="w-4 h-4" />
                            </span>
                            Add Subtopic
                          </CommonButton>
                        </div>

                        {topic.subtopics.map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center gap-2 mb-1"
                          >
                            <input
                              type="text"
                              value={sub.name}
                              onChange={(e) =>
                                updateSubtopicName(
                                  system.id,
                                  topic.id,
                                  sub.id,
                                  e.target.value
                                )
                              }
                              placeholder="Subtopic name (e.g., Heart)"
                              className={inputClass.input}
                            />
                            <button
                              onClick={() =>
                                removeSubtopic(system.id, topic.id, sub.id)
                              }
                              className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <CommonButton onClick={onClose}>Cancel</CommonButton>
            <CommonButton
              onClick={handleSave}
              className="!bg-blue-500 !text-white"
            >
              Save Subject
            </CommonButton>
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default AddSubjectModal;
