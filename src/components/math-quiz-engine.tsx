import { useEffect, useRef, useState } from "react";
import { adaptionQuestions } from "@/data/adaption-questions";
import { askTriangleAgent } from "@/lib/agent37";

const letters = ["A", "B", "C", "D"];

export function MathQuizEngine() {
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(() => adaptionQuestions.map(() => null));
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hintStep, setHintStep] = useState(0);
  const [hintText, setHintText] = useState("");
  const [running, setRunning] = useState(false);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const agentBook = useRef<string[] | null>(null);
  const asking = useRef(false);
  const [agentSteps, setAgentSteps] = useState<{ s1: string; s2: string; s3: string; final: string } | null>(null);

  const total = adaptionQuestions.length;
  const item = adaptionQuestions[index];
  const picked = picks[index];
  const score = picks.reduce<number>((sum, pick, pickIndex) => sum + (pick === adaptionQuestions[pickIndex]?.ans ? 1 : 0), 0);

  function choose(optionIndex: number) {
    if (picked !== null) return;
    setPicks((state) => state.map((value, valueIndex) => (valueIndex === index ? optionIndex : value)));
  }

  function toggle(node: string) {
    setOpen((state) => ({ ...state, [node]: !state[node] }));
  }

  function restart() {
    setIndex(0);
    setPicks(adaptionQuestions.map(() => null));
    setOpen({});
    setFinished(false);
    setTimeLeft(0);
    setHintStep(0);
    setHintText("");
    setRunning(false);
  }

  useEffect(() => {
    setTimeLeft(0);
    setHintStep(0);
    setHintText("");
    setRunning(false);
    agentBook.current = null;
    setAgentSteps(null);
  }, [index]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTimeLeft((left) => {
        if (left <= 1) {
          setRunning(false);
          setHintText("");
          return 0;
        }
        return left - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, index]);

  async function triggerPandaHint() {
    if (!item) return;
    const voice = voiceRef.current;
    if (voice) {
      voice.currentTime = 0;
      voice.play().catch(() => {});
    }
    if (running || hintStep >= 3 || asking.current) return;
    let book = agentBook.current;
    if (!book) {
      asking.current = true;
      setHintText("Asking Agent37...");
      try {
        const reply = await askTriangleAgent({ data: { question: item.q } });
        book = splitAgentReply(reply.text, [item.hint, item.s1, item.s2]);
        setAgentSteps(splitAgentSteps(reply.text, item));
      } catch {
        book = [item.hint, item.s1, item.s2];
      }
      asking.current = false;
      agentBook.current = book;
    }
    setHintText(book[hintStep] ?? item.hint);
    setHintStep((step) => step + 1);
    setTimeLeft(45);
    setRunning(true);
  }

  if (finished) {
    const ratio = total === 0 ? 0 : score / total;
    const note = ratio >= 0.8 ? "Strong base. You are ready for the Class 10 triangle proofs." : ratio >= 0.5 ? "Fair. Open the hints and steps on the ones you missed, then try again." : "Revise the triangle theorems, then try again.";
    return (
      <div className="quiz-engine-wrapper">
        <div className="dashboard-view">
          <h2>Assessment report</h2>
          <div className="score-badge">
            {score} / {total}
          </div>
          <p className="eval-msg">{note}</p>
          <button type="button" className="nav-btn btn-primary retry-btn" onClick={restart}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="quiz-engine-wrapper">
      <div className="quiz-top-bar">
        <span className="category-pill">{item.type}</span>
        <span className="counter-text">
          Question {index + 1} of {total}
        </span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <div className="question-segment" key={item.q}>
        <h3>{item.q}</h3>
        <div className="cards-grid">
          {item.options.map((option, optionIndex) => {
            let cls = "option-card";
            if (picked !== null && optionIndex === item.ans) cls += " state-correct";
            else if (picked === optionIndex) cls += " state-wrong";
            return (
              <button key={option} type="button" className={cls} disabled={picked !== null} onClick={() => choose(optionIndex)}>
                {letters[optionIndex]}) {option}
              </button>
            );
          })}
        </div>
      </div>
      <div className="canvas-3d-floor">
        <button type="button" className="panda-walker" onClick={triggerPandaHint}>
          <span className="head-stack">
            {running ? <span className="head-timer">{timeLeft}s</span> : null}
            {running ? null : hintStep < 3 ? <span className="head-call">Shall I give a hint?</span> : null}
            {hintText ? <span className="head-hint">{hintText}</span> : null}
          </span>
          <span className="toon-panda">
            <span className="tp-ear tp-ear-l" />
            <span className="tp-ear tp-ear-r" />
            <span className="tp-head">
              <span className="tp-patch tp-patch-l" />
              <span className="tp-patch tp-patch-r" />
              <span className="tp-eye tp-eye-l" />
              <span className="tp-eye tp-eye-r" />
              <span className="tp-snout"><span className="tp-nose" /></span>
            </span>
            <span className="tp-torso"><span className="tp-belly" /></span>
            <span className="tp-arm tp-arm-l" />
            <span className="tp-arm tp-arm-r" />
            <span className="tp-leg tp-leg-l" />
            <span className="tp-leg tp-leg-r" />
            <span className="tp-shadow" />
          </span>
        </button>
      </div>
      <audio ref={voiceRef} src="/panda/hint-doo.wav" preload="auto" />
      <div className="scaffold-accordion">
        <div className="scaffold-row">
          {(
            [
              ["s1", "Step 1"],
              ["s2", "Step 2"],
              ["s3", "Step 3"],
              ["final", "Final answer"],
            ] as const
          ).map(([id, title]) => (
            <button key={id} type="button" className={open[id] ? "scaffold-header is-on" : "scaffold-header"} aria-expanded={!!open[id]} onClick={() => toggle(id)}>
              {title}
            </button>
          ))}
        </div>
        {open.s1 ? <div className="scaffold-body">{agentSteps?.s1 || item.s1}</div> : null}
        {open.s2 ? <div className="scaffold-body">{agentSteps?.s2 || item.s2}</div> : null}
        {open.s3 ? <div className="scaffold-body">{agentSteps?.s3 || item.s3}</div> : null}
        {open.final ? <div className="scaffold-body final-box">{agentSteps?.final || item.final}</div> : null}
      </div>
      <div className="wizard-nav">
        <button type="button" className="nav-btn" disabled={index === 0} onClick={() => { setIndex((value) => value - 1); setOpen({}); }}>
          Previous
        </button>
        <button
          type="button"
          className="nav-btn btn-primary"
          disabled={picked === null}
          onClick={() => {
            if (index >= total - 1) {
              setFinished(true);
              return;
            }
            setIndex((value) => value + 1);
            setOpen({});
          }}
        >
          {index >= total - 1 ? "See score" : "Next"}
        </button>
      </div>
    </div>
  );
}

function splitAgentReply(text: string, fallback: string[]) {
  const hint = lineAfter(text, "Hint");
  const step1 = lineAfter(text, "Step 1");
  const step2 = lineAfter(text, "Step 2");
  if (!hint && !step1 && !step2) return fallback;
  return [hint || fallback[0], step1 || fallback[1], step2 || fallback[2]];
}

function splitAgentSteps(text: string, item: { s1: string; s2: string; s3: string; final: string }) {
  return {
    s1: lineAfter(text, "Step 1") || item.s1,
    s2: lineAfter(text, "Step 2") || item.s2,
    s3: lineAfter(text, "Step 3") || item.s3,
    final: lineAfter(text, "Final Answer") || lineAfter(text, "Final") || item.final,
  };
}
function lineAfter(text: string, label: string) {
  const match = text.match(new RegExp(`${label}\\s*:\\s*(.+)`, "i"));
  return match?.[1]?.trim() ?? "";
}
