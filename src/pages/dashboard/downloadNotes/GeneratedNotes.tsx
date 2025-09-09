import NoteCard from "@/components/reusable/NoteCard";

export default function GeneratedNotes() {
    return (
        <div className="mb-16">
            <div>
                <h2 className="text-2xl text-slate-900 font-semibold leading-8 mb-6">Todays Created Notes</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />
                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />
                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl text-slate-900 font-semibold leading-8 mb-8">All Notes</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />

                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />

                    <NoteCard
                        tag="Heart Sounds"
                        title="Types of Shock"
                        description="Shock is a life-threatening condition where tissue perfusion is inadequate to meet cellular demands, leading to cellular dysfunction and organ failure."
                        chapter={12}
                        pages={12}
                        // downloads={45}
                        showDownload={false}
                        onViewNotes={() => console.log("Viewing notes")}
                    />
                </div>
            </div>
        </div>
    )
}
