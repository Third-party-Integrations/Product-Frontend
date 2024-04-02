import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductTable from "./view/product/product-list";
import ProductForm from "./view/product/add-product";
import ProductDescription from "./view/product/ProductDescription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
