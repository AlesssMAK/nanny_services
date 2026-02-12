import { Route, Routes } from 'react-router-dom';
// import css from './App.module.css';
import Home from '../../pages/Home';
import Nannies from '../../pages/Nannies/Nannies';
import Favorites from '../../pages/Favorites/Favorites';
import MainLayout from '../../layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
