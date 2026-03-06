import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function BrandsSection() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Autoplay, Pagination],

        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,

        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".brands-pagination",
          clickable: true,
        },

        breakpoints: {
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          992: { slidesPerView: 5 },
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
    <section className="brands-section">
      <div className="brands-container">
        <div className="section-header">
          <h2 className="section-title">
            Featured <span className="text-red big-span">Brand</span>
          </h2>
          <a href="#" className="see-all">
            <p>See All</p>
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8223 7.10248C14.1659 6.75882 14.1659 6.20163 13.8223 5.85797L8.22197 0.257686C7.87831 -0.0859759 7.32112 -0.085976 6.97746 0.257686C6.6338 0.601347 6.6338 1.15853 6.97746 1.50219L11.9555 6.48023L6.97746 11.4583C6.6338 11.8019 6.6338 12.3591 6.97746 12.7028C7.32112 13.0464 7.87831 13.0464 8.22197 12.7028L13.8223 7.10248ZM0 6.48022L0 7.36022L13.2 7.36023L13.2 6.48023L13.2 5.60023L0 5.60022L0 6.48022Z"
                fill="#D2222D"
              />
            </svg>
          </a>
        </div>

        {/* SWIPER */}
        <div className="swiper brands-swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {/* Slide 1 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1 (1).png" alt="Pfizer" />
                </div>
                <p className="brand-name">Pfizer</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1 (2).png" alt="Novartis" />
                </div>
                <p className="brand-name">Novartis</p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1 (5).png" alt="AbbVie" />
                </div>
                <p className="brand-name">AbbVie</p>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1.png" alt="Panadol" />
                </div>
                <p className="brand-name">Panadol</p>
              </div>
            </div>

            {/* Slide 5 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1 (5).png" alt="AbbVie" />
                </div>
                <p className="brand-name">AbbVie</p>
              </div>
            </div>

            {/* Slide 6 */}
            <div className="swiper-slide brand-slide">
              <div className="brand-item">
                <div className="brand-circle">
                  <img src="./assets/Images/Ellipse 1.png" alt="Panadol" />
                </div>
                <p className="brand-name">Panadol</p>
              </div>
            </div>
          </div>

          {/* Pagination */}
       </div>
      </div>
    </section>
  );
}

export default BrandsSection;
