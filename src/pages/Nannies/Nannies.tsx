import { useEffect, useState } from 'react';
import { getNannies } from '../../service/firebase/db.service';
import type { Nanny } from '../../types/nanny';
import NanniesCard from '../../components/NanniesCard/NanniesCard';

const Nannies = () => {
  const [nannies, setNannies] = useState<Nanny[]>([]);

  useEffect(() => {
    const fatchNannies = async () => {
      try {
        const data = await getNannies();
        setNannies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchNannies();
  }, []);
  return (
    <main>
      <div className="container">
        {nannies.map(nanny => (
          <NanniesCard key={nanny.id} nanny={nanny} />
        ))}
      </div>
    </main>
  );
};

export default Nannies;
