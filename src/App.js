import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import ProductDetailedView from "./Pages/ProductDetailedView";
import CheckoutPage from "./Pages/CheckoutPage";

// Admin panel pages
import Dashboard from "./AdminPanel/Dashoard";

// Popup cart
import Cart from "./Components/Cart";

function App() {
  return (
    <div className="App">
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        pauseOnHover
        theme="colored"
      />

      {/* Always mount Cart popup */}
      <Cart />

      {/* Routes for pages */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="website-layout">
              <Home />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="website-layout">
              <About />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div className="website-layout">
              <Products />
            </div>
          }
        />
        {/* Removed /cart route */}
        {/* <Route path="/cart" element={<div className="website-layout"><Cart /></div>} /> */}
        <Route path="/admin/*" element={<Dashboard />} />
        <Route
          path="/product/:id"
          element={
            <div className="website-layout">
              <ProductDetailedView />
            </div>
          }
        />{" "}
        {/* New checkout route */}
        <Route
          path="/checkout"
          element={
            <div className="website-layout">
            <CheckoutPage />
          </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
