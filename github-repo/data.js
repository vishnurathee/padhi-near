// Question banks. Added after the pages existed.

var BASIC = [
  { level: 1, topic: "Types", q: "Each angle of an equilateral triangle measures", options: ["45°", "60°", "90°", "120°"], answer: 1, video: "1k0G-Y41jRA", start: 5, end: 198 },
  { level: 1, topic: "Angle sum", q: "Two angles of a triangle are 55° and 65°. The third angle is", options: ["50°", "60°", "70°", "180°"], answer: 1, video: "J_NFSm8iyt0", start: 0, end: 202 },
  { level: 1, topic: "Exterior angle", q: "An exterior angle is 120°. One opposite interior angle is 50°. The other is", options: ["70°", "50°", "60°", "130°"], answer: 0, video: "tH_uh8y4zfc", start: 0, end: 299 },
  { level: 1, topic: "Inequality", q: "Which of these can be the sides of a triangle?", options: ["3 cm, 4 cm, 7 cm", "2 cm, 5 cm, 8 cm", "5 cm, 6 cm, 10 cm", "1 cm, 3 cm, 5 cm"], answer: 2, video: "nTZDIFtNfhE", start: 0, end: 600 },
  { level: 2, topic: "Congruence", q: "Which of these is not a congruence rule?", options: ["SSS", "SAS", "ASA", "AAA"], answer: 3, video: "PPodsw16rX4", start: 0, end: 208 },
  { level: 2, topic: "SAS", q: "SAS congruence needs", options: ["two sides and any angle", "two sides and the included angle", "three angles", "only the perimeter"], answer: 1, video: "PPodsw16rX4", start: 0, end: 208 },
  { level: 2, topic: "CPCT", q: "CPCT stands for", options: ["Corresponding Parts of Congruent Triangles", "Common Parts of Corresponding Triangles", "Congruent Points of a Triangle", "Corresponding Perimeters of Congruent Triangles"], answer: 0, video: "PPodsw16rX4", start: 0, end: 208 },
  { level: 2, topic: "Order", q: "If △ABC ≅ △DEF, then ∠B equals", options: ["∠D", "∠E", "∠F", "∠A"], answer: 1, video: "PPodsw16rX4", start: 0, end: 208 },
  { level: 3, topic: "Similarity", q: "All equilateral triangles are", options: ["always congruent", "always similar, not necessarily congruent", "always right-angled", "never similar"], answer: 1, video: "AYZamTjI7Ic", start: 10, end: 720 },
  { level: 3, topic: "AA", q: "Two triangles have two pairs of equal angles. They are similar because", options: ["SSS congruence applies", "the areas match", "the third angles match too, so AA applies", "a side is shared"], answer: 2, video: "OVNTkUg2BC0", start: 118, end: 836 },
  { level: 3, topic: "BPT", q: "A line parallel to one side of a triangle divides the other two sides", options: ["in the same ratio", "always in half", "at right angles", "only at the mid-points"], answer: 0, video: "94IRgatBRjM", start: 0, end: 413 },
  { level: 3, topic: "Areas", q: "The ratio of the areas of two similar triangles equals", options: ["the side ratio", "the square of the side ratio", "the cube of the side ratio", "the difference of perimeters"], answer: 1, video: "AYZamTjI7Ic", start: 10, end: 720 }
];

var SOLVE = [
  {
    q: "All equilateral triangles are",
    options: ["congruent", "similar", "isosceles only", "right-angled"],
    answer: 1,
    hint: "Compare the angles, not the side lengths.",
    steps: ["Every angle is 60°.", "Equal angles mean the same shape.", "Sides can still differ, so they need not be congruent."],
    final: "All equilateral triangles are similar. They are congruent only when a side matches too."
  },
  {
    q: "A line parallel to one side of a triangle divides the other two sides",
    options: ["equally", "in the same ratio", "in the ratio 1:2", "perpendicularly"],
    answer: 1,
    hint: "This is the basic proportionality theorem.",
    steps: ["The line is parallel to the third side.", "The small triangle is similar to the large one.", "Corresponding sides are proportional."],
    final: "The two sides are divided in the same ratio."
  },
  {
    q: "In △ABC, DE ∥ BC. AD = x, DB = x − 2, AE = x + 2, EC = x − 1. Find x.",
    options: ["2", "3", "4", "6"],
    answer: 2,
    hint: "Use BPT. AD/DB = AE/EC.",
    steps: ["x / (x − 2) = (x + 2) / (x − 1).", "Cross multiply: x(x − 1) = (x − 2)(x + 2).", "x² − x = x² − 4, so x = 4."],
    final: "x = 4. Check: 4/2 = 6/3 = 2."
  },
  {
    q: "An exterior angle is 110°. One opposite interior angle is 40°. The other is",
    options: ["70°", "150°", "40°", "80°"],
    answer: 0,
    hint: "Exterior angle = sum of the two interior opposite angles.",
    steps: ["110° = 40° + the other angle.", "The other angle = 110° − 40°.", "That is 70°."],
    final: "The other opposite interior angle is 70°."
  },
  {
    q: "SAS similarity needs",
    options: ["two sides proportional and the included angles equal", "two sides equal and the included angles equal", "three angles equal", "the hypotenuse and one side equal"],
    answer: 0,
    hint: "Similarity uses a ratio. Congruence uses equal lengths.",
    steps: ["Take two pairs of sides.", "Their ratios must match.", "The angle between those sides must be equal."],
    final: "Two sides in proportion, and the included angles equal."
  }
];

var PAPER = [
  { n: 1, kind: "mcq", q: "The graph of p(x) passes through (−6, 0) and (6, 0). The zeros are", options: ["−6, 0", "4, 6", "−30, −20", "−6, 6"], answer: 3, video: "m4l-jXe7ykQ", topper: "" },
  { n: 2, kind: "mcq", q: "The value of k for which 3x − ky = 7 and 6x + 10y = 3 is inconsistent is", options: ["−10", "−5", "5", "7"], answer: 1, video: "bPxXZmA0xzw", topper: "" },
  { n: 3, kind: "mcq", q: "Which statement is not true?", options: ["Many secants can pass through a point on a circle.", "Only one tangent can be drawn at a point on a circle.", "A chord joins two points on the circle.", "From a point inside a circle, two tangents can be drawn."], answer: 3, video: "w5CQcsF7BgI", topper: "" },
  { n: 4, kind: "mcq", q: "If the nth term of an A.P. is 7n − 4, the common difference is", options: ["7", "7n", "−4", "4"], answer: 0, video: "-fWfOkoRmsI", topper: "" },
  { n: 5, kind: "mcq", q: "A cone and a sphere each have radius 5 cm. Volumes are equal. Height of the cone is", options: ["5 cm", "20 cm", "10 cm", "4 cm"], answer: 1, video: "bPxXZmA0xzw", topper: "" },
  { n: 6, kind: "long", q: "Find the LCM of 480 and 720 by prime factorisation.", video: "m4l-jXe7ykQ", topper: "480 = 2^5 × 3 × 5 and 720 = 2^4 × 3^2 × 5. LCM takes the highest powers: 2^5 × 3^2 × 5 = 1440." },
  { n: 7, kind: "long", q: "Prove that the lengths of tangents drawn from an external point to a circle are equal.", video: "w5CQcsF7BgI", topper: "Join the centre O to the external point P and to the points of contact A and B. OA and OB are radii, so ∠OAP = ∠OBP = 90°. OP is common and OA = OB, so the two right triangles are congruent by RHS. Hence PA = PB." },
  { n: 8, kind: "long", q: "In △ABC, DE ∥ BC. AD = 4 cm, DB = 6 cm, AE = 5 cm. Find EC.", video: "94IRgatBRjM", topper: "By BPT, AD/DB = AE/EC. 4/6 = 5/EC. EC = 5 × 6 / 4 = 7.5 cm." }
];
