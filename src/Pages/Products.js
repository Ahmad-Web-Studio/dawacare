import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useCart } from "../contexts/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />

      <div className="content" style={{ margin: "100px 0px" }}>
        <h1
          style={{
            textAlign: "center",
            margin: "30px 0px",
            fontSize: "42px",
            color: "#d2222d",
          }}
        >
          OUR ALL PRODUCTS
        </h1>

        <div className="products-container">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}   // ✅ ONLY CHANGE
              style={{ textDecoration: "none" }}
              key={product.id}
            >
              <div className="product-card">
                <div className="card-image-box">
                  <span className="discount-badge">
                    {product.discount}
                  </span>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                  />
                </div>

                <div className="card-info">
                  <div className="rating">★ ★ ★ ★</div>

                  <h4 className="product-name">
                    {product.productName}
                  </h4>

                  <p className="brand-name">
                    {product.brandName}
                  </p>

                  <div className="price-container">
                    <span className="new-price">
                      Rs. {product.newPrice}
                    </span>
                    <span className="old-price">
                      Rs. {product.oldPrice}
                    </span>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault(); // keep this
                      addToCart(product);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;