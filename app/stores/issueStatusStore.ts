import { create } from 'zustand';
import { Status } from '@prisma/client';

interface IssueStatusStore {
  statuses: Record<number, Status>;
  setStatus: (issueId: number, status: Status) => void;
}

export const useIssueStatusStore = create<IssueStatusStore>((set) => ({
  statuses: {},
  setStatus: (issueId, status) =>
    set((state) => ({
      statuses: {
        ...state.statuses,
        [issueId]: status,
      },
    })),
}));