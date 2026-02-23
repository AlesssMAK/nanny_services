import { Route, Routes } from 'react-router-dom';
// import css from './App.module.css';
import MainLayout from '../../layouts/MainLayout';
import Favorites from '../../pages/Favorites';
import Home from '../../pages/Home';
import Nannies from '../../pages/Nannies';
import PrivateRoute from '../../routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
