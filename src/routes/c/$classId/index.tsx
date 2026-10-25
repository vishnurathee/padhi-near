import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import { BasicsNewTriangles } from "@/components/basics-new-triangles";
import { Wires } from "@/components/wires";
import { StepArrows } from "@/components/step-arrows";
import { chapterKey, isClass, subjectsFor, type StreamId } from "@/lib/curriculum";
import { useProgress } from "@/lib/store";

type Tab = "home" | "basic";

export const Route = createFileRoute("/c/$classId/")({
  validateSearch: (search: Record<string, unknown>): { tab: Tab } => ({
    tab: search.tab === "basic" ? "basic" : "home",
  }),
  loader: ({ params }) => {
    if (!isClass(params.classId)) throw notFound();
    return { classId: params.classId };
  },
  component: ClassHome,
});

function ClassHome() {
  const { classId } = Route.useParams();
  const { tab } = Route.useSearch();
  if (classId === "12") return <ClassTwelve />;
  return <ClassTen tab={tab} />;
}

function CourseMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="course-menu">
      <button type="button" className="course-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        All Courses
      </button>
      {open ? (
        <div className="course-list">
          <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} onClick={() => setOpen(false)}>
            Class 10
          </Link>
          <Link to="/c/$classId" params={{ classId: "12" }} search={{ tab: "home" }} onClick={() => setOpen(false)}>
            Class 12
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function ClassTen({ tab }: { tab: Tab }) {
  const navigate = Route.useNavigate();
  return (
    <main className="c10 portal">
      <header className="portal-bar">
        <div className="portal-brand">
          <Link to="/" className="c10-logo">
            Padhaai <span>Neev</span>
          </Link>
          <CourseMenu />
        </div>
        <StepArrows back="/" forward="/solve" />
        <Link to="/login" className="portal-login">
          Login / Register
        </Link>
      </header>
      {tab === "basic" ? (
        <BasicPanel onBack={() => void navigate({ search: { tab: "home" } })} />
      ) : (
        <section className="premium-dashboard-section">
          <div className="welcome-banner-card">
            <Wires />
            <div className="banner-content">
              <span className="badge">Class 10</span>
              <h2>
                Welcome to your <span className="highlight">board workspace</span>
              </h2>
              <p>Basics, question solving, topper talks, copy check, and the 2024 sample paper. Use the dock below to open a feature.</p>
              <button type="button" className="cta-btn" onClick={() => void navigate({ search: { tab: "basic" } })}>
                Open Basic Neev <span className="arrow">→</span>
              </button>
            </div>
            <div className="banner-visuals" aria-hidden="true">
              <div className="shape circle-gradient" />
              <div className="floating-card-1">Basics + Confidence = 100%</div>
              <div className="floating-card-2">Sample Paper</div>
              <div className="floating-card-3">Interesting way question solving</div>
            </div>
          </div>
          <Stats />
        </section>
      )}
    </main>
  );
}

function Stats() {
  const rings = [
    { value: "3", note: "Core subjects", words: ["Maths", "Science", "Social", "Only"] },
    { value: "10", note: "Sample papers in each subject", words: ["Papers", "Practice", "Board", "Sets"] },
    { value: "First", note: "Basics strong before every chapter", words: ["Basics", "Before", "Chapter", "Strong"], first: true },
    { value: "Step", note: "Hints, then the full solution", words: ["Hint", "Check", "Solve", "Next"] },
    { value: "1v1", note: "Talks with board toppers", words: ["Talk", "Guide", "Topper", "Focus"] },
  ];
  return (
    <div className="stats-grid">
      {rings.map((ring) => (
        <div className="stat-box" key={ring.note}>
          <div className="stat-ring">
            <span className="side top">{ring.words[0]}</span>
            <span className="side right in">{ring.words[1]}</span>
            <span className="side bottom">{ring.words[2]}</span>
            <span className="side left">{ring.words[3]}</span>
            <h3 className={ring.first ? "is-first" : undefined}>{ring.value}</h3>
          </div>
          <p>{ring.note}</p>
        </div>
      ))}
    </div>
  );
}

const basicSubjects = [
  { id: "maths", label: "Mathematics" },
  { id: "science", label: "Science" },
  { id: "social", label: "SST" },
] as const;

function BasicPanel({ onBack }: { onBack: () => void }) {
  const [subject, setSubject] = useState<(typeof basicSubjects)[number]["id"]>("maths");
  const chapters = subjectsFor("10").find((item) => item.id === subject)?.chapters ?? [];

  return (
    <section className="portal-panel">
      <button type="button" className="portal-back" onClick={onBack}>
        ← Back to Home Dashboard
      </button>
      <div className="basic-split">
        <aside className="basic-side">
          <p className="basic-title">Basic Neev</p>
          {basicSubjects.map((item) => (
            <button
              key={item.id}
              type="button"
              className={subject === item.id ? "basic-item is-on" : "basic-item"}
              onClick={() => setSubject(item.id)}
            >
              <span aria-hidden="true">↳</span>
              {item.label}
            </button>
          ))}
        </aside>
        <section className="basic-quiz">
          {subject === "maths" ? (
            <BasicsNewTriangles />
          ) : (
            <>
              <h2>{basicSubjects.find((item) => item.id === subject)?.label}</h2>
              <p className="gate-rule">Open a chapter, read the notes, then answer the three checks.</p>
              <div className="chapter-list">
                {chapters.map((chapter) => (
                  <Link key={chapter.id} to="/c/$classId/$subjectId/$chapterId" params={{ classId: "10", subjectId: subject, chapterId: chapter.id }} className="chapter-panel">
                    <strong>{chapter.title}</strong>
                    <span>{chapter.summary}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}

function ClassTwelve() {
  const stream = useProgress((state) => state.stream);
  const setStream = useProgress((state) => state.setStream);
  const done = useProgress((state) => state.done);
  const subjects = subjectsFor("12", stream);
  const total = subjects.reduce((sum, subject) => sum + subject.chapters.length, 0);
  const finished = useMemo(() => {
    let count = 0;
    for (const subject of subjects) {
      for (const chapter of subject.chapters) {
        if (done[chapterKey("12", subject.id, chapter.id)]) count += 1;
      }
    }
    return count;
  }, [done, subjects]);
  const ratio = total === 0 ? 0 : Math.round((finished / total) * 100);

  return (
    <div className="min-h-dvh">
      <TopBar />
      <main className="mx-auto w-full max-w-5xl px-4 pt-8 pb-28">
        <p className="text-sm text-muted">Higher Secondary</p>
        <h1 className="mt-1 text-4xl font-semibold">Class 12</h1>
        <p className="mt-2 max-w-xl text-muted">Concepts, topper habits, and sample papers for science, commerce, and arts.</p>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Stream">
          {(["science", "commerce", "arts"] as StreamId[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={stream === id}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium capitalize ${stream === id ? "border-violet bg-violet/20 text-violet-2" : "border-line text-muted hover:text-ink"}`}
              onClick={() => setStream(id)}
            >
              {id}
            </button>
          ))}
        </div>
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-line bg-panel/80 p-4">
            <p className="text-xs tracking-wide text-muted uppercase">Chapters done</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">
              {finished}/{total}
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={ratio} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-violet" style={{ width: `${ratio}%` }} />
            </div>
          </div>
          <div className="rounded-3xl border border-line bg-panel/80 p-4">
            <p className="text-xs tracking-wide text-muted uppercase">Practice accuracy</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">—</p>
            <p className="mt-1 text-xs text-faint">No attempt yet</p>
          </div>
          <div className="rounded-3xl border border-line bg-panel/80 p-4">
            <p className="text-xs tracking-wide text-muted uppercase">Day streak</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">0</p>
            <p className="mt-1 text-xs text-faint">Mock still left</p>
          </div>
        </section>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/c/$classId/mock" params={{ classId: "12" }} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-violet-2 px-4 py-3 text-sm font-semibold text-bg">
            <Play className="size-4" aria-hidden="true" />
            Mock test
          </Link>
        </div>
        <h2 className="mt-10 text-lg font-semibold">Subjects</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {subjects.map((subject) => (
            <Link key={subject.id} to="/c/$classId/$subjectId" params={{ classId: "12", subjectId: subject.id }} className="rounded-3xl border border-line bg-panel/80 p-5 transition hover:border-faint">
              <p className="font-semibold">{subject.name}</p>
              <p className="mt-1 text-sm text-muted">{subject.blurb}</p>
              <p className="mt-3 text-xs font-medium text-violet-2">0/{subject.chapters.length} chapters</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function TopBar() {
  const links = [
    { to: "/basic", label: "1. Basic" },
    { to: "/solve", label: "2. Question Solving" },
    { to: "/toppers", label: "3. Toppers" },
    { to: "/evaluate", label: "4. Copy Evaluate" },
    { to: "/papers", label: "5. Sample Paper" },
  ] as const;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-panel shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="text-xl font-semibold tracking-wide">
            <span className="text-forest">Padhaai </span>
            <span className="text-gold">Neev</span>
          </Link>
          <Link to="/login" className="inline-flex min-h-11 items-center rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-bg lg:hidden">
            Login / Register
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1" aria-label="Main">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-bg-2 hover:text-forest">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/login" className="hidden min-h-11 items-center justify-center rounded-xl bg-forest px-5 py-2 text-sm font-semibold text-bg shadow-sm lg:inline-flex">
          Login / Register
        </Link>
      </div>
    </header>
  );
}
