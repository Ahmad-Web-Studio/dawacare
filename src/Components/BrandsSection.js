import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useBrands } from "../contexts/BrandsContext";

function BrandsSection() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const { brands, loading } = useBrands();

  const sortedBrands = [...brands].sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!swiperRef.current || sortedBrands.length === 0) return;

    // Destroy previous instance before creating a new one
    if (swiperInstance.current) {
      swiperInstance.current.destroy(true, true);
      swiperInstance.current = null;
    }

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        prevEl: ".brands-prev",
        nextEl: ".brands-next",
      },
      pagination: {
        el: ".brands-pagination",
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        576: { slidesPerView: 3 },
        992: { slidesPerView: 6 },
      },
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [sortedBrands.length, loading]);

  if (loading || sortedBrands.length === 0) return null;

  return (
    <section className="brands-section">
      <div className="brands-container">
        <div className="section-header">
          <h2 className="section-title">
            Featured <span className="text-red big-span">Brand</span>
          </h2>
        </div>

        {/* SWIPER */}
        <div className="slider-nav-wrapper">
          <button className="slider-nav-btn brands-prev" aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H6.75L12 18.25l-.66.75l-6.5-6.5l6.5-6.5l.66.75L6.75 12H19z"/></svg>
          </button>
          <div className="swiper brands-swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {sortedBrands.map((brand) => (
                <div key={brand.id} className="swiper-slide brand-slide">
                  <div className="brand-item">
                    <div className="brand-circle">
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=d2222d&color=fff&size=128&bold=true&rounded=true`;
                        }}
                      />
                    </div>
                    <p className="brand-name">{brand.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="slider-nav-btn brands-next" aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 12h12.25L11 6.75l.66-.75l6.5 6.5l-6.5 6.5l-.66-.75L16.25 13H4z"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
