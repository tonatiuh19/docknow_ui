import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/store";
import { signOut } from "@/store/slices/authSlice";
import { setLanguage } from "@/store/slices/uiSlice";
import {
  Menu,
  X,
  Globe,
  User,
  MapPin,
  Anchor,
  Search,
  Calendar,
} from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { language } = useAppSelector((state) => state.ui);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Set initial header state based on page type
  useEffect(() => {
    const hasHeroSection = router.pathname === "/";
    if (!hasHeroSection) {
      setIsScrolled(true); // Start with scrolled state for pages without hero sections
    }
  }, [router.pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Different thresholds based on page type
      let threshold: number;

      // Pages with large hero sections (home page)
      if (router.pathname === "/") {
        threshold = window.innerHeight * 0.4; // 40vh for home page
      }
      // Pages with medium hero sections (ports list)
      else if (
        router.pathname === "/ports" ||
        router.pathname === "/ports-list"
      ) {
        threshold = 200; // 200px threshold for ports pages
      }
      // Pages with smaller header sections (reservations, etc.)
      else {
        threshold = 50; // Small 50px threshold for pages with minimal headers
      }

      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleLanguageChange = (newLanguage: "en" | "fr" | "es") => {
    dispatch(setLanguage(newLanguage));
    router.push(router.pathname, router.asPath, { locale: newLanguage });
    setLanguageMenuOpen(false);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <div className={styles.container}>
        <div className={styles.navbar}>
          {/* Logo - Left */}
          <Link href="/" className={styles.logo}>
            <img
              src="https://garbrix.com/navios/assets/images/logo.png"
              alt="DOCK NOW Logo"
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav
            className={`${styles.nav} ${
              isScrolled ? styles.navScrolled : styles.navDefault
            }`}
          >
            <div className={styles.navLinks}>
              <Link
                href="/"
                className={`${styles.navLink} ${
                  isScrolled ? styles.navLinkScrolled : styles.navLinkDefault
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${styles.navLink} ${
                  isScrolled ? styles.navLinkScrolled : styles.navLinkDefault
                }`}
              >
                About Us
              </Link>
              <Link
                href="/ports"
                className={`${styles.navLink} ${
                  isScrolled ? styles.navLinkScrolled : styles.navLinkDefault
                }`}
              >
                Discover Ports
              </Link>
              {isAuthenticated && (
                <Link
                  href="/reservations"
                  className={`${styles.navLink} ${
                    isScrolled ? styles.navLinkScrolled : styles.navLinkDefault
                  }`}
                >
                  My Reservations
                </Link>
              )}
            </div>
          </nav>

          {/* User Section - Right */}
          <div className={styles.userSection}>
            {/* Language Selector */}
            <div className={styles.languageSelector} ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`${styles.languageButton} ${
                  isScrolled
                    ? styles.languageButtonScrolled
                    : styles.languageButtonDefault
                }`}
              >
                <Globe className={styles.languageIcon} />
                <span className={styles.languageFlag}>
                  {languages.find((lang) => lang.code === language)?.flag}
                </span>
              </button>

              {languageMenuOpen && (
                <div className={styles.dropdown}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as "en" | "fr" | "es")
                      }
                      className={`${styles.dropdownItem} ${
                        language === lang.code
                          ? styles.dropdownItemActive
                          : styles.dropdownItemDefault
                      }`}
                    >
                      <span style={{ marginRight: "0.5rem" }}>{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className={styles.authSection} ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`${styles.userButton} ${
                    isScrolled
                      ? styles.userButtonScrolled
                      : styles.userButtonDefault
                  }`}
                >
                  <div className={styles.userAvatar}>
                    <User className={styles.userAvatarIcon} />
                  </div>
                  <span className={styles.userName}>
                    {user?.name || "User"}
                  </span>
                  <svg
                    className={`${styles.dropdownArrow} ${
                      userMenuOpen ? styles.dropdownArrowOpen : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      href="/profile"
                      className={styles.userMenuLink}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className={styles.userMenuContent}>
                        <User className={styles.profileIcon} />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/reservations"
                      className={styles.userMenuLink}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className={styles.userMenuContent}>
                        <Calendar className={styles.calendarIcon} />
                        <span>My Reservations</span>
                      </div>
                    </Link>
                    <hr className={styles.userMenuDivider} />
                    <button
                      onClick={() => {
                        handleSignOut();
                        setUserMenuOpen(false);
                      }}
                      className={styles.userMenuSignOut}
                    >
                      <div className={styles.userMenuContent}>
                        <svg
                          className={styles.logoutIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link
                  href="/auth/signin"
                  className={`${styles.signInLink} ${
                    isScrolled
                      ? styles.signInLinkScrolled
                      : styles.signInLinkDefault
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className={`${styles.signUpButton} ${
                    isScrolled
                      ? styles.signUpButtonScrolled
                      : styles.signUpButtonDefault
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${styles.mobileMenuButton} ${
                  isScrolled
                    ? styles.mobileMenuButtonScrolled
                    : styles.mobileMenuButtonDefault
                }`}
              >
                {mobileMenuOpen ? (
                  <X className={styles.mobileMenuIcon} />
                ) : (
                  <Menu className={styles.mobileMenuIcon} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileMenuLinks}>
                <Link
                  href="/"
                  className={styles.mobileMenuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={styles.mobileMenuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/ports"
                  className={styles.mobileMenuLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover Ports
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/reservations"
                    className={styles.mobileMenuLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Reservations
                  </Link>
                )}

                {/* Mobile Auth Section */}
                <div className={styles.mobileMenuDivider}>
                  {isAuthenticated ? (
                    <div className={styles.mobileMenuLinks}>
                      <div className={styles.mobileUserInfo}>
                        <div className={styles.userAvatar}>
                          <User className={styles.userAvatarIcon} />
                        </div>
                        <span className={styles.userName}>
                          {user?.name || "User"}
                        </span>
                      </div>
                      <Link
                        href="/profile"
                        className={styles.mobileMenuLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className={styles.mobileSignOutButton}
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className={styles.mobileMenuLinks}>
                      <Link
                        href="/auth/signin"
                        className={styles.mobileMenuLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className={styles.mobileAuthButton}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
