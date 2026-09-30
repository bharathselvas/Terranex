import { create } from "zustand";

type CitizenSessionState = {
  isAuthenticated: boolean;
  mobile: string;
  login: (mobile: string) => void;
  logout: () => void;
};

export const useCitizenSession = create<CitizenSessionState>((set) => ({
  isAuthenticated: false,
  mobile: "",
  login: (mobile: string) => set({ isAuthenticated: true, mobile }),
  logout: () => set({ isAuthenticated: false, mobile: "" }),
}));
