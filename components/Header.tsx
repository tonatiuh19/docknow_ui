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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change header style when scrolled past hero section (approximately 80vh)
      setIsScrolled(scrollPosition > window.innerHeight * 0.8);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-navy-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg ${
                isScrolled ? "bg-ocean-600" : "bg-white"
              }`}
            >
              <Anchor
                className={`w-6 h-6 ${
                  isScrolled ? "text-white" : "text-ocean-600"
                }`}
              />
            </div>
            <span
              className={`text-2xl font-bold tracking-wide transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-white"
              }`}
            >
              DOCK NOW
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav
            className={`hidden lg:flex items-center rounded-full px-8 py-3 border transition-all duration-300 ${
              isScrolled
                ? "bg-navy-800/80 backdrop-blur-md border-navy-600"
                : "bg-white/10 backdrop-blur-md border-white/20"
            }`}
          >
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`transition-colors duration-300 font-medium text-sm ${
                  isScrolled
                    ? "text-white hover:text-ocean-300"
                    : "text-white hover:text-ocean-200"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`transition-colors duration-300 font-medium text-sm ${
                  isScrolled
                    ? "text-white hover:text-ocean-300"
                    : "text-white hover:text-ocean-200"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/ports"
                className={`transition-colors duration-300 font-medium text-sm ${
                  isScrolled
                    ? "text-white hover:text-ocean-300"
                    : "text-white hover:text-ocean-200"
                }`}
              >
                Discover Ports
              </Link>
              {isAuthenticated && (
                <Link
                  href="/reservations"
                  className={`transition-colors duration-300 font-medium text-sm ${
                    isScrolled
                      ? "text-white hover:text-ocean-300"
                      : "text-white hover:text-ocean-200"
                  }`}
                >
                  My Reservations
                </Link>
              )}
            </div>
          </nav>

          {/* User Section - Right */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative hidden md:block" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className={`flex items-center space-x-2 transition-colors ${
                  isScrolled
                    ? "text-white hover:text-ocean-300"
                    : "text-white hover:text-ocean-200"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find((lang) => lang.code === language)?.flag}
                </span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as "en" | "fr" | "es")
                      }
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        language === lang.code
                          ? "bg-ocean-50 text-ocean-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 border transition-all duration-300 ${
                    isScrolled
                      ? "bg-navy-800/80 backdrop-blur-md border-navy-600 text-white hover:bg-navy-700/80"
                      : "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    {user?.name || "User"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
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
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/reservations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>My Reservations</span>
                      </div>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        handleSignOut();
                        setUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
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
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className={`transition-colors font-medium text-sm ${
                    isScrolled
                      ? "text-white hover:text-ocean-300"
                      : "text-white hover:text-ocean-200"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className={`px-4 py-2 rounded-full border transition-all duration-300 font-medium text-sm ${
                    isScrolled
                      ? "bg-ocean-600 text-white border-ocean-600 hover:bg-ocean-700"
                      : "bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors p-1 ${
                  isScrolled
                    ? "text-white hover:text-ocean-300"
                    : "text-white hover:text-ocean-200"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/ports"
                  className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover Ports
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/reservations"
                    className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Reservations
                  </Link>
                )}

                {/* Mobile Auth Section */}
                <div className="border-t border-white/20 pt-3 mt-3">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-white py-2">
                        <div className="w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {user?.name || "User"}
                        </span>
                      </div>
                      <Link
                        href="/profile"
                        className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/auth/signin"
                        className="block text-white hover:text-ocean-200 transition-colors duration-300 font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block bg-white/10 text-white px-4 py-2 rounded-xl border border-white/20 text-center font-medium"
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
