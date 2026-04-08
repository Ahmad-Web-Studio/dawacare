import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useSiteInfo, DEFAULT_SITE_INFO } from "../contexts/SiteInfoContext";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Header() {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { siteInfo } = useSiteInfo();
  const logoURL = siteInfo?.logoURL || DEFAULT_SITE_INFO.logoURL;

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      setAllProducts(snap.docs.map(d => ({ id: d.id, name: d.data().name })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
    document.body.style.overflow = !mobileMenuActive ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setMobileMenuActive(false);
    document.body.style.overflow = "";
  };

  const suggestions = searchQuery.trim().length > 0
    ? allProducts.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
    closeMobileMenu();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    navigate("/");
    closeMobileMenu();
  };

  const pickSuggestion = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    navigate(`/products?q=${encodeURIComponent(name)}`);
  };

  return (
    <>
      <header>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logoURL} alt="Logo" />
          </Link>

          {/* Desktop Nav */}
          <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
          </div>

          {/* Search Bar — desktop only */}
          <form className="search-bar" onSubmit={handleSearch} ref={searchRef}>
            <div className="select-and-input" style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                className="search-input"
                placeholder="Search medicines by name..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                autoComplete="off"
              />
              {searchQuery && (
                <button type="button" className="search-clear-btn" onClick={clearSearch} aria-label="Clear search">
                  ×
                </button>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="search-suggestions">
                  {suggestions.map(p => (
                    <li key={p.id} onMouseDown={() => pickSuggestion(p.name)}>
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="search-btn btn btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Header Actions — desktop */}
          <div className="header-actions">
            <div className="location">
              <span><p>Select your location</p></span>
              <select>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Karachi</option>
              </select>
            </div>

            <Link to="/" className="icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Wishlist</span>
            </Link>

            <button className="icon-link cart-btn" onClick={() => setIsCartOpen(true)}>
              <span className="cart-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </span>
              <span>Cart</span>
            </button>

            <Link to="/login" className="login-btn btn btn-danger">Login</Link>
          </div>

          {/* Mobile right: cart + hamburger */}
          <div className="mobile-header-right">
            <button className="mobile-cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
              <span className="cart-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </span>
            </button>
            <button className="mobile-menu-toggle" aria-label="Toggle menu" onClick={toggleMobileMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-menu-overlay ${mobileMenuActive ? "active" : ""}`}
        id="mobileMenuOverlay"
        onClick={(e) => e.target.id === "mobileMenuOverlay" && closeMobileMenu()}
      >
        <div className="mobile-menu">
          {/* Drawer Header */}
          <div className="drawer-header">
            <Link to="/" className="drawer-logo" onClick={closeMobileMenu}>
              <img src={logoURL} alt="Logo" />
            </Link>
            <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="drawer-nav">
            <Link to="/" className="drawer-nav-item" onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" /></svg>
              Home
            </Link>
            <Link to="/about" className="drawer-nav-item" onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" /></svg>
              About
            </Link>
            <Link to="/products" className="drawer-nav-item" onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              Products
            </Link>
            <Link to="/" className="drawer-nav-item" onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Wishlist
            </Link>
            <button className="drawer-nav-item drawer-nav-btn" onClick={() => { setIsCartOpen(true); closeMobileMenu(); }}>
              <span className="cart-icon-wrap" style={{ position: "relative", display: "inline-flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </span>
              Cart
            </button>
          </nav>

          {/* Drawer Footer */}
          <div className="drawer-footer">
            <Link to="/login" className="drawer-login-btn" onClick={closeMobileMenu}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
