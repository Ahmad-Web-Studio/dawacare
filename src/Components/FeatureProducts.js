import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// ✅ Import Cart Context
import { useCart } from "../contexts/CartContext";

// ✅ Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function FeatureProducts() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const [products, setProducts] = useState([]);

  // ✅ Cart context
  const { addToCart } = useCart();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Swiper
  useEffect(() => {
    if (swiperRef.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Autoplay, Pagination],
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".product-pagination",
          clickable: true,
        },
        breakpoints: {
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      });
    }

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
      }
    };
  }, [products]);

  return (
    <div className="product-section">

      {/* Header */}
      <div className="deals-header">
        <h2 className="deals-title">
          Feature <span className="big-span highlight">Products</span>
        </h2>
        <a href="#" className="see-all">
          <p>See All Products</p>
        </a>
      </div>

      {/* Products */}
      <div className="swiper product-swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {products.map((product) => (
            <div className="swiper-slide" key={product.id}>
              <div className="product-card">

                <div className="card-image-box">
                  <span className="discount-badge">{product.discount}</span>
                  <img src={product.productImage} alt={product.productName} />

                  {/* ✅ Add to cart icon */}
                  <button
                    className="add-cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>

                <div className="card-info">
                  <div className="rating">★ ★ ★ ★</div>
                  <h4 className="product-name">{product.productName}</h4>
                  <p className="brand-name">{product.brandName}</p>

                  <div className="price-container">
                    <span className="new-price">Rs. {product.newPrice}</span>
                    <span className="old-price">Rs. {product.oldPrice}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="product-pagination"></div>
      </div>
    </div>
  );
}

export default FeatureProducts;