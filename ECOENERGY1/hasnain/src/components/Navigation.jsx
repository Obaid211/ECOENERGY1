import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleLocationChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/citizen", label: "Citizen", icon: "👤" },
    { href: "/admin", label: "Admin", icon: "⚙️" },
    { href: "/analytics", label: "Analytics", icon: "📊" },
    { href: "/about", label: "About", icon: "ℹ️" },
  ];

  const handleNavClick = (href) => {
    setCurrentPath(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : styles.navDefault}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <a href="/" className={styles.logoLink} onClick={() => handleNavClick("/")}>
            <div className={styles.logoIcon}>
              <span className={styles.logoEmoji}>🌱</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>EcoEnergy</span>
              <span className={styles.logoSubtitle}>Waste to Energy</span>
            </div>
          </a>

          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  currentPath === item.href ? styles.navItemActive : styles.navItemInactive
                }`}
                onClick={() => handleNavClick(item.href)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.href && <div className={styles.activeIndicator}></div>}
              </a>
            ))}
          </div>

          <div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton}>
              <svg
                className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed}`}>
          <div className={styles.mobileMenuContent}>
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavItem} ${
                  currentPath === item.href ? styles.mobileNavItemActive : styles.mobileNavItemInactive
                }`}
                onClick={() => handleNavClick(item.href)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={styles.mobileNavIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {currentPath === item.href && <div className={styles.mobileActiveIndicator}></div>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
