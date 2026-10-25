import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import paperItems from "@/data/papers.json";

type PaperItem = {
  qid: string;
  n: number;
  images: string[];
  answer: string;
  solutions: string[];
  video: string;
  marks: number;
};

const writtenAnswers = [
  {
    n: 1,
    text: `The graph meets the x-axis where y = 0.
The given points on the x-axis are (−6, 0) and (6, 0).
So the zeros of p(x) are −6 and 6.
(0, −30) and (4, −20) are not zeros, because the y-coordinate is not 0.

Answer: (D) −6, 6`,
  },
  {
    n: 2,
    text: `3x − ky = 7 and 6x + 10y = 3
For an inconsistent pair, a₁/a₂ = b₁/b₂ ≠ c₁/c₂.

a₁/a₂ = 3/6 = 1/2
b₁/b₂ = −k/10
−k/10 = 1/2
k = −5

c₁/c₂ = 7/3, which is not 1/2.
So the lines are parallel and the system is inconsistent.

Answer: (B) −5`,
  },
  {
    n: 3,
    text: `(A) is true. Many secants can pass through a point on the circle.
(B) is true. Exactly one tangent can be drawn at a point on the circle.
(C) is true. A chord joins two points on the circle.
(D) is not true. From a point inside the circle, no tangent can be drawn. Two tangents are drawn only from an external point.

Answer: (D)`,
  },
  {
    n: 4,
    text: `aₙ = 7n − 4
a₁ = 7(1) − 4 = 3
a₂ = 7(2) − 4 = 10
Common difference d = a₂ − a₁ = 10 − 3 = 7
The coefficient of n is also the common difference.

Answer: (A) 7`,
  },
  {
    n: 5,
    text: `Volume of the cone = volume of the sphere
(1/3)πr²h = (4/3)πR³
r = R = 5 cm
(1/3)(25)h = (4/3)(125)
25h = 500
h = 20 cm

Answer: (B) 20 cm`,
  },
  {
    n: 6,
    text: `tan θ = 5/2, so sin θ / cos θ = 5/2.
Take sin θ = 5k and cos θ = 2k.

(4 sin θ + cos θ) / (4 sin θ − cos θ)
= (4×5k + 2k) / (4×5k − 2k)
= 22k / 18k
= 11/9

Answer: (A) 11/9`,
  },
  {
    n: 7,
    text: `The radius is perpendicular to the tangent at the point of contact.
So ∠OPT = 90°.
∠TPQ = 110°
∠OPQ = 110° − 90° = 20°

OP = OQ, both radii, so △OPQ is isosceles.
∠OQP = ∠OPQ = 20°
∠POQ = 180° − 20° − 20° = 140°

Answer: (C) 140°`,
  },
  {
    n: 8,
    text: `Zeros are −√(5/2) and √(5/2).
Sum of zeros = 0
Product of zeros = −5/2

A polynomial is x² − (sum)x + product = x² − 5/2.
Clear the fraction: 2x² − 5 = 0.
Option (B) is 8x² − 20 = 4(2x² − 5), which has the same zeros.
Check: 8x² = 20, x² = 5/2, x = ±√(5/2).

Answer: (B) 8x² − 20`,
  },
  {
    n: 9,
    text: `Total frequency n = 45, so n/2 = 22.5
Cumulative frequencies: 5, 14, 29, 39, 45
22.5 lies in the class whose cumulative frequency first reaches 29.
That class is 20–30.
Its upper limit is 30.

Answer: (C) 30`,
  },
  {
    n: 10,
    text: `∠BOC = 80°
∠AOD and ∠BOC are vertically opposite, so ∠AOD = 80°.
OA = OD, so △ODA is isosceles.
Base angles = (180° − 80°)/2 = 50° each.

Angles in the same segment give ∠OAD = ∠OBC and ∠ODA = ∠OCB.
So △ODA ~ △OBC, and △OBC is isosceles as well.

Answer: (B) isosceles and similar`,
  },
  {
    n: 11,
    text: `x² + x − 1 = 0
Discriminant D = b² − 4ac = 1 − 4(1)(−1) = 5
D > 0, so the roots are real and distinct.
5 is not a perfect square, so the roots are irrational.

Answer: (A) Irrational and distinct`,
  },
  {
    n: 12,
    text: `θ = 30°
tan 30° = 1/√3
3 tan θ = 3 × (1/√3) = 3/√3

Answer: (C) 3/√3`,
  },
  {
    n: 13,
    text: `Volume of a solid hemisphere = (2/3)πr³ = 396/7
(2/3) × (22/7) × r³ = 396/7
(44/3) r³ = 396
r³ = 396 × 3 / 44 = 27
r = 3 cm

Total surface area = 3πr²
= 3 × (22/7) × 9
= 594/7 cm²

Answer: (B) 594/7`,
  },
  {
    n: 14,
    text: `White balls = 24 − 4 − 11 = 9
P(white) = 9/24 = 3/8

Answer: (B) 3/8`,
  },
  {
    n: 15,
    text: `The shortest path from a point to the x-axis is the perpendicular.
From (−4, −5), the foot of the perpendicular is (−4, 0).
Distance = 5, which is smaller than the distance to any other point on the x-axis.

Answer: (B) (−4, 0)`,
  },
  {
    n: 16,
    text: `The middle-most observation, after the data is arranged in order, is the median.
Mean is the average, mode is the most frequent value, and range is the difference of the extremes.

Answer: (A) Median`,
  },
  {
    n: 17,
    text: `The point divides A(2, −3) and B(5, 6) in the ratio 1 : 2.
x = (1×5 + 2×2) / (1 + 2) = 9/3 = 3
y = (1×6 + 2×(−3)) / 3 = 0/3 = 0
The point is (3, 0), which lies on the x-axis.

Answer: (C) (3, 0)`,
  },
  {
    n: 18,
    text: `A deck has 52 cards.
Red face cards are the jack, queen and king of hearts and of diamonds.
Number of favourable cards = 6
P(red face card) = 6/52 = 3/26

Answer: (D) 3/26`,
  },
  {
    n: 19,
    text: `Assertion: Any two consecutive even natural numbers differ by 2, and both are divisible by 2. Their HCF is 2. So (A) is true.
Reason: Every even natural number is divisible by 2. So (R) is also true.
(R) does not explain why the HCF is always 2. Two even numbers that are not consecutive can have a larger HCF, such as 6 and 12.

Answer: (B) Both are true, and (R) is not the correct explanation of (A).`,
  },
  {
    n: 20,
    text: `Perimeter of a sector = arc length + 2r = πrθ/180 + 2r
New radius = r/2 and new angle = 2θ.
New perimeter = π(2θ)(r/2)/180 + 2(r/2) = πrθ/180 + r
This is not the same as the original perimeter, so (A) is false.

Reason: length of the arc = (θ/360) × 2πr = πrθ/180.
So (R) is true.

Answer: (D) Assertion is false, but reason is true.`,
  },
  {
    n: 21,
    text: `(A)
Prime factorisation:
480 = 2⁵ × 3 × 5
720 = 2⁴ × 3² × 5

LCM is the product of the highest powers of all the primes.
LCM(480, 720) = 2⁵ × 3² × 5 = 32 × 9 × 5 = 1440

HCF is the product of the lowest powers of the common primes.
HCF(480, 720) = 2⁴ × 3 × 5 = 16 × 3 × 5 = 240

OR

(B)
85 = 5 × 17
238 = 2 × 7 × 17
HCF(85, 238) = 17

17 = 85m − 238
85m = 255
m = 3`,
  },
  {
    n: 22,
    text: `(A)
Total number of possible outcomes = 6 × 6 = 36
The product is odd only when both numbers are odd.
Favourable outcomes: (7, 7), (7, 9), (7, 11), (9, 7), (9, 9), (9, 11), (11, 7), (11, 9), (11, 11)
Number of favourable outcomes = 9
P(product is odd) = 9/36 = 1/4

OR

(B)
Total three-digit numbers = 900
Numbers with hundreds digit 8 and units digit 5 are 805, 815, 825, …, 895.
This is an AP with first term 805, last term 895 and common difference 10.
Number of such numbers = (895 − 805)/10 + 1 = 10
P(selecting one such number) = 10/900 = 1/90`,
  },
  {
    n: 23,
    text: `2(√3/2)² − (1/√3)²
= ——————————————
        (√2)²

= [2 × 3/4 − 1/3] / 2
= (3/2 − 1/3) / 2
= [(9 − 2)/6] / 2
= (7/6) / 2
= 7/12`,
  },
  {
    n: 24,
    text: `Let the required point on the x-axis be (x, 0).

√[(8 − x)² + 25] = √41
(8 − x)² + 25 = 41
(8 − x)² = 16
8 − x = ±4

8 − x = 4 gives x = 4
8 − x = −4 gives x = 12

The two points are (4, 0) and (12, 0).`,
  },
  {
    n: 25,
    text: `AB = √[(3 + 5)² + (0 − 6)²] = √(64 + 36) = √100 = 10
BC = √[(9 − 3)² + (8 − 0)²] = √(36 + 64) = √100 = 10
AC = √[(9 + 5)² + (8 − 6)²] = √(196 + 4) = √200 = 10√2

AB = BC
Therefore △ABC is isosceles.`,
  },
  {
    n: 26,
    text: `(A)
D, E and F are the mid-points of BC, CA and AB respectively.
So EF ∥ BC, DF ∥ AC and DE ∥ AB.

BDEF is a parallelogram, so ∠1 = ∠2 and ∠3 = ∠4.
Hence △FBD ~ △DEF.

DCEF is also a parallelogram, so ∠3 = ∠6 and ∠1 = ∠2.
Therefore the corresponding angles are equal, and △DEF ~ △ABC.

OR

(B)
PQ ∥ BC, so the corresponding angles are equal.
Therefore △APR ~ △ABD.
AP/AB = PR/BD`,
  },
  {
    n: 27,
    text: `Let the numbers be x and 18 − x.

1/x + 1/(18 − x) = 9/40
18 / [x(18 − x)] = 9/40
18 × 40 = 9x(18 − x)
x(18 − x) = 80
18x − x² = 80
x² − 18x + 80 = 0
(x − 10)(x − 8) = 0
x = 10 or x = 8

The two numbers are 8 and 10.`,
  },
  {
    n: 28,
    text: `For the given polynomial, α + β = 5/6 and αβ = 1/6.

α² + β² = (α + β)² − 2αβ
= (5/6)² − 2 × (1/6)
= 25/36 − 12/36
= 13/36

α²β² = (αβ)² = (1/6)² = 1/36

The polynomial whose roots are α² and β² is
x² − (α² + β²)x + α²β² = 0
x² − (13/36)x + 1/36 = 0

Multiplying through by 36,
36x² − 13x + 1 = 0

The required polynomial is 36x² − 13x + 1.`,
  },
  {
    n: 29,
    text: `(cos θ + sin θ)² + (cos θ − sin θ)² = 2(cos²θ + sin²θ) = 2

Using (cos θ + sin θ)² = 1,
1 + (cos θ − sin θ)² = 2
(cos θ − sin θ)² = 1
cos θ − sin θ = ±1`,
  },
  {
    n: 30,
    text: `(A)
The minute hand turns 6° in one minute, so in 5 minutes it turns 30°.
Length of the minute hand, r = 18 cm.
Area swept = (θ/360) × πr²
= (30/360) × (22/7) × 18 × 18 × 7, as worked in the key
= 594 cm²

OR

(B)
Area of the minor segment = area of sector OAB − area of △OAB
= (60/360) × (22/7) × 14 × 14 − (√3/4) × 14 × 14
= 17.89 cm²`,
  },
  {
    n: 31,
    text: `Let √3 be a rational number.
Then √3 = p/q, where q ≠ 0 and p, q are co-prime integers.

3q² = p²
So p² is divisible by 3, and hence p is divisible by 3.
Let p = 3a.

9a² = 3q²
q² = 3a²
So q² is divisible by 3, and hence q is divisible by 3.

Then p and q have 3 as a common factor. This contradicts the fact that p and q are co-prime.
Therefore √3 is irrational.`,
  },
  {
    n: 32,
    text: `(A)
The equations are x + 2y = 3 and 2x − 3y + 8 = 0.
The correct graph of each line is drawn.
The lines meet at x = −1, y = 2.
Check: −1 + 2(2) = 3 and 2(−1) − 3(2) + 8 = 0.
Solution: x = −1 and y = 2.

OR

(B)
Let the speed of car I from A be x km/h and the speed of car II from B be y km/h, with x > y.

Same direction: distance gained in 9 hours is 9(x − y) = 180.
x − y = 20  …… (i)

Opposite directions: distance covered in 1 hour is x + y = 180.  …… (ii)

Adding (i) and (ii): 2x = 200, so x = 100.
Then y = 80.
The speeds are 100 km/h and 80 km/h.`,
  },
  {
    n: 33,
    text: `Given, to prove, construction and figure are stated correctly, and the proof is completed.

Tangents from an external point are equal.
AR = AQ = 7 cm
BP = BR = AB − AR = 3 cm
CP = CQ = 5 cm
BC = BP + PC = 3 + 5 = 8 cm`,
  },
  {
    n: 34,
    text: `Let A be the position of the eye, and B, C the two positions of the balloon.
Distance covered by the balloon in 12 seconds = 3 × 12 = 36 m.
So BC = GF = 36 m.

tan 60° = √3 = h/x
h = x√3  …… (i)

tan 30° = 1/√3 = h/(x + 36)
h = (x + 36)/√3  …… (ii)

From (i) and (ii),
x√3 = (x + 36)/√3
3x = x + 36
2x = 36
x = 18
h = 18√3 = 31.14 m

Height of the balloon from the ground = 1.35 + 31.14 = 32.49 m.`,
  },
  {
    n: 35,
    text: `Using the step-deviation table with assumed mean 102.5 and class width 5:
Σf = 120 and Σfu = −39

Mean = 102.5 + 5 × (−39/120)
= 102.5 − 1.625
= 100.875

N/2 = 60, so the median class is 100–105.
Median = 100 + (5/18)(60 − 57)
= 100 + 15/18
= 100.83

OR

172 + x = 200, so x = 28.
Mean = 532500/200 = 2662.5`,
  },
  {
    n: 36,
    text: `(i)
First term a = 3.
The AP is 3, 6, 9, 12, …, 24.
Common difference d = 6 − 3 = 3.

(ii)
34 = 3 + (n − 1)3
3(n − 1) = 31
n − 1 = 31/3
n = 34/3 = 11.5
n is not a positive integer.
Therefore it is not possible to have 34 jars in a layer if the pattern is continued.

(iii) (A)
Sₙ = n/2 × [2×3 + (n − 1)3]
= n/2 × (3n + 3)
= (3n/2)(n + 1)
S₈ = 3 × 8/2 × (1 + 8) = 108

OR

(iii) (B)
The AP is 6, 9, 12, …
a = 6, d = 3
t₅ = 6 + (5 − 1)3 = 6 + 12 = 18`,
  },
  {
    n: 37,
    text: `(i)
∠DPQ = ∠DEF and ∠PDQ = ∠EDF.
Therefore △DPQ ~ △DEF, by AA.

(ii)
DE = 50 + 70 = 120 cm
Corresponding sides of similar triangles are proportional.
PQ/EF = DP/DE = 50/120 = 5/12

(iii) (A)
AB/DE = BC/EF = AC/DF = 5/2
So AB = (5/2) DE
Perimeter of △ABC / perimeter of △DEF = 5/2, which is constant.

OR

(iii) (B)
AB/DE = BC/EF = BM/EN, and ∠B = ∠E.
Therefore △ABM ~ △DEN.`,
  },
  {
    n: 38,
    text: `(i)
Slant height, l = √(r² + h²)
= √[(1.5)² + 2²]
= √(2.25 + 4)
= √6.25
= 2.5 m

(ii)
CSA of the cone = πrl
= (22/7) × 1.5 × 2.5
= 11.78 m²

(iii) (A)
CSA of the cylinder = 2πrh
= 2 × (22/7) × 1.5 × 7
= 66 m²
Cost of the metal sheet = 66 × 2000 = ₹1,32,000

OR

(iii) (B)
Volume of the cylinder = πr²h
= (22/7) × (1.5)² × 7
= 49.5 m³

Volume of the cone = (1/3)πr²h
= (1/3) × (22/7) × (1.5)² × 2
= 4.71 m³

Total capacity = 49.5 + 4.71 = 54.21 m³`,
  },
];
function videoEmbed(url: string) {
  const id = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/)?.[1];
  const start = url.match(/[?&]t=(\d+)/)?.[1];
  if (!id) return url;
  return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
}

const examMs = 3 * 60 * 60 * 1000;
const items = paperItems as PaperItem[];

function clock(ms: number) {
  return new Date(ms).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

function leftLabel(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

export const Route = createFileRoute("/papers/")({ component: PapersPage });

function PapersPage() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [longMark, setLongMark] = useState<Record<string, "read" | "done">>({});
  const [panel, setPanel] = useState<"video" | "answers" | null>(null);
  const [videoN, setVideoN] = useState<number | null>(null);
  const [answerN, setAnswerN] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const objective = items.filter((item) => item.n <= 20);
  const solved = objective.filter((item) => picks[item.qid]).length;
  const longDone = items.filter((item) => item.n >= 21 && longMark[item.qid] === "done").length;
  const doneCount = solved + longDone;
  const right = objective.filter((item) => picks[item.qid] === item.answer);
  const wrong = objective.filter((item) => picks[item.qid] && picks[item.qid] !== item.answer);
  const left = startedAt === null ? examMs : Math.max(0, startedAt + examMs - now);
  const timeUp = startedAt !== null && left === 0;

  useEffect(() => {
    const saved = sessionStorage.getItem("padhaai-exam-start");
    if (saved) setStartedAt(Number(saved));
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  function startPaper() {
    const start = Date.now();
    sessionStorage.setItem("padhaai-exam-start", String(start));
    setStartedAt(start);
    setNow(start);
  }

  return (
    <main className="paper-dash">
      <aside className="paper-side">
        {startedAt ? (
          <>
            <p className="paper-kicker">Exam started</p>
            <p className="paper-timer" aria-live="polite">
              {timeUp ? "00:00:00" : leftLabel(left)}
            </p>
            <p className="paper-lead">{timeUp ? "Time is up." : "3 hours left, counting down."}</p>
          </>
        ) : (
          <>
            <p className="paper-timer">03:00:00</p>
            <button type="button" className="paper-check" onClick={startPaper}>
              Start paper
            </button>
          </>
        )}
        <h1 className="paper-title">
          <span className="paper-title-word">Sample paper</span>
          <span className="paper-year">2026–27</span>
        </h1>
        <div className="paper-lines" aria-hidden="true" />
        <p className="paper-cheer">Read it once. Write it clean.</p>
        <p className="paper-cheer">Three hours. Every mark is yours.</p>
        <div className="paper-progress" aria-label="Questions tried">
          <div className="paper-progress-top">
            <span>Done</span>
            <strong>
              {doneCount} / {items.length}
            </strong>
          </div>
          <div className="paper-progress-track">
            <div className="paper-progress-fill" style={{ width: `${(doneCount / items.length) * 100}%` }} />
          </div>
        </div>
        <button type="button" className="paper-check" disabled={checked} onClick={() => setChecked(true)}>
          {checked ? "Checked" : "Check at the end"}
        </button>
        <Link to="/c/$classId" params={{ classId: "10" }} search={{ tab: "home" }} className="feature-back">
          ← Back
        </Link>
      </aside>
      <div className="paper-scroll">
        {items.map((item, index) => (
          <article key={item.qid} className="paper-card" style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}>
            <p className="paper-meta">
              Question {item.n} · {item.marks} mark{item.marks === 1 ? "" : "s"}
            </p>
            {item.images.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
            {item.n <= 20 ? (
              <div className="paper-options">
                {["A", "B", "C", "D"].map((letter) => {
                  const picked = picks[item.qid];
                  let cls = "";
                  if (!checked && picked === letter) cls = "is-picked";
                  if (checked && letter === item.answer) cls = "is-right";
                  else if (checked && picked === letter) cls = "is-wrong";
                  return (
                    <button
                      key={letter}
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => setPicks((state) => ({ ...state, [item.qid]: letter }))}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="paper-long">
                <p>Find this answer yourself. The full working is under Topper's answer, at the bottom.</p>
                <div className="paper-long-actions">
                  <button
                    type="button"
                    className={longMark[item.qid] === "read" ? "is-on" : ""}
                    onClick={() => setLongMark((state) => ({ ...state, [item.qid]: "read" }))}
                  >
                    Mark as read
                  </button>
                  <button
                    type="button"
                    className={longMark[item.qid] === "done" ? "is-done" : ""}
                    onClick={() => setLongMark((state) => ({ ...state, [item.qid]: "done" }))}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
        {checked ? (
          <section className="paper-result">
            <p>
              {right.length} right, {wrong.length} wrong
            </p>
            <div className="paper-nums">
              {items.map((item) => {
                if (item.n >= 21) {
                  return (
                    <span key={item.qid} className="is-plain">
                      {item.n}
                    </span>
                  );
                }
                const picked = picks[item.qid];
                const ok = picked === item.answer;
                return (
                  <span key={item.qid} className={!picked ? "is-skip" : ok ? "is-ok" : "is-bad"}>
                    {item.n}
                  </span>
                );
              })}
            </div>
          </section>
        ) : null}
        <section className="paper-tools">
          <button type="button" className={panel === "video" ? "paper-tool is-on" : "paper-tool"} onClick={() => setPanel((value) => (value === "video" ? null : "video"))}>
            Video solution
          </button>
          <button type="button" className={panel === "answers" ? "paper-tool is-on" : "paper-tool"} onClick={() => setPanel((value) => (value === "answers" ? null : "answers"))}>
            Topper's answer
          </button>
          {panel === "video" ? (
            <div className="paper-tool-body">
              <p>Open a question number. Its video plays underneath.</p>
              <div className="paper-nums">
                {items.map((item) => (
                  <button key={item.qid} type="button" className={videoN === item.n ? "is-on" : ""} onClick={() => setVideoN((value) => (value === item.n ? null : item.n))}>
                    {item.n}
                  </button>
                ))}
              </div>
              {videoN ? (
                <div className="paper-player">
                  <p>Question {videoN}</p>
                  <iframe src={videoEmbed(items.find((item) => item.n === videoN)?.video ?? "")} title={`Video solution ${videoN}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              ) : null}
            </div>
          ) : null}
          {panel === "answers" ? (
            <div className="paper-tool-body">
              <p>Open a question number. The topper's answer comes underneath.</p>
              <div className="paper-nums">
                {writtenAnswers.map((item) => (
                  <button key={item.n} type="button" className={answerN === item.n ? "is-on" : ""} onClick={() => setAnswerN((value) => (value === item.n ? null : item.n))}>
                    {item.n}
                  </button>
                ))}
              </div>
              {answerN ? (
                <div className="paper-player">
                  <p>Question {answerN}. This is the topper's answer.</p>
                  <div className="paper-working">{writtenAnswers.find((item) => item.n === answerN)?.text}</div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
        {checked ? null : (
          <button type="button" className="paper-check paper-check-end" onClick={() => setChecked(true)}>
            Check at the end
          </button>
        )}
        {startedAt ? (
          <p className="paper-span">
            {timeUp ? "End of the time. " : ""}
            You worked from {clock(startedAt)} to {clock(timeUp ? startedAt + examMs : now)}.
          </p>
        ) : null}
      </div>
    </main>
  );
}
