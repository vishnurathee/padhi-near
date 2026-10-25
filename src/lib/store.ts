import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StreamId } from "@/lib/curriculum";

type Progress = {
  studentName: string;
  stream: StreamId;
  done: Record<string, true>;
  setStudentName: (name: string) => void;
  setStream: (stream: StreamId) => void;
  markDone: (key: string) => void;
};

export const useProgress = create<Progress>()(
  persist(
    (set) => ({
      studentName: "",
      stream: "science",
      done: {},
      setStudentName: (studentName) => set({ studentName }),
      setStream: (stream) => set({ stream }),
      markDone: (key) => set((state) => ({ done: { ...state.done, [key]: true } })),
    }),
    { name: "padhaai-neev" },
  ),
);
