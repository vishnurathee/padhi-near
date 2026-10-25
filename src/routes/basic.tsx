import { createFileRoute, Link } from "@tanstack/react-router";
import { subjectsFor, streams, type StreamId } from "@/lib/curriculum";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/basic")({ component: BasicPage });

function BasicPage() {
  const stream = useProgress((state) => state.stream);
  const setStream = useProgress((state) => state.setStream);
  const list = subjectsFor("12", stream);
  const ten = subjectsFor("10");
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-8 pb-28">
      <p className="text-sm font-semibold text-gold">1 · Basic</p>
      <h1 className="mt-2 text-3xl font-semibold text-forest">Basics first</h1>
      <p className="mt-2 max-w-2xl text-muted">Concept before the trick. Open a chapter, read the notes, then check yourself with three questions.</p>
      <h2 className="mt-8 text-lg font-semibold">Class 10</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {ten.map((subject) => (
          <Link key={subject.id} to="/c/$classId/$subjectId" params={{ classId: "10", subjectId: subject.id }} className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
            <p className="font-semibold">{subject.name}</p>
            <p className="mt-1 text-sm text-muted">{subject.blurb}</p>
            <p className="mt-3 text-xs font-medium text-forest">{subject.chapters.length} basic chapters</p>
          </Link>
        ))}
      </div>
      <h2 className="mt-10 text-lg font-semibold">Class 12</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {streams().map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStream(item.id as StreamId)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${stream === item.id ? "border-violet bg-violet/15 text-violet-2" : "border-line text-muted"}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((subject) => (
          <Link key={subject.id} to="/c/$classId/$subjectId" params={{ classId: "12", subjectId: subject.id }} className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
            <p className="font-semibold">{subject.name}</p>
            <p className="mt-1 text-sm text-muted">{subject.blurb}</p>
            <p className="mt-3 text-xs font-medium text-forest">{subject.chapters.length} basic chapters</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
