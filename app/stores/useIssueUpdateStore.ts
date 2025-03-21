import { create } from "zustand";

interface IssueUpdateStore {
  lastUpdated: number;
  refresh: () => void;
}

export const useIssueUpdateStore = create<IssueUpdateStore>((set) => ({
  lastUpdated: Date.now(),
  refresh: () => set({ lastUpdated: Date.now() }),
}));