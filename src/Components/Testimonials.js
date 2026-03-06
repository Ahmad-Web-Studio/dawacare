import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Testimonials() {
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
          el: ".testimonials-pagination",
          clickable: true,
        },

        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
      }
    };
  }, []);

  const testimonialsData = [
    {
      name: "Liam",
      date: "23 March 2025",
      img: "./assets/images/Rectangle 8 (1).png",
      text: "Lorem ipsum dolor sit amet consectetur. Eget id id interdum pharetra. Hendrerit fringilla bibendum ac ac leo. Mattis in a morbi nunc pharetra dignissim id at venenatis."
    },
    {
      name: "Noah",
      date: "22 Feb 2024",
      img: "./assets/images/Rectangle 8 (2).png",
      text: "Lorem ipsum dolor sit amet consectetur. Eget id id interdum pharetra. Hendrerit fringilla bibendum ac ac leo. Mattis in a morbi nunc pharetra dignissim id at venenatis."
    },
    {
      name: "Noah",
      date: "22 Feb 2024",
      img: "./assets/images/Rectangle 8 (3).png",
      text: "Lorem ipsum dolor sit amet consectetur. Eget id id interdum pharetra. Hendrerit fringilla bibendum ac ac leo. Mattis in a morbi nunc pharetra dignissim id at venenatis."
    },
    {
      name: "Noah",
      date: "22 Feb 2024",
      img: "./assets/images/Rectangle 8.png",
      text: "Lorem ipsum dolor sit amet consectetur. Eget id id interdum pharetra. Hendrerit fringilla bibendum ac ac leo. Mattis in a morbi nunc pharetra dignissim id at venenatis."
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            What Our <span className="text-red big-span">Client Say</span>
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
                d="M13.8223 7.10248C14.1659 6.75882 14.1659 6.20163 13.8223 5.85797L8.22197 0.257686C7.87831 -0.0859759 7.32112 -0.085976 6.97746 0.257686C6.6338 0.601347 6.6338 1.15853 6.97746 1.50219L11.9555 6.48023L6.97746 11.4583C6.6338 11.8019 6.6338 12.3591 6.97746 12.7028C7.32112 13.0464 7.87831 13.0464 8.22197 12.7028L13.8223 7.10248ZM0 6.48022L-7.6932e-08 7.36022L13.2 7.36023L13.2 6.48023L13.2 5.60023L7.6932e-08 5.60022L0 6.48022Z"
                fill="#D2222D"
              />
            </svg>
          </a>
        </div>

        {/* Testimonials Swiper */}
        <div className="swiper testimonials-swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {testimonialsData.map((testimonial, index) => (
              <div className="swiper-slide testimonial-card" key={index}>
                <div className="user-info">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="user-avatar"
                  />
                  <div className="user-meta">
                    <h4 className="user-name">{testimonial.name}</h4>
                    <p className="post-date">{testimonial.date}</p>
                  </div>
                </div>
                <div className="rating">★★★★★</div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
