import React from 'react';

import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
        <main className="container">
          <div className="columns is-mobile is-centered is-vcentered is-multiline mt-10">
              <Routes />
          </div>
        </main>
      <Footer />
    </>
  );
}

export default App;
