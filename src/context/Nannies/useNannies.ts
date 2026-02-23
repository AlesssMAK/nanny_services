import { useContext } from 'react';
import { NanniesContext } from './NanniesContext';

export const useNannies = () => useContext(NanniesContext);
