export type SolveItem = {
  id: string;
  level: "Easy" | "Moderate" | "Hard" | "Case-based";
  chapter: string;
  prompt: string;
  choices: string[];
  answer: number;
  hint: string;
  steps: string[];
  solution: string;
};

export const solveBank: SolveItem[] = [
  {
    id: "tri-1",
    level: "Easy",
    chapter: "Chapter 6: Triangles",
    prompt: "All equilateral triangles are",
    choices: ["congruent", "similar", "isosceles only", "right-angled"],
    answer: 1,
    hint: "Compare the angles, not the side lengths.",
    steps: [
      "Every angle of an equilateral triangle is 60°.",
      "By AAA, equal angles mean the triangles have the same shape.",
      "The sides can still be different lengths, so they need not be congruent.",
    ],
    solution: "All equilateral triangles are similar. They are congruent only when a side matches too.",
  },
  {
    id: "tri-2",
    level: "Easy",
    chapter: "Chapter 6: Triangles",
    prompt: "If a line is drawn parallel to one side of a triangle to intersect the other two sides, then it divides those sides",
    choices: ["equally", "in the same ratio", "in the ratio 1:2", "perpendicularly"],
    answer: 1,
    hint: "This is the basic proportionality theorem.",
    steps: [
      "The line is parallel to the third side.",
      "Corresponding angles are equal, so the small triangle is similar to the large one.",
      "Corresponding sides of similar triangles are proportional.",
    ],
    solution: "The parallel line divides the other two sides in the same ratio.",
  },
  {
    id: "tri-3",
    level: "Moderate",
    chapter: "Chapter 6: Triangles",
    prompt: "In ΔABC and ΔDEF, ∠A = ∠D and ∠B = ∠E. The triangles are similar by",
    choices: ["SSS", "SAS", "AAA", "RHS"],
    answer: 2,
    hint: "Two angles already match. What about the third?",
    steps: [
      "The sum of angles in each triangle is 180°.",
      "So ∠C = ∠F automatically.",
      "Three equal angles give AAA similarity.",
    ],
    solution: "The triangles are similar by AAA.",
  },
  {
    id: "tri-4",
    level: "Moderate",
    chapter: "Chapter 6: Triangles",
    prompt: "Areas of two similar triangles are in the ratio 9:16. Their corresponding sides are in the ratio",
    choices: ["9:16", "3:4", "81:256", "4:3"],
    answer: 1,
    hint: "The ratio of areas is the square of the ratio of sides.",
    steps: [
      "Write 9:16 as 3²:4².",
      "Take the positive square root of each part.",
      "The side ratio is 3:4.",
    ],
    solution: "Corresponding sides are in the ratio 3:4.",
  },
  {
    id: "tri-5",
    level: "Hard",
    chapter: "Chapter 6: Triangles",
    prompt: "A vertical pole of height 6 m casts a shadow 4 m long. At the same time a tower casts a shadow 28 m long. Height of the tower is",
    choices: ["36 m", "42 m", "48 m", "56 m"],
    answer: 1,
    hint: "Same sun, so the triangles are similar.",
    steps: [
      "Pole/shadow = tower/shadow.",
      "6/4 = h/28.",
      "h = 28 × 6 / 4 = 42.",
    ],
    solution: "The tower is 42 m high.",
  },
  {
    id: "tri-6",
    level: "Case-based",
    chapter: "Chapter 6: Triangles",
    prompt: "A girl of height 90 cm is walking away from the base of a lamp-post at 1.2 m/s. If the lamp is 3.6 m above the ground, how far is she from the post after 4 seconds?",
    choices: ["2.4 m", "3.6 m", "4.8 m", "6 m"],
    answer: 2,
    hint: "Distance = speed × time. The similar triangles come later.",
    steps: [
      "Speed is 1.2 m/s and time is 4 s.",
      "Distance = 1.2 × 4.",
      "That is 4.8 m from the post.",
    ],
    solution: "She is 4.8 m from the base of the lamp-post.",
  },
];
