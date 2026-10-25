import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Quiz } from "@/components/quiz";
import { chapterKey, findChapter, findSubject, isClass, neighborChapters } from "@/lib/curriculum";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/c/$classId/$subjectId/$chapterId")({
  loader: ({ params }) => {
    if (!isClass(params.classId)) throw notFound();
    const chapter = findChapter(params.classId, params.subjectId, params.chapterId);
    if (!chapter) throw notFound();
    return { chapter };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { classId, subjectId, chapterId } = Route.useParams();
  const subject = findSubject(classId, subjectId);
  const chapter = findChapter(classId, subjectId, chapterId);
  const markDone = useProgress((state) => state.markDone);
  const done = useProgress((state) => state.done);
  if (!subject || !chapter) return null;
  const key = chapterKey(classId, subjectId, chapterId);
  const { prev, next } = neighborChapters(classId, subjectId, chapterId);
  const tone = classId === "12" ? "violet" : "cyan";
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-8 pb-28">
      <Link to="/c/$classId/$subjectId" params={{ classId, subjectId }} className="text-sm text-muted hover:text-ink">
        ← {subject.name}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">{chapter.title}</h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted">{chapter.summary}</p>
      <article className="mt-6 rounded-3xl border border-line bg-panel/80 p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-faint uppercase">Notes</h2>
        <ul className="mt-4 grid gap-4">
          {chapter.points.map((point) => (
            <li key={point} className="border-l-2 border-line pl-4 text-sm leading-relaxed text-ink">
              {point}
            </li>
          ))}
        </ul>
        {chapter.formula ? <p className="mt-5 overflow-x-auto rounded-2xl bg-bg px-4 py-3 text-sm font-medium tracking-wide">{chapter.formula}</p> : null}
        <button
          type="button"
          onClick={() => markDone(key)}
          className={`mt-5 min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold ${done[key] ? "border-good/40 bg-good/10 text-good" : tone === "cyan" ? "border-cyan/40 text-cyan-2" : "border-violet/40 text-violet-2"}`}
        >
          {done[key] ? "Marked as read" : "I have read this"}
        </button>
      </article>
      <h2 className="mt-10 text-lg font-semibold">Practice</h2>
      <p className="mt-1 mb-4 text-sm text-muted">Three short questions. The reason shows as soon as you choose.</p>
      <Quiz items={chapter.questions} tone={tone} onFinished={() => markDone(key)} />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link to="/c/$classId/$subjectId/$chapterId" params={{ classId, subjectId, chapterId: prev.id }} className="rounded-2xl border border-line px-4 py-3 text-sm">
            <span className="block text-faint">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/c/$classId/$subjectId/$chapterId"
            params={{ classId, subjectId, chapterId: next.id }}
            className={`rounded-2xl px-4 py-3 text-sm sm:text-right ${tone === "cyan" ? "bg-cyan-2 text-bg" : "bg-violet-2 text-bg"}`}
          >
            <span className="block opacity-70">Next</span>
            <span className="font-semibold">{next.title}</span>
          </Link>
        ) : null}
      </div>
    </main>
  );
}
