import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import ProductDetail from './Components/ProductsDetails/ProductDetail';
import Nav from './Components/Nav/Nav';

const App = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
