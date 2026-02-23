import { useEffect, useState } from 'react';
import { getNannies } from '../../service/firebase/nannies.service';
import type { Nanny } from '../../types/nanny';
import { NanniesContext } from './NanniesContext';
export const NanniesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getNannies();
      setNannies(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <NanniesContext.Provider value={{ nannies, loading }}>
      {children}
    </NanniesContext.Provider>
  );
};
