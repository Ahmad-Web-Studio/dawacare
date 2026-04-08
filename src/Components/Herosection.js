import { useState } from "react";
import { useSiteInfo, DEFAULT_SITE_INFO } from "../contexts/SiteInfoContext";

function HeroSection() {
  const { siteInfo, loading } = useSiteInfo();
  const slides = (!loading && siteInfo?.slides) ? siteInfo.slides : DEFAULT_SITE_INFO.slides;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
    <section className="hero-section">
      <div className="hero-content" key={current}>
        <div className="hero-text">
          <h2 className="brand-tagline">{slide.heroTagline}</h2>
          <h1 className="hero-title">
            {slide.heroTitle}
            <span className="big-span">{slide.heroTitleHighlight}</span>
          </h1>
          <h2 className="hero-subtitle">{slide.heroSubtitle}</h2>
          <a href="#products" className="cta-button">Upto {slide.heroCTAButtonText}</a>
        </div>

        <div className="hero-image-wrapper">
          <div className="red-circle">
            <img src="/assets/Images/Ellipse 2.png" alt="Decorative circle" />
          </div>
          <img
            src={slide.heroImageURL || "/assets/Images/steptodown.com322394 2.png"}
            alt="Happy Customer"
            className="hero-img"
          />
        </div>
      </div>

      <button className="hero-prev" onClick={prev} aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 13H6.75L12 18.25l-.66.75l-6.5-6.5l6.5-6.5l.66.75L6.75 12H19z" />
        </svg>
      </button>
      <button className="hero-next" onClick={next} aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 12h12.25L11 6.75l.66-.75l6.5 6.5l-6.5 6.5l-.66-.75L16.25 13H4z" />
        </svg>
      </button>
    </section>
  );
}

export default HeroSection;
