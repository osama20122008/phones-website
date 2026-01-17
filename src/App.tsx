import React from 'react';
import { Header } from '@/components/Header';
import { Home } from '@/pages/Home';
import '@/index.css';

function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
