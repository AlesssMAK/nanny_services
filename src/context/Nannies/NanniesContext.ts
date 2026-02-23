import { createContext } from 'react';
import type { Nanny } from '../../types/nanny';

interface NanniesContextValue {
  nannies: Nanny[];
  loading: boolean;
}

export const NanniesContext = createContext<NanniesContextValue>({
  nannies: [],
  loading: true,
});
