import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StepArrows } from "@/components/step-arrows";
import toppers from "@/data/toppers.json";

type Mentor = {
  id: string;
  name: string;
  result: string;
  focus: string;
  intro: string;
  replies: { q: string; a: string }[];
};

const photos: Record<string, string> = {
  anaya: "/toppers/anaya.jpg",
  vihaan: "/toppers/vihaan.jpg",
  meher: "/toppers/meher.jpg",
};

const slots: Record<string, { when: string; open: boolean }[]> = {
  anaya: [
    { when: "Morning 7:00–8:30", open: true },
    { when: "Afternoon 2:00–4:00", open: false },
    { when: "Evening 6:00–7:30", open: true },
    { when: "Sunday", open: false },
  ],
  vihaan: [
    { when: "Morning 6:30–8:00", open: true },
    { when: "Afternoon 3:00–5:00", open: true },
    { when: "Night 9:00–11:00", open: false },
    { when: "Saturday", open: false },
  ],
  meher: [
    { when: "Morning 8:00–9:30", open: true },
    { when: "Afternoon 1:00–3:00", open: false },
    { when: "Evening 5:00–6:30", open: true },
    { when: "Friday night", open: false },
  ],
};

const subjects = [
  { id: "science", name: "Science", mentors: ["anaya"] },
  { id: "maths", name: "Mathematics", mentors: ["anaya", "vihaan"] },
  { id: "physics", name: "Physics", mentors: ["vihaan"] },
  { id: "accounts", name: "Accounts", mentors: ["meher"] },
];

const topicCopy: Record<string, string> = {
  Science: "Board science: concepts, diagrams, and the questions that come back every year.",
  Mathematics: "Triangles, proofs, and the small mistakes that cost marks.",
  Physics: "Derivations first, then one numerical so the steps stay.",
  Accounts: "Journal entries and the format that carries half the marks.",
};

const mentorTopics: Record<string, string[]> = {
  anaya: ["Science", "Mathematics"],
  vihaan: ["Physics", "Mathematics"],
  meher: ["Accounts"],
};

const mentors = toppers as Mentor[];

export const Route = createFileRoute("/toppers")({ component: ToppersPage });

function ToppersPage() {
  const [activeId, setActiveId] = useState(mentors[0]?.id ?? "");
  const mentor = mentors.find((item) => item.id === activeId) ?? mentors[0];
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [thread, setThread] = useState<{ from: "me" | "them"; text: string }[]>(mentor ? [{ from: "them", text: mentor.intro }] : []);
  const [booked, setBooked] = useState<string[]>([]);
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const subject = subjects.find((item) => item.id === subjectId) ?? null;
  const visible = subject ? mentors.filter((item) => subject.mentors.includes(item.id)) : [];

  if (!mentor) return null;

  function book(when: string) {
    const key = `${mentor.id}|${when}`;
    setBooked((list) => (list.includes(key) ? list : [...list, key]));
  }

  function pick(id: string) {
    const next = mentors.find((item) => item.id === id);
    if (!next) return;
    setActiveId(id);
    setAsked([]);
    setOpen(true);
    setThread([{ from: "them", text: next.intro }]);
  }

  function ask(question: string, answer: string) {
    if (asked.includes(question)) return;
    setAsked((list) => [...list, question]);
    setThread((list) => [...list, { from: "me", text: question }, { from: "them", text: answer }]);
  }

  return (
    <main className="c10 solve-page toppers-page">
      <header className="c10-bar">
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="feature-back">
          ← Back
        </Link>
        <Link to="/" className="c10-logo">
          Padhaai <span>Neev</span>
        </Link>
        <StepArrows back="/solve" forward="/evaluate" />
        <span className="vip-badge">Class 10th VIP Portal</span>
      </header>
      <section className="vip-window">
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="vip-back">
          ← Back to core menu
        </Link>
        <h1 className="vip-title">1v1 talks with toppers</h1>
        <p className="vip-note">Want to talk about Science topics, Mathematics, Physics, or Accounts?</p>
        {subject ? (
          <button
            type="button"
            className="subject-back"
            onClick={() => {
              setSubjectId(null);
              setOpen(false);
            }}
          >
            ← Subjects
          </button>
        ) : (
          <div className="subject-grid">
            {subjects.map((item) => (
              <button key={item.id} type="button" className={`subject-card subject-${item.id}`} onClick={() => setSubjectId(item.id)}>
                <span>Subject</span>
                {item.name}
              </button>
            ))}
          </div>
        )}
        {subject ? (
        <div className="topper-grid">
          {visible.map((item) => (
            <article key={item.id} className={item.id === mentor.id && open ? "topper-card is-on" : "topper-card"}>
              <div className="topper-photo">
                <img src={photos[item.id]} alt="" />
                <span>{item.result}</span>
              </div>
              <div className="topper-copy">
                <h2>{item.name}</h2>
                <p>{item.focus}</p>
                <div className="topic-detail">
                  {(mentorTopics[item.id] ?? []).map((topic) => (
                    <div key={topic}>
                      <strong>{topic}</strong>
                      <span>{topicCopy[topic]}</span>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => pick(item.id)}>
                  See slots
                </button>
              </div>
            </article>
          ))}
        </div>
        ) : null}
        {open ? (
          <div className="slot-float-back" onClick={() => setOpen(false)}>
            <div className="slot-float" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="slot-close" onClick={() => setOpen(false)}>
                Close
              </button>
              <img className="slot-face" src={photos[mentor.id]} alt="" />
              <h2>{mentor.name}</h2>
              <p className="slot-focus">{mentor.focus}</p>
              <div className="topic-detail">
                {(mentorTopics[mentor.id] ?? []).map((topic) => (
                  <div key={topic}>
                    <strong>{topic}</strong>
                    <span>{topicCopy[topic]}</span>
                  </div>
                ))}
              </div>
              <p className="slot-label">Slots</p>
              <ul className="slot-list">
                {(slots[mentor.id] ?? []).map((slot) => {
                  const key = `${mentor.id}|${slot.when}`;
                  const isBooked = booked.includes(key);
                  if (!slot.open) {
                    return (
                      <li key={slot.when} className="is-shut">
                        <span>{slot.when}</span>
                        <strong>Not available</strong>
                      </li>
                    );
                  }
                  return (
                    <li key={slot.when} className={isBooked ? "is-booked" : "is-open"}>
                      <span>{slot.when}</span>
                      <button type="button" disabled={isBooked} onClick={() => book(slot.when)}>
                        {isBooked ? "Booked" : "Available"}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {booked.some((key) => key.startsWith(`${mentor.id}|`)) ? (
                <p className="slot-booked-note">Booked with {mentor.name}. This stays on this device.</p>
              ) : null}
              <div className="talk">
                {thread.map((line, index) => (
                  <p key={`${line.from}-${index}`} className={line.from === "me" ? "is-me" : "is-them"}>
                    {line.text}
                  </p>
                ))}
                <div className="talk-asks">
                  {mentor.replies.map((reply) => (
                    <button key={reply.q} type="button" disabled={asked.includes(reply.q)} onClick={() => ask(reply.q, reply.a)}>
                      {reply.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
