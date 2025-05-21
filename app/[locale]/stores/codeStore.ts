// src/stores/counter-store.ts
"use client";

import { createStore } from "zustand/vanilla";
import { useStore, create } from "zustand";

export type CodeStoreState = {
  fontSize: number;
  code: string;
  lang: string;
  theme: string;
  padding: number;
  title: string;
  width: number;
  backdropType: string;
  backdrop: string;
  copyBtn: boolean;
  lineNum: boolean;
};

export type CodeStoreActions = {
  updateFontSize: (value: number) => void;
  update: (data: Partial<CodeStoreState>) => void;
};

export type CounterStore = CodeStoreState & CodeStoreActions;

export const frameMinWidth = 480;

export const defaultInitState: CodeStoreState = {
  fontSize: 15,
  code: "",
  lang: "javascript",
  theme: "dark-plus",
  padding: 24,
  title: "",
  width: frameMinWidth,
  backdropType: "",
  backdrop: "",
  copyBtn: true,
  lineNum: true,
};

const format_code = (code: string) => {
  const buf = Buffer.from(code, "utf-8");
  return buf.toString("base64");
};

function updateUrlSearchParams(state: CodeStoreState) {
  const url = new URL(window.location.href);

  Object.entries(state).forEach(([key, value]) => {
    if (key === "code") {
      url.searchParams.set(key, `${format_code(value as string)}`);
    } else {
      url.searchParams.set(key, `${value}`);
    }
  });

  window.history.replaceState(null, "", url.toString());
}

export const useCounterStore = create<CounterStore>()((set, get) => ({
  ...defaultInitState,
  update: (data: Partial<CodeStoreState>) => {
    set(() => {
      updateUrlSearchParams({ ...get(), ...data });
      return { ...data };
    });
  },
  updateFontSize: (fontSize: number) => set((state) => ({ fontSize })),
}));
