import raw from "@/data/curriculum.json";

export type Question = {
  prompt: string;
  choices: string[];
  answer: number;
  why: string;
};

export type Chapter = {
  id: string;
  title: string;
  summary: string;
  formula: string;
  points: string[];
  questions: Question[];
};

export type Subject = {
  id: string;
  name: string;
  blurb?: string;
  hindi?: string;
  stream?: string;
  chapters: Chapter[];
};

export type StreamId = "science" | "commerce" | "arts";

type Bank = {
  classes: Record<string, { id: string; title: string; badge: string; blurb: string; hindi?: string }>;
  streams: { id: StreamId; name: string; blurb: string }[];
  subjects: Record<string, Subject[]>;
};

const bank = raw as Bank;

export function isClass(id: string): id is "10" | "12" {
  return id === "10" || id === "12";
}

export function classMeta(id: string) {
  return bank.classes[id] ?? null;
}

export function streams() {
  return bank.streams;
}

export function subjectsFor(classId: string, stream: StreamId = "science") {
  const all = bank.subjects[classId] ?? [];
  if (classId !== "12") return all;
  return all.filter((subject) => subject.stream === stream);
}

export function findSubject(classId: string, subjectId: string) {
  return (bank.subjects[classId] ?? []).find((subject) => subject.id === subjectId) ?? null;
}

export function findChapter(classId: string, subjectId: string, chapterId: string) {
  return findSubject(classId, subjectId)?.chapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function neighborChapters(classId: string, subjectId: string, chapterId: string) {
  const chapters = findSubject(classId, subjectId)?.chapters ?? [];
  const index = chapters.findIndex((chapter) => chapter.id === chapterId);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function chapterKey(classId: string, subjectId: string, chapterId: string) {
  return `${classId}/${subjectId}/${chapterId}`;
}
