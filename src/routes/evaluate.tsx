import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StepArrows } from "@/components/step-arrows";

export const Route = createFileRoute("/evaluate")({ component: EvaluatePage });

const teachers = [
  { id: "maths", subject: "Mathematics", name: "Ananya Verma" },
  { id: "science", subject: "Science", name: "Rohan Mehta" },
  { id: "sst", subject: "Social Science", name: "Sara Khan" },
];

function EvaluatePage() {
  const [id, setId] = useState(teachers[0].id);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const teacher = teachers.find((item) => item.id === id) ?? teachers[0];

  return (
    <main className="c10 solve-page">
      <header className="c10-bar">
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="feature-back">
          ← Back
        </Link>
        <Link to="/" className="c10-logo">
          Padhaai <span>Neev</span>
        </Link>
        <StepArrows back="/toppers" forward="/papers" />
        <span className="vip-badge">Class 10th VIP Portal</span>
      </header>
      <section className="vip-window">
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="vip-back">
          ← Back to core menu
        </Link>
        <h1 className="vip-title">Which teacher do you want to talk to?</h1>
        <p className="vip-note">These teachers are fictional. This is not a live call.</p>
        <div className="eval-box">
          <label htmlFor="subject">Select a subject</label>
          <select id="subject" value={teacher.id} onChange={(event) => setId(event.target.value)}>
            {teachers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.subject}
              </option>
            ))}
          </select>
          <p className="eval-ask">
            {teacher.subject}: {teacher.name}
          </p>
          <label className="upload-sheet" htmlFor="sheet">
            <strong>Upload your question paper sheet and answer sheet</strong>
            <span>{fileName || "Choose a photo or a PDF. It stays on this page."}</span>
            <input
              id="sheet"
              type="file"
              accept="image/*,.pdf,application/pdf"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setFileName(file.name);
                setPreview((current) => {
                  if (current.startsWith("blob:")) URL.revokeObjectURL(current);
                  return file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
                });
              }}
            />
          </label>
          {preview ? <img className="sheet-preview" src={preview} alt="Uploaded sheet" /> : null}
        </div>
      </section>
    </main>
  );
}
