// app/store/issueDashboardStore.ts
import { create } from "zustand";

interface IssueDashboardState {
  summary: {
    open: number;
    inProgress: number;
    closed: number;
  };
  setSummary: (summary: IssueDashboardState["summary"]) => void;
}

const useIssueDashboardStore = create<IssueDashboardState>((set) => ({
  summary: {
    open: 0,
    inProgress: 0,
    closed: 0,
  },
  setSummary: (summary) => set({ summary }),
}));

export default useIssueDashboardStore;
