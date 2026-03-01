import 'modern-normalize';
import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ScrollToTopButton from './components/ScrollToTopBtn/ScrollToTopButton.tsx';
import { AuthProvider } from './context/Auth/AuthProvider.tsx';
import { FavoritesProvider } from './context/Favorites/FavoritesProvider.tsx';
import { NanniesProvider } from './context/Nannies/NanniesProvider.tsx';
import './styles/fonts.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/Theme/ThemeProvider.tsx';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <NanniesProvider>
            <ThemeProvider>
              <ToastContainer position="top-right" />
              <App />
              <ThemeSwitcher />
              <ScrollToTopButton />
            </ThemeProvider>
          </NanniesProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
