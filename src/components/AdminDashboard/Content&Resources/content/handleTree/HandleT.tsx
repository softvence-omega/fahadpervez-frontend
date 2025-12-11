import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner@2.0.3";
import {
  createExam,
  deleteAllContent,
  deleteSubject,
  getContent,
  getExams,
  getSubjects,
  updateSubject,
} from "../utils/api";
import { AddExamDialog } from "./AddExamDialog";
import { AddSubjectDialog } from "./AddSubjectDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

// New Components
import { ContentList } from "./content-inventory/ContentList";
import { ContentSidebar } from "./content-inventory/ContentSidebar";
import { HierarchyDialogs } from "./content-inventory/HierarchyDialogs";
import { HierarchyFilter, Subject, ViewMode } from "./content-inventory/types";

interface ContentInventoryNewProps {
  userType: { id: string; name: string } | null;
  onBack: () => void;
  onAddContent: (context: any) => void;
  onViewExamDetails?: (
    exam: { id: string; name: string },
    subjects: any[]
  ) => void;
}

export function ContentInventoryNew({
  userType,
  onBack,
  onAddContent,
  onViewExamDetails,
}: ContentInventoryNewProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("study");
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [hierarchyFilter, setHierarchyFilter] = useState<HierarchyFilter>({
    type: "all",
  });

  // Hierarchy management states
  const [addSubjectOpen, setAddSubjectOpen] = useState(false);
  const [addExamOpen, setAddExamOpen] = useState(false);
  const [addSystemOpen, setAddSystemOpen] = useState(false);
  const [addTopicOpen, setAddTopicOpen] = useState(false);
  const [addSubtopicOpen, setAddSubtopicOpen] = useState(false);

  const [activeSubjectId, setActiveSubjectId] = useState("");
  const [activeSystemId, setActiveSystemId] = useState("");
  const [activeTopicId, setActiveTopicId] = useState("");

  const [newSystemName, setNewSystemName] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newSubtopicName, setNewSubtopicName] = useState("");

  const [renameSubjectOpen, setRenameSubjectOpen] = useState(false);
  const [renameSystemOpen, setRenameSystemOpen] = useState(false);
  const [renameTopicOpen, setRenameTopicOpen] = useState(false);
  const [renameSubtopicOpen, setRenameSubtopicOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "subject" | "system" | "topic" | "subtopic";
    id: string;
    name: string;
    subjectId?: string;
    systemId?: string;
    topicId?: string;
  } | null>(null);

  useEffect(() => {
    if (userType) {
      if (viewMode === "study") {
        loadSubjects();
      } else {
        loadExams();
      }
      loadContent();
    }
  }, [userType, viewMode]);

  const loadSubjects = async () => {
    try {
      const result = await getSubjects(userType?.id || "");
      setSubjects(result.subjects || []);
    } catch (error) {
      console.error("Error loading subjects:", error);
      toast.error("Failed to load subjects");
    }
  };

  const loadExams = async () => {
    try {
      const result = await getExams(userType?.id || "");
      setExams(result.exams || []);
    } catch (error) {
      console.error("Error loading exams:", error);
      toast.error("Failed to load exams");
    }
  };

  const handleAddExam = async (examName: string) => {
    try {
      await createExam({
        name: examName,
        userTypeId: userType?.id || "",
      });
      toast.success("Exam created successfully!");
      await loadExams();
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error("Failed to create exam");
    }
  };

  const loadContent = async () => {
    try {
      setIsLoadingContent(true);
      const result = await getContent(userType?.id || "", viewMode);

      // Deduplicate content items by ID
      const uniqueContent =
        result.content?.reduce((acc: any[], item: any) => {
          if (!acc.find((existing) => existing.id === item.id)) {
            acc.push(item);
          }
          return acc;
        }, []) || [];

      setContentItems(uniqueContent);

      if (uniqueContent.length > 0) {
        // Only show toast on first load or manual refresh, skipping for now to reduce noise
        // toast.success(`Loaded ${uniqueContent.length} content items`);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      toast.error("Failed to load content");
      setContentItems([]);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllContent();
      await loadContent();
      toast.success("All content deleted successfully");
      setShowDeleteAllDialog(false);
    } catch (error) {
      console.error("Error deleting all content:", error);
      toast.error("Failed to delete all content");
    }
  };

  // Hierarchy toggle functions
  const toggleSubject = (subjectId: string) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId ? { ...s, expanded: !s.expanded } : s
      )
    );
  };

  const toggleSystem = (subjectId: string, systemId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              systems: subject.systems.map((sys) =>
                sys.id === systemId ? { ...sys, expanded: !sys.expanded } : sys
              ),
            }
          : subject
      )
    );
  };

  const toggleTopic = (
    subjectId: string,
    systemId: string,
    topicId: string
  ) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              systems: subject.systems.map((sys) =>
                sys.id === systemId
                  ? {
                      ...sys,
                      topics: sys.topics.map((topic) =>
                        topic.id === topicId
                          ? { ...topic, expanded: !topic.expanded }
                          : topic
                      ),
                    }
                  : sys
              ),
            }
          : subject
      )
    );
  };

  // Add hierarchy items
  const handleAddSystem = async () => {
    if (!newSystemName.trim()) return;

    try {
      const subject = subjects.find((s) => s.id === activeSubjectId);
      if (!subject) return;

      const updatedSubject = {
        ...subject,
        systems: [
          ...subject.systems,
          {
            id: `system_${Date.now()}`,
            name: newSystemName,
            topics: [],
          },
        ],
      };

      await updateSubject(updatedSubject.id, updatedSubject);
      await loadSubjects();
      setNewSystemName("");
      setAddSystemOpen(false);
      toast.success("System added successfully");
    } catch (error) {
      console.error("Error adding system:", error);
      toast.error("Failed to add system");
    }
  };

  const handleAddTopic = async () => {
    if (!newTopicName.trim()) return;

    try {
      const subject = subjects.find((s) => s.id === activeSubjectId);
      if (!subject) return;

      const updatedSubject = {
        ...subject,
        systems: subject.systems.map((sys) =>
          sys.id === activeSystemId
            ? {
                ...sys,
                topics: [
                  ...sys.topics,
                  {
                    id: `topic_${Date.now()}`,
                    name: newTopicName,
                    subtopics: [],
                  },
                ],
              }
            : sys
        ),
      };

      await updateSubject(updatedSubject.id, updatedSubject);
      await loadSubjects();
      setNewTopicName("");
      setAddTopicOpen(false);
      toast.success("Topic added successfully");
    } catch (error) {
      console.error("Error adding topic:", error);
      toast.error("Failed to add topic");
    }
  };

  const handleAddSubtopic = async () => {
    if (!newSubtopicName.trim()) return;

    try {
      const subject = subjects.find((s) => s.id === activeSubjectId);
      if (!subject) return;

      const updatedSubject = {
        ...subject,
        systems: subject.systems.map((sys) =>
          sys.id === activeSystemId
            ? {
                ...sys,
                topics: sys.topics.map((topic) =>
                  topic.id === activeTopicId
                    ? {
                        ...topic,
                        subtopics: [
                          ...topic.subtopics,
                          {
                            id: `subtopic_${Date.now()}`,
                            name: newSubtopicName,
                          },
                        ],
                      }
                    : topic
                ),
              }
            : sys
        ),
      };

      await updateSubject(updatedSubject.id, updatedSubject);
      await loadSubjects();
      setNewSubtopicName("");
      setAddSubtopicOpen(false);
      toast.success("Subtopic added successfully");
    } catch (error) {
      console.error("Error adding subtopic:", error);
      toast.error("Failed to add subtopic");
    }
  };

  // Delete hierarchy items
  const handleDeleteHierarchyItem = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "subject") {
        await deleteSubject(deleteTarget.id, userType?.id || "");
        await loadSubjects();
        toast.success("Subject deleted successfully");
      } else {
        const subject = subjects.find((s) => s.id === deleteTarget.subjectId);
        if (!subject) return;

        let updatedSubject = { ...subject };

        if (deleteTarget.type === "system") {
          updatedSubject.systems = subject.systems.filter(
            (s) => s.id !== deleteTarget.id
          );
        } else if (deleteTarget.type === "topic") {
          updatedSubject.systems = subject.systems.map((sys) =>
            sys.id === deleteTarget.systemId
              ? {
                  ...sys,
                  topics: sys.topics.filter((t) => t.id !== deleteTarget.id),
                }
              : sys
          );
        } else if (deleteTarget.type === "subtopic") {
          updatedSubject.systems = subject.systems.map((sys) =>
            sys.id === deleteTarget.systemId
              ? {
                  ...sys,
                  topics: sys.topics.map((topic) =>
                    topic.id === deleteTarget.topicId
                      ? {
                          ...topic,
                          subtopics: topic.subtopics.filter(
                            (st) => st.id !== deleteTarget.id
                          ),
                        }
                      : topic
                  ),
                }
              : sys
          );
        }

        await updateSubject(updatedSubject.id, updatedSubject);
        await loadSubjects();
        toast.success(`${deleteTarget.type} deleted successfully`);
      }

      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting hierarchy item:", error);
      toast.error("Failed to delete item");
    }
  };

  // Rename functions
  const handleRename = async () => {
    if (!renameValue.trim()) return;

    try {
      if (renameSubjectOpen) {
        const subject = subjects.find((s) => s.id === activeSubjectId);
        if (subject) {
          await updateSubject(subject.id, { ...subject, name: renameValue });
          await loadSubjects();
          toast.success("Subject renamed successfully");
        }
        setRenameSubjectOpen(false);
      } else if (renameSystemOpen) {
        const subject = subjects.find((s) => s.id === activeSubjectId);
        if (subject) {
          const updatedSubject = {
            ...subject,
            systems: subject.systems.map((sys) =>
              sys.id === activeSystemId ? { ...sys, name: renameValue } : sys
            ),
          };
          await updateSubject(updatedSubject.id, updatedSubject);
          await loadSubjects();
          toast.success("System renamed successfully");
        }
        setRenameSystemOpen(false);
      } else if (renameTopicOpen) {
        const subject = subjects.find((s) => s.id === activeSubjectId);
        if (subject) {
          const updatedSubject = {
            ...subject,
            systems: subject.systems.map((sys) =>
              sys.id === activeSystemId
                ? {
                    ...sys,
                    topics: sys.topics.map((topic) =>
                      topic.id === activeTopicId
                        ? { ...topic, name: renameValue }
                        : topic
                    ),
                  }
                : sys
            ),
          };
          await updateSubject(updatedSubject.id, updatedSubject);
          await loadSubjects();
          toast.success("Topic renamed successfully");
        }
        setRenameTopicOpen(false);
      } else if (renameSubtopicOpen) {
        const subject = subjects.find((s) => s.id === activeSubjectId);
        if (subject) {
          const updatedSubject = {
            ...subject,
            systems: subject.systems.map((sys) =>
              sys.id === activeSystemId
                ? {
                    ...sys,
                    topics: sys.topics.map((topic) => {
                      if (topic.id === activeTopicId) {
                        return {
                          ...topic,
                          subtopics: topic.subtopics.map((st) => {
                            const subtopicId = st.id; // Correct way if we have ID. Original code used a complex check.
                            // Assuming we are passing the ID to activeSubtopicId or similar?
                            // The original code used:
                            // const subtopicId = `${activeSubjectId}_${activeSystemId}_${activeTopicId}_${st.name}`;
                            // This implies IDs were generated based on hierarchy?
                            // But wait, my types define `id` string.
                            // Let's look at how I'm setting state.
                            // In ContentSidebar, I pass specific IDs.
                            // So I need to store the active subtopic ID too?
                            // My state has `activeSubjectId`, `activeSystemId`, `activeTopicId`.
                            // It does NOT have `activeSubtopicId`.
                            // I should add `activeSubtopicId` state.

                            return st.id === activeSubtopicId
                              ? { ...st, name: renameValue }
                              : st;
                          }),
                        };
                      }
                      return topic;
                    }),
                  }
                : sys
            ),
          };
          await updateSubject(updatedSubject.id, updatedSubject);
          await loadSubjects();
          toast.success("Subtopic renamed successfully");
        }
        setRenameSubtopicOpen(false);
      }

      setRenameValue("");
    } catch (error) {
      console.error("Error renaming:", error);
      toast.error("Failed to rename");
    }
  };

  // I missed adding activeSubtopicId state
  const [activeSubtopicId, setActiveSubtopicId] = useState("");

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Content Management
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1>{userType?.name} Content Inventory</h1>
            <p className="text-muted-foreground">
              Manage and organize content for {userType?.name}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteAllDialog(true)}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All
            </Button>
            <Button onClick={() => onAddContent({ subjects })}>
              <Plus className="w-4 h-4 mr-2" />
              {viewMode === "exam" ? "Add Question" : "Add Content"}
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-3">
        <Button
          variant={viewMode === "study" ? "default" : "outline"}
          onClick={() => setViewMode("study")}
        >
          Study Mode
        </Button>
        <Button
          variant={viewMode === "exam" ? "default" : "outline"}
          onClick={() => setViewMode("exam")}
        >
          Exam Mode
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Table of Contents */}
        <div className="col-span-12 lg:col-span-3">
          <ContentSidebar
            viewMode={viewMode}
            subjects={subjects}
            exams={exams}
            isLoading={false} // Loading state is mostly for content, subjects load fast
            hierarchyFilter={hierarchyFilter}
            contentItems={contentItems}
            setHierarchyFilter={setHierarchyFilter}
            onAddSubject={() => setAddSubjectOpen(true)}
            onAddExam={() => setAddExamOpen(true)}
            onViewExamDetails={onViewExamDetails}
            onAddContent={onAddContent}
            toggleSubject={toggleSubject}
            toggleSystem={toggleSystem}
            toggleTopic={toggleTopic}
            onAddSystem={(subjectId) => {
              setActiveSubjectId(subjectId);
              setAddSystemOpen(true);
            }}
            onAddTopic={(subjectId, systemId) => {
              setActiveSubjectId(subjectId);
              setActiveSystemId(systemId);
              setAddTopicOpen(true);
            }}
            onAddSubtopic={(subjectId, systemId, topicId) => {
              setActiveSubjectId(subjectId);
              setActiveSystemId(systemId);
              setActiveTopicId(topicId);
              setAddSubtopicOpen(true);
            }}
            onRenameSubject={(id, name) => {
              setActiveSubjectId(id);
              setRenameValue(name);
              setRenameSubjectOpen(true);
            }}
            onRenameSystem={(subjectId, id, name) => {
              setActiveSubjectId(subjectId);
              setActiveSystemId(id);
              setRenameValue(name);
              setRenameSystemOpen(true);
            }}
            onRenameTopic={(subjectId, systemId, id, name) => {
              setActiveSubjectId(subjectId);
              setActiveSystemId(systemId);
              setActiveTopicId(id);
              setRenameValue(name);
              setRenameTopicOpen(true);
            }}
            onRenameSubtopic={(subjectId, systemId, topicId, id, name) => {
              setActiveSubjectId(subjectId);
              setActiveSystemId(systemId);
              setActiveTopicId(topicId);
              setActiveSubtopicId(id);
              setRenameValue(name);
              setRenameSubtopicOpen(true);
            }}
            onDeleteSubject={(id, name) => {
              setDeleteTarget({ type: "subject", id, name });
              setDeleteDialogOpen(true);
            }}
            onDeleteSystem={(subjectId, id, name) => {
              setDeleteTarget({ type: "system", id, name, subjectId });
              setDeleteDialogOpen(true);
            }}
            onDeleteTopic={(subjectId, systemId, id, name) => {
              setDeleteTarget({ type: "topic", id, name, subjectId, systemId });
              setDeleteDialogOpen(true);
            }}
            onDeleteSubtopic={(subjectId, systemId, topicId, id, name) => {
              setDeleteTarget({
                type: "subtopic",
                id,
                name,
                subjectId,
                systemId,
                topicId,
              });
              setDeleteDialogOpen(true);
            }}
          />
        </div>

        {/* Right: Content Table */}
        <div className="col-span-12 lg:col-span-9 m-[0px]">
          <ContentList
            contentItems={contentItems}
            isLoading={isLoadingContent}
            subjects={subjects}
            hierarchyFilter={hierarchyFilter}
            setHierarchyFilter={setHierarchyFilter}
            onRefresh={loadContent}
            onEditContent={(item) =>
              onAddContent({ subjects, editMode: true, initialData: item })
            }
          />
        </div>
      </div>

      {/* Dialogs */}
      <AddSubjectDialog
        open={addSubjectOpen}
        onOpenChange={setAddSubjectOpen}
        onAdd={(newSubject) => {
          setSubjects([...subjects, newSubject]);
          setAddSubjectOpen(false);
        }}
        userTypeId={userType?.id || ""}
      />

      <AddExamDialog
        open={addExamOpen}
        onOpenChange={setAddExamOpen}
        onAdd={handleAddExam}
      />

      <HierarchyDialogs
        addSystemOpen={addSystemOpen}
        setAddSystemOpen={setAddSystemOpen}
        newSystemName={newSystemName}
        setNewSystemName={setNewSystemName}
        onAddSystem={handleAddSystem}
        addTopicOpen={addTopicOpen}
        setAddTopicOpen={setAddTopicOpen}
        newTopicName={newTopicName}
        setNewTopicName={setNewTopicName}
        onAddTopic={handleAddTopic}
        addSubtopicOpen={addSubtopicOpen}
        setAddSubtopicOpen={setAddSubtopicOpen}
        newSubtopicName={newSubtopicName}
        setNewSubtopicName={setNewSubtopicName}
        onAddSubtopic={handleAddSubtopic}
        renameSubjectOpen={renameSubjectOpen}
        setRenameSubjectOpen={setRenameSubjectOpen}
        renameSystemOpen={renameSystemOpen}
        setRenameSystemOpen={setRenameSystemOpen}
        renameTopicOpen={renameTopicOpen}
        setRenameTopicOpen={setRenameTopicOpen}
        renameSubtopicOpen={renameSubtopicOpen}
        setRenameSubtopicOpen={setRenameSubtopicOpen}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
        onRename={handleRename}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteTarget={deleteTarget}
        onDelete={handleDeleteHierarchyItem}
      />

      <AlertDialog
        open={showDeleteAllDialog}
        onOpenChange={setShowDeleteAllDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete ALL
              content for all subjects.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAll}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
