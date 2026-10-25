import { useRef, useState } from "react";
import type { Question } from "@/lib/curriculum";

export function Quiz({
  items,
  tone = "cyan",
  onFinished,
}: {
  items: Question[];
  tone?: "cyan" | "violet";
  onFinished?: (correct: number, total: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);
  const accent = tone === "cyan" ? "bg-cyan-2 text-bg" : "bg-violet-2 text-bg";

  if (items.length === 0) return <p className="text-muted">No questions in this section yet.</p>;

  if (done) {
    const ratio = correct / items.length;
    const note =
      ratio >= 0.8 ? "Solid grip. Open the next chapter." : ratio >= 0.5 ? "Good try. Look once at the notes you missed." : "Read the notes again slowly, then try once more.";
    return (
      <div className="rounded-3xl border border-line bg-panel p-6">
        <p className="text-sm text-muted">Score</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums">
          {correct}
          <span className="text-2xl text-muted">/{items.length}</span>
        </p>
        <p className="mt-3 text-pretty text-muted">{note}</p>
        <button
          type="button"
          className={`mt-6 min-h-11 rounded-xl px-5 py-3 text-sm font-semibold ${accent}`}
          onClick={() => {
            setIndex(0);
            setPicked(null);
            setCorrect(0);
            setDone(false);
            finished.current = false;
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  const item = items[index];
  if (!item) return null;

  function choose(choice: number) {
    if (picked !== null) return;
    setPicked(choice);
    if (choice === item.answer) setCorrect((value) => value + 1);
  }

  function next() {
    if (picked === null) return;
    if (index + 1 >= items.length) {
      if (!finished.current) {
        finished.current = true;
        onFinished?.(picked === item.answer ? correct : correct, items.length);
      }
      setDone(true);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  return (
    <div className="rounded-3xl border border-line bg-panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <span className="tabular-nums">
          Question {index + 1} / {items.length}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{item.prompt}</h3>
      <div className="mt-5 grid gap-3">
        {item.choices.map((choice, choiceIndex) => {
          const revealed = picked !== null;
          const right = choiceIndex === item.answer;
          const mine = choiceIndex === picked;
          let toneClass = "border-line bg-bg/40 hover:border-faint";
          if (revealed && right) toneClass = "border-good bg-good/10";
          else if (revealed && mine) toneClass = "border-bad bg-bad/10";
          return (
            <button
              key={choice}
              type="button"
              disabled={revealed}
              onClick={() => choose(choiceIndex)}
              className={`min-h-11 rounded-2xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${toneClass}`}
            >
              <span className="mr-2 text-faint">{String.fromCharCode(65 + choiceIndex)}.</span>
              {choice}
            </button>
          );
        })}
      </div>
      {picked === null ? null : (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Why: </span>
          {item.why}
        </p>
      )}
      <button type="button" disabled={picked === null} onClick={next} className={`mt-5 min-h-11 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-40 ${accent}`}>
        {index + 1 === items.length ? "See result" : "Next question"}
      </button>
    </div>
  );
}
