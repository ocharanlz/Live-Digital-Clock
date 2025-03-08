import React from 'react';
import LiveClock from './components/liveclock';
import Footer from './components/footer';
import Header from './components/header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <LiveClock />
      <Footer />
    </div>
  );
};

export default App;