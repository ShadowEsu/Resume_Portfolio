import { createRoot } from 'react-dom/client';
import React from 'react';
import { FilmApp } from './film/FilmApp';

const el = document.getElementById('film-root');
if (el) {
  createRoot(el).render(
    <React.StrictMode>
      <FilmApp />
    </React.StrictMode>
  );
}

