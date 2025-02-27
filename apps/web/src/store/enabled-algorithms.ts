import type { HomeFeedType } from '@hey/data/enums';
import { Localstorage } from '@hey/data/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EnabledAlgorithmsPerisistState {
  enabledAlgorithms: HomeFeedType[];
  enableAlgorithm: (algorithm: HomeFeedType) => void;
  disableAlgorithm: (algorithm: HomeFeedType) => void;
}

export const useEnabledAlgorithmsPersistStore = create(
  persist<EnabledAlgorithmsPerisistState>(
    (set) => ({
      enabledAlgorithms: [],
      enableAlgorithm: (algorithm) => {
        set((state) => ({
          enabledAlgorithms: [...state.enabledAlgorithms, algorithm]
        }));
      },
      disableAlgorithm: (algorithm) => {
        set((state) => ({
          enabledAlgorithms: state.enabledAlgorithms.filter(
            (a) => a !== algorithm
          )
        }));
      }
    }),
    { name: Localstorage.AlgorithmStore }
  )
);
