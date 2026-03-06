import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../contexts/CartContext";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FeatureProducts from "../Components/FeatureProducts";

const ProductDetailedView = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <Header />

      <div style={{ margin: "100px 0px" }} className="product-detail-container">
        {/* LEFT IMAGE */}
        <div className="product-detail-left">
          <img src={product.productImage} alt={product.productName} />
        </div>

        {/* RIGHT INFO */}
        <div className="product-detail-right">
          <h1>{product.productName}</h1>
          <h3 className="brand">Brand: {product.brandName}</h3>

          <p className="price">Rs. {product.newPrice}</p>

          {/* Medicine Specific Info */}
          <div className="medicine-info">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Dosage Form:</strong> {product.dosageForm}</p>
            <p><strong>Strength:</strong> {product.strength}</p>
            <p><strong>Pack Size:</strong> {product.packSize}</p>
          </div>

          {/* Description */}
          <div className="description">
            <h4>Description</h4>
            <p>{product.description}</p> {/* ✅ correct field */}
          </div>

          {/* Usage Instructions */}
          <div className="usage">
            <h4>Usage Instructions</h4>
            <p>{product.usageInstructions}</p> {/* ✅ correct field */}
          </div>

          {/* Quantity */}
          <div className="quantity-box">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Add To Cart */}
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...product, quantity })}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <FeatureProducts />
      <Footer />
    </>
  );
};

export default ProductDetailedView;