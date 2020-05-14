import React from 'react';

import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
        <main className="container">
          <Routes />
        </main>
      <Footer />
    </>
  );
}

export default App;
