import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findSubject, isClass } from "@/lib/curriculum";

export const Route = createFileRoute("/c/$classId/$subjectId/")({
  loader: ({ params }) => {
    if (!isClass(params.classId)) throw notFound();
    const subject = findSubject(params.classId, params.subjectId);
    if (!subject) throw notFound();
    return { subject };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { classId, subjectId } = Route.useParams();
  const subject = findSubject(classId, subjectId);
  if (!subject) return null;
  const tone = classId === "12" ? "text-violet-2" : "text-forest";
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-28">
      <Link to="/c/$classId" params={{ classId }} search={{ tab: "home" }} className="text-sm text-muted hover:text-ink">
        ← Class {classId}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">{subject.name}</h1>
      <p className="mt-2 text-muted">{subject.blurb}</p>
      <div className="mt-6 grid gap-3">
        {subject.chapters.map((chapter, index) => (
          <Link
            key={chapter.id}
            to="/c/$classId/$subjectId/$chapterId"
            params={{ classId, subjectId, chapterId: chapter.id }}
            className="rounded-2xl border border-line bg-panel p-5"
          >
            <p className={`text-xs font-semibold ${tone}`}>Chapter {index + 1}</p>
            <p className="mt-1 font-semibold">{chapter.title}</p>
            <p className="mt-1 text-sm text-muted">{chapter.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
