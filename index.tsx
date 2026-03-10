import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('Index.tsx loading (React 19)...');
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log('App render called.');
} else {
  console.error('No root element found');
  document.body.innerHTML = '<h1 style="color: red;">ROOT ELEMENT NOT FOUND</h1>';
}