import './styles/global.css';
import 'modern-normalize';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.tsx';
import { AuthProvider } from './context/Auth/AuthProvider.tsx';
import { FavoritesProvider } from './context/Favorites/FavoritesProvider.tsx';
import './styles/fonts.css';
import { NanniesProvider } from './context/Nannies/NanniesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <NanniesProvider>
            <App />
          </NanniesProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
