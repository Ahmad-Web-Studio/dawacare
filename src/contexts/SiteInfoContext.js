// src/contexts/SiteInfoContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const SiteInfoContext = createContext(null);

export const DEFAULT_SITE_INFO = {
  logoURL: "/assets/Images/Frame 8.png",
  footerLogoURL: "/assets/Images/footer logo.png",
  slides: [
    {
      heroTagline: "HealthCare sa mily Gi",
      heroTitle: "100% Genuine Dwaai",
      heroTitleHighlight: "Ab Gar Bethey!",
      heroSubtitle: "Order Your Medicines Now",
      heroCTAButtonText: "Upto 10% OFF",
      heroImageURL: "/assets/Images/steptodown.com322394 2.png",
    },
    {
      heroTagline: "HealthCare sa mily Gi",
      heroTitle: "100% Genuine Dwaai",
      heroTitleHighlight: "Ab Gar Bethey!",
      heroSubtitle: "Order Your Medicines Now",
      heroCTAButtonText: "Upto 10% OFF",
      heroImageURL: "/assets/Images/steptodown.com322394 2.png",
    },
    {
      heroTagline: "Fast & Reliable Delivery",
      heroTitle: "Your Health,",
      heroTitleHighlight: "Our Priority!",
      heroSubtitle: "Get Medicines Delivered in 24hrs",
      heroCTAButtonText: "Shop Now",
      heroImageURL: "/assets/Images/steptodown.com322394 2.png",
    },
  ],
  contact: {
    phone1: "+06323839204",
    phone2: "+06378010848",
  },
};

// Migrate a single slide from old field names to new field names
function migrateSlide(slide) {
  return {
    heroTagline:         slide.heroTagline         ?? slide.tagline    ?? "",
    heroTitle:           slide.heroTitle           ?? slide.title      ?? "",
    heroTitleHighlight:  slide.heroTitleHighlight  ?? slide.bigSpan    ?? "",
    heroSubtitle:        slide.heroSubtitle        ?? slide.subtitle   ?? "",
    heroCTAButtonText:   slide.heroCTAButtonText   ?? slide.buttonText ?? "",
    heroImageURL:        slide.heroImageURL        ?? slide.imageURL   ?? "",
  };
}

export function SiteInfoProvider({ children }) {
  const [siteInfo, setSiteInfo] = useState(DEFAULT_SITE_INFO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "siteSettings", "businessInfo");
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setSiteInfo({
          logoURL: data.logoURL || DEFAULT_SITE_INFO.logoURL,
          footerLogoURL: data.footerLogoURL || DEFAULT_SITE_INFO.footerLogoURL,
          slides: data.slides ? data.slides.map(migrateSlide) : DEFAULT_SITE_INFO.slides,
          contact: data.contact || DEFAULT_SITE_INFO.contact,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveSiteInfo = async (newInfo) => {
    const ref = doc(db, "siteSettings", "businessInfo");
    await setDoc(ref, newInfo, { merge: true });
  };

  return (
    <SiteInfoContext.Provider value={{ siteInfo, loading, saveSiteInfo }}>
      {children}
    </SiteInfoContext.Provider>
  );
}

export function useSiteInfo() {
  return useContext(SiteInfoContext);
}
