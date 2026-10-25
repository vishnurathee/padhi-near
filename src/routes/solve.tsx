import { createFileRoute, Link } from "@tanstack/react-router";
import { MathQuizEngine } from "@/components/math-quiz-engine";
import { StepArrows } from "@/components/step-arrows";

export const Route = createFileRoute("/solve")({ component: SolvePage });

function SolvePage() {
  return (
    <main className="c10 solve-page math-solve">
      <header className="c10-bar">
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="feature-back">
          ← Back
        </Link>
        <Link to="/" className="c10-logo">
          Padhaai <span>Neev</span>
        </Link>
        <StepArrows back="/c/10" forward="/toppers" />
        <span className="vip-badge">Class 10 VIP Center</span>
      </header>
      <MathQuizEngine />
    </main>
  );
}
