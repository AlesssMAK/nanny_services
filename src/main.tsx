import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/fonts.css';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
