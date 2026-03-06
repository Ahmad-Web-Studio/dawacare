import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Productslider() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

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
  }, []);

  return (
    <div className="product-section">
      
      {/* HEADER OUTSIDE SWIPER */}
      <div className="deals-header">
        <h2 className="deals-title">
          Today Best Deal <br />
          <span className="highlight big-span">For You!</span>
        </h2>
        <a href="#" className="see-all">
          <p>See All Products</p>
        </a>
      </div>

      {/* SWIPER */}
      <div className="swiper product-swiper" ref={swiperRef}>
        <div className="swiper-wrapper">

          {/* Slide 1 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/glutamax.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/surbex.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/glutamax.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 4 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/surbex.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>


                 {/* Slide 1 */}
                 <div className="swiper-slide shrink-slide">
                 <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/freestyle.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/glutamax.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/surbex.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Slide 4 */}
          <div className="swiper-slide shrink-slide">
          <div className="product-card">
            <div className="card-image-box">
              <span className="discount-badge">20%</span>
              <img src="./assets/Images/freestyle.png" alt="Glutamax" />
            </div>
            <div className="card-info">
              <div className="rating">★ ★ ★ ★</div>
              <h4 className="product-name">Arinac Forte (400/60mg) 100</h4>
              <p className="brand-name">Tablets</p>
              <div className="price-container">
                <span className="new-price">Rs. 500.0</span>
                <span className="old-price">Rs. 1500.0</span>
              </div>
            </div>
          </div>
          </div>

          {/* Add more slides if needed */}
        </div>

        {/* Pagination */}
      </div>
    </div>
  );
}

export default Productslider;
