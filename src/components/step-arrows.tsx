import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Arrow({ dest, label }: { dest?: string; label: "Back" | "Forward" }) {
  const icon = label === "Back" ? <ChevronLeft className="size-5" aria-hidden="true" /> : <ChevronRight className="size-5" aria-hidden="true" />;
  if (!dest) {
    return (
      <span className="step-arrow is-off" aria-hidden="true">
        {icon}
      </span>
    );
  }
  if (dest === "/c/10") {
    return (
      <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="step-arrow" aria-label={label}>
        {icon}
      </Link>
    );
  }
  return (
    <Link to={dest} className="step-arrow" aria-label={label}>
      {icon}
    </Link>
  );
}

export function StepArrows({ back, forward }: { back?: string; forward?: string }) {
  return (
    <div className="step-arrows">
      <Arrow dest={back} label="Back" />
      <Arrow dest={forward} label="Forward" />
    </div>
  );
}
