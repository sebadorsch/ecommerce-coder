import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Products } from "./components/Products/Products";


function App() {
  return (
    <Routes>
      <Route path="products" element={<Products />} />
      <Route path="carts/:cid" element={<Products />} />
    </Routes>
  );
}

export default App;
