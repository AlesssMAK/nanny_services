import { createContext } from 'react';
import type { Nanny } from '../../types/nanny';

interface NanniesContextValue {
  nannies: Nanny[];
  loading: boolean;
  error: string | null;
}

export const NanniesContext = createContext<NanniesContextValue>({
  nannies: [],
  loading: true,
  error: null,
});
