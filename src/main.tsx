import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';
import './styles/global.css';
import './styles/fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
