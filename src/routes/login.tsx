import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useProgress } from "@/lib/store";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const name = useProgress((state) => state.studentName);
  const setStudentName = useProgress((state) => state.setStudentName);
  const navigate = useNavigate();
  const [draft, setDraft] = useState(name);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  return (
    <main className="mx-auto flex min-h-[70dvh] w-full max-w-md flex-col justify-center px-4 pb-28">
      <p className="text-sm font-semibold text-gold">Login / Register</p>
      <h1 className="mt-2 text-3xl font-semibold text-forest">Save your name</h1>
      <p className="mt-2 text-sm text-muted">This is not a password account. The name stays only in this browser, so the home page can greet you.</p>
      <form
        className="mt-6 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setStudentName(draft.trim());
          void navigate({ to: "/" });
        }}
      >
        <label className="text-sm font-medium" htmlFor="student-name">
          Name
        </label>
        <input
          id="student-name"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={40}
          className="min-h-12 rounded-xl border border-line bg-panel px-4 text-sm"
          placeholder="For example, Anaya"
          autoComplete="nickname"
        />
        <button type="submit" className="min-h-12 rounded-xl bg-forest text-sm font-semibold text-bg">
          Save
        </button>
      </form>
    </main>
  );
}
