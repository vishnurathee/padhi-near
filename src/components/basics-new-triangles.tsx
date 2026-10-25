import { useState } from "react";

type Concept = {
  id: string;
  level: string;
  name: string;
  title: string;
  video: string;
  start: number;
  end: number;
  time: string;
};

type Item = {
  id: string;
  concept: string;
  prompt: string;
  options: string[];
  answer: number;
};

const concepts: Concept[] = [
  { id: "types", level: "Level 1", name: "Definition and types of triangles", title: "Types of triangles", video: "1k0G-Y41jRA", start: 5, end: 198, time: "0:05 – 3:18" },
  { id: "angle_sum", level: "Level 1", name: "Angle sum property", title: "Angle sum proof only", video: "J_NFSm8iyt0", start: 0, end: 202, time: "0:00 – 3:22" },
  { id: "exterior", level: "Level 1", name: "Exterior angle theorem", title: "Exterior angle proof only", video: "tH_uh8y4zfc", start: 0, end: 299, time: "0:00 – 4:59" },
  { id: "inequality", level: "Level 1", name: "Triangle inequality", title: "Triangle inequality", video: "nTZDIFtNfhE", start: 0, end: 600, time: "0:00 – 10:00" },
  { id: "meaning", level: "Level 2", name: "Meaning of congruence", title: "Congruence and CPCT", video: "PPodsw16rX4", start: 0, end: 208, time: "0:00 – 3:28" },
  { id: "rules", level: "Level 2", name: "SSS, SAS and ASA", title: "The congruence rules", video: "PPodsw16rX4", start: 0, end: 208, time: "0:00 – 3:28" },
  { id: "cpct", level: "Level 2", name: "CPCT and RHS", title: "CPCT and RHS", video: "PPodsw16rX4", start: 0, end: 208, time: "0:00 – 3:28" },
  { id: "similar", level: "Level 3", name: "Similarity and congruence", title: "Similarity criteria, not the full hour", video: "AYZamTjI7Ic", start: 10, end: 720, time: "0:10 – 12:00" },
  { id: "aa", level: "Level 3", name: "AA, SSS and SAS similarity", title: "Only the three theorems", video: "OVNTkUg2BC0", start: 118, end: 2084, time: "1:58 – 34:44" },
  { id: "bpt", level: "Level 3", name: "Basic proportionality", title: "Basic proportionality theorem", video: "94IRgatBRjM", start: 0, end: 413, time: "0:00 – 6:53" },
];

const questions: Item[] = [
  { id: "q1", concept: "types", prompt: "Each angle of an equilateral triangle measures", options: ["45°", "60°", "90°", "120°"], answer: 1 },
  { id: "q2", concept: "types", prompt: "A triangle with sides 7 cm, 7 cm and 10 cm is", options: ["equilateral", "isosceles", "scalene", "right-angled"], answer: 1 },
  { id: "q3", concept: "types", prompt: "A triangle with one angle equal to 90° is", options: ["acute-angled", "obtuse-angled", "right-angled", "equilateral"], answer: 2 },
  { id: "q4", concept: "angle_sum", prompt: "Two angles of a triangle are 55° and 65°. The third angle is", options: ["50°", "60°", "70°", "180°"], answer: 1 },
  { id: "q5", concept: "angle_sum", prompt: "Which of these can be the angles of a triangle?", options: ["40°, 60°, 90°", "50°, 60°, 70°", "30°, 40°, 100°", "20°, 30°, 40°"], answer: 1 },
  { id: "q6", concept: "angle_sum", prompt: "In △ABC, AB = AC and ∠A = 80°. Each base angle is", options: ["50°", "80°", "40°", "100°"], answer: 0 },
  { id: "q7", concept: "exterior", prompt: "An exterior angle is 120°. One opposite interior angle is 50°. The other is", options: ["70°", "50°", "60°", "130°"], answer: 0 },
  { id: "q8", concept: "exterior", prompt: "An exterior angle of a triangle is equal to", options: ["the adjacent interior angle", "the sum of the two interior opposite angles", "the difference of those two angles", "90° in every triangle"], answer: 1 },
  { id: "q9", concept: "exterior", prompt: "An exterior angle is 100° and one opposite interior angle is 35°. The other is", options: ["65°", "80°", "45°", "135°"], answer: 0 },
  { id: "q10", concept: "inequality", prompt: "Which of these can be the sides of a triangle?", options: ["3 cm, 4 cm, 7 cm", "2 cm, 5 cm, 8 cm", "5 cm, 6 cm, 10 cm", "1 cm, 3 cm, 5 cm"], answer: 2 },
  { id: "q11", concept: "inequality", prompt: "The sum of any two sides of a triangle is always", options: ["equal to the third side", "less than the third side", "greater than the third side", "twice the third side"], answer: 2 },
  { id: "q12", concept: "inequality", prompt: "3 cm, 4 cm and 8 cm", options: ["form a right triangle", "form an equilateral triangle", "do not form a triangle", "form an isosceles triangle"], answer: 2 },
  { id: "q13", concept: "meaning", prompt: "If two triangles are congruent, they have", options: ["equal angles only", "equal area only", "the same shape and the same size", "one side double the other"], answer: 2 },
  { id: "q14", concept: "meaning", prompt: "Which of these is not a congruence rule?", options: ["SSS", "SAS", "ASA", "AAA"], answer: 3 },
  { id: "q15", concept: "meaning", prompt: "CPCT stands for", options: ["Corresponding Parts of Congruent Triangles", "Common Parts of Corresponding Triangles", "Congruent Parts of Corresponding Triangles", "Corresponding Points of Concurrent Triangles"], answer: 0 },
  { id: "q16", concept: "rules", prompt: "SAS congruence needs", options: ["two sides and any angle", "two sides and the included angle", "two angles and a non-included side", "three angles"], answer: 1 },
  { id: "q17", concept: "rules", prompt: "ASA congruence needs", options: ["two angles and the included side", "two angles only", "three sides", "the hypotenuse and one acute angle"], answer: 0 },
  { id: "q18", concept: "rules", prompt: "AB = DE, BC = EF and CA = FD. The triangles are congruent by", options: ["SAS", "ASA", "SSS", "RHS"], answer: 2 },
  { id: "q19", concept: "cpct", prompt: "RHS applies when", options: ["any two sides and one angle are equal", "in two right triangles, the hypotenuse and one side are equal", "all three angles are equal", "only the perimeters are equal"], answer: 1 },
  { id: "q20", concept: "cpct", prompt: "If △ABC ≅ △DEF, then ∠B equals", options: ["∠D", "∠E", "∠F", "∠A"], answer: 1 },
  { id: "q21", concept: "cpct", prompt: "Two right triangles have equal hypotenuses and one pair of equal legs. They are congruent by", options: ["SSS", "SAS", "ASA", "RHS"], answer: 3 },
  { id: "q22", concept: "similar", prompt: "All equilateral triangles are", options: ["always congruent", "always similar, not necessarily congruent", "always right-angled", "never similar"], answer: 1 },
  { id: "q23", concept: "similar", prompt: "Similar triangles have", options: ["the same size and the same shape", "equal corresponding angles and proportional sides", "equal sides only", "equal areas only"], answer: 1 },
  { id: "q24", concept: "similar", prompt: "A triangle similar to a right-angled triangle is", options: ["always equilateral", "also right-angled", "always isosceles", "never right-angled"], answer: 1 },
  { id: "q25", concept: "aa", prompt: "Two triangles have two pairs of equal angles. They are similar because", options: ["SSS congruence applies", "RHS applies", "the third angles are equal too, so AA applies", "their areas are equal"], answer: 2 },
  { id: "q26", concept: "aa", prompt: "Which rule is for similarity, not for congruence?", options: ["SSS", "SAS", "RHS", "AAA"], answer: 3 },
  { id: "q27", concept: "aa", prompt: "SAS similarity needs", options: ["two sides proportional and the included angles equal", "two sides equal and the included angles equal", "three angles equal", "the hypotenuse and one side equal"], answer: 0 },
  { id: "q28", concept: "bpt", prompt: "A line parallel to one side of a triangle divides the other two sides", options: ["in the same ratio", "always into equal parts", "at right angles", "only at their mid-points"], answer: 0 },
  { id: "q29", concept: "bpt", prompt: "A line divides two sides of a triangle in the same ratio. The line is", options: ["perpendicular to the third side", "parallel to the third side", "equal to the third side", "the angle bisector"], answer: 1 },
  { id: "q30", concept: "bpt", prompt: "The ratio of the areas of two similar triangles equals", options: ["the ratio of corresponding sides", "the square of that side ratio", "the cube of that side ratio", "the difference of their perimeters"], answer: 1 },
];

const letters = ["A", "B", "C", "D"];

const levels = ["Level 1", "Level 2", "Level 3"] as const;

export function BasicsNewTriangles() {
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [levelIndex, setLevelIndex] = useState(0);
  const [steps, setSteps] = useState([0, 0, 0]);
  const [checked, setChecked] = useState([false, false, false]);

  const level = levels[levelIndex];
  const slug = levelIndex === 0 ? "l1" : levelIndex === 1 ? "l2" : "l3";
  const levelQuestions = questions.filter((item) => concepts.find((entry) => entry.id === item.concept)?.level === level);
  const step = Math.min(steps[levelIndex] ?? 0, levelQuestions.length - 1);
  const current = levelQuestions[step];
  const concept = concepts.find((entry) => entry.id === current?.concept);
  const number = current ? questions.findIndex((entry) => entry.id === current.id) + 1 : 0;
  const levelWeak = concepts.filter(
    (entry) => entry.level === level && questions.some((item) => item.concept === entry.id && picks[item.id] !== item.answer),
  );

  function openLevel(index: number) {
    setLevelIndex(index);
  }

  function nextQuestion() {
    if (step < levelQuestions.length - 1) {
      setSteps((state) => state.map((value, index) => (index === levelIndex ? step + 1 : value)));
      return;
    }
    setChecked((state) => state.map((value, index) => (index === levelIndex ? true : value)));
  }

  return (
    <div id="smart-diagnostic-system-root">
      <style>{`
        #smart-diagnostic-system-root { --dark:#4a1d34; --muted:#7c4a62; width:100%; padding:8px; border-radius:16px; background:#fff5f8; color:var(--dark); font-family:system-ui,-apple-system,sans-serif; }
        #smart-diagnostic-system-root * { box-sizing:border-box; }
        #smart-diagnostic-system-root .main-header { text-align:center; padding-bottom:16px; border-bottom:2px solid #f8d5e2; margin-bottom:16px; }
        #smart-diagnostic-system-root .main-header h2 { color:#9d174d; font-size:24px; font-weight:700; margin:0 0 6px; }
        #smart-diagnostic-system-root .main-header p, #smart-diagnostic-system-root .skip-note { color:var(--muted); font-size:14px; margin:0; line-height:1.5; }
        #smart-diagnostic-system-root .skip-note { margin-top:10px; font-weight:650; }
        #smart-diagnostic-system-root .level-nav { display:flex; gap:10px; margin-bottom:18px; }
        #smart-diagnostic-system-root .level-nav button { flex:1; color:#fff; font-weight:800; padding:12px 8px; border:none; border-radius:10px; cursor:pointer; opacity:0.72; }
        #smart-diagnostic-system-root .level-nav button.is-on { opacity:1; outline:3px solid #fff5f8; box-shadow:0 0 0 2px currentColor; }
        #smart-diagnostic-system-root .l1 { background:#0f766e; color:#0f766e; }
        #smart-diagnostic-system-root .l2 { background:#b45309; color:#b45309; }
        #smart-diagnostic-system-root .l3 { background:#1d4ed8; color:#1d4ed8; }
        #smart-diagnostic-system-root .level-nav .l1, #smart-diagnostic-system-root .level-nav .l2, #smart-diagnostic-system-root .level-nav .l3 { color:#fff; }
        #smart-diagnostic-system-root .level-block { padding:16px; border-radius:14px; background:#fff; border:2px solid transparent; }
        #smart-diagnostic-system-root .level-block.l1 { border-color:#0f766e; }
        #smart-diagnostic-system-root .level-block.l2 { border-color:#b45309; }
        #smart-diagnostic-system-root .level-block.l3 { border-color:#1d4ed8; }
        #smart-diagnostic-system-root .level-heading { font-size:16px; font-weight:800; color:#fff; padding:10px 15px; border-radius:8px; margin:0 0 14px; }
        #smart-diagnostic-system-root .l1 .level-heading { background:#0f766e; }
        #smart-diagnostic-system-root .l2 .level-heading { background:#b45309; }
        #smart-diagnostic-system-root .l3 .level-heading { background:#1d4ed8; }
        #smart-diagnostic-system-root .question-card, #smart-diagnostic-system-root .video-card { background:#fffdfb; border:1px solid #f3e4ea; border-radius:10px; padding:18px; margin-bottom:14px; }
        #smart-diagnostic-system-root .concept-tag { display:inline-block; font-size:11px; font-weight:700; background:#f4f4f5; color:#3f3f46; padding:4px 8px; border-radius:4px; margin-bottom:10px; }
        #smart-diagnostic-system-root .q-text { font-size:15px; font-weight:600; margin:0 0 14px; line-height:1.5; }
        #smart-diagnostic-system-root .progress-line { margin:0 0 10px; font-size:13px; font-weight:700; color:#57534e; }
        #smart-diagnostic-system-root .options-container { display:flex; flex-direction:column; gap:8px; }
        #smart-diagnostic-system-root .option-row { display:flex; align-items:center; width:100%; padding:12px 14px; background:#fff5f8; border:1px solid transparent; border-radius:6px; cursor:pointer; font-size:14px; text-align:left; color:var(--dark); }
        #smart-diagnostic-system-root .l1 .option-row.is-on { border-color:#0f766e; background:#ccfbf1; }
        #smart-diagnostic-system-root .l2 .option-row.is-on { border-color:#b45309; background:#ffedd5; }
        #smart-diagnostic-system-root .l3 .option-row.is-on { border-color:#1d4ed8; background:#dbeafe; }
        #smart-diagnostic-system-root .q-nav { display:flex; gap:10px; }
        #smart-diagnostic-system-root .submit-btn { flex:1; padding:14px; color:#fff; font-size:15px; font-weight:700; border:none; border-radius:8px; cursor:pointer; }
        #smart-diagnostic-system-root .l1 .submit-btn { background:#0f766e; }
        #smart-diagnostic-system-root .l2 .submit-btn { background:#b45309; }
        #smart-diagnostic-system-root .l3 .submit-btn { background:#1d4ed8; }
        #smart-diagnostic-system-root .submit-btn.ghost { background:#fff; color:#44403c; border:1px solid #e7e5e4; }
        #smart-diagnostic-system-root .video-card-header { display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:8px; }
        #smart-diagnostic-system-root .concept-title { font-size:16px; font-weight:700; margin:0; }
        #smart-diagnostic-system-root .l1 .concept-title { color:#0f766e; }
        #smart-diagnostic-system-root .l2 .concept-title { color:#b45309; }
        #smart-diagnostic-system-root .l3 .concept-title { color:#1d4ed8; }
        #smart-diagnostic-system-root .timestamp-badge { background:#44403c; color:#fff; font-size:12px; font-weight:700; padding:4px 8px; border-radius:4px; }
        #smart-diagnostic-system-root .video-wrapper { position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px; margin-top:12px; }
        #smart-diagnostic-system-root .video-wrapper iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
        #smart-diagnostic-system-root .level-clear { margin:0 0 12px; font-weight:700; }
      `}</style>
      <div className="main-header">
        <h2>Class 10 Triangles – Absolute Master Diagnostic</h2>
        <p>Open one level at a time. Each level has its own questions, then its own lecture.</p>
        <p className="skip-note">If you do not understand a question, leave it blank and press Next. A skipped question is counted as not known.</p>
      </div>
      <nav className="level-nav">
        {levels.map((name, index) => (
          <button key={name} type="button" className={`${index === 0 ? "l1" : index === 1 ? "l2" : "l3"}${levelIndex === index ? " is-on" : ""}`} onClick={() => openLevel(index)}>
            {name}
          </button>
        ))}
      </nav>
      <section className={`level-block ${slug}`}>
        <div className="level-heading">
          {level} · question {step + 1} of {levelQuestions.length}
        </div>
        {checked[levelIndex] ? (
          <>
            {levelWeak.length === 0 ? <p className="level-clear">This level is clear. No lecture needed.</p> : null}
            {levelWeak.map((entry) => (
              <article key={entry.id} className="video-card">
                <div className="video-card-header">
                  <p className="concept-title">{entry.name}</p>
                  <span className="timestamp-badge">{entry.time}</span>
                </div>
                <p>{entry.title}. A blank or a wrong answer in this level means this topic is not known yet.</p>
                <div className="video-wrapper">
                  <iframe src={`https://www.youtube.com/embed/${entry.video}?start=${entry.start}&end=${entry.end}&rel=0`} title={entry.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </article>
            ))}
            <div className="q-nav">
              <button type="button" className="submit-btn ghost" onClick={() => setChecked((state) => state.map((value, index) => (index === levelIndex ? false : value)))}>
                Back to questions
              </button>
              {levelIndex < 2 ? (
                <button type="button" className="submit-btn" onClick={() => openLevel(levelIndex + 1)}>
                  Next
                </button>
              ) : null}
            </div>
          </>
        ) : current ? (
          <>
            <article className="question-card">
              <p className="progress-line">
                {level} only. Question {number} of 30.
              </p>
              <span className="concept-tag">{concept?.name}</span>
              <p className="q-text">
                Q{number}. {current.prompt}
              </p>
              <div className="options-container">
                {current.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    className={picks[current.id] === optionIndex ? "option-row is-on" : "option-row"}
                    onClick={() => setPicks((state) => ({ ...state, [current.id]: optionIndex }))}
                  >
                    {letters[optionIndex]}) {option}
                  </button>
                ))}
              </div>
            </article>
            <div className="q-nav">
              <button
                type="button"
                className="submit-btn ghost"
                disabled={step === 0}
                onClick={() => setSteps((state) => state.map((value, index) => (index === levelIndex ? step - 1 : value)))}
              >
                Previous
              </button>
              <button type="button" className="submit-btn" onClick={nextQuestion}>
                Next
              </button>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
