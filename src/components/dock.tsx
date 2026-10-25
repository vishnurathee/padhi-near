import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, ClipboardCheck, FileText, MessagesSquare, PenLine } from "lucide-react";

const items = [
  { to: "/solve", label: "Question Solving", icon: PenLine, match: (path: string) => path.startsWith("/solve") },
  { to: "/toppers", label: "1v1 talks with toppers", icon: MessagesSquare, match: (path: string) => path.startsWith("/toppers") },
  { to: "/evaluate", label: "Copy Evaluate", icon: ClipboardCheck, match: (path: string) => path.startsWith("/evaluate") },
  { to: "/papers", label: "Sample Paper", icon: FileText, match: (path: string) => path.startsWith("/papers") },
] as const;

export function Dock() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname === "/") return null;
  const basicOn = pathname.startsWith("/c/") || pathname.startsWith("/basic");

  return (
    <nav className="apple-style-dock" aria-label="Features">
      <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "basic" }} className={basicOn ? "dock-item is-on" : "dock-item"}>
        <span className="dock-icon">
          <BookOpen className="size-6" aria-hidden="true" />
        </span>
        <span className="dock-text">Basic Neev</span>
      </Link>
      {items.map((item) => {
        const Icon = item.icon;
        const on = item.match(pathname);
        return (
          <Link key={item.to} to={item.to} className={on ? "dock-item is-on" : "dock-item"}>
            <span className="dock-icon">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span className="dock-text">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
