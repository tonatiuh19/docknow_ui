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

  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

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
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-ocean-600">Dock Now</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-ocean-600 transition-colors"
            >
              <Anchor className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/ports"
              className="flex items-center space-x-2 text-gray-700 hover:text-ocean-600 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Discover Ports</span>
            </Link>
            {isAuthenticated && (
              <Link
                href="/reservations"
                className="flex items-center space-x-2 text-gray-700 hover:text-ocean-600 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>My Reservations</span>
              </Link>
            )}
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-ocean-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find((lang) => lang.code === language)?.flag}
                </span>
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as "en" | "fr" | "es")
                      }
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
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

            {/* Language & Auth Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-ocean-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">EN</span>
                </button>

                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() =>
                          handleLanguageChange(lang.code as "en" | "fr" | "es")
                        }
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
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

              {/* Auth Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-ocean-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </div>
                      </Link>
                      <Link
                        href="/reservations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>My Reservations</span>
                        </div>
                      </Link>
                      <hr className="my-1" />
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
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/signin"
                    className="bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-700 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-ocean-600 py-2"
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/ports"
                className="text-gray-700 hover:text-ocean-600 py-2"
              >
                {t("navigation.ports")}
              </Link>
              {isAuthenticated && (
                <Link
                  href="/reservations"
                  className="text-gray-700 hover:text-ocean-600 py-2"
                >
                  {t("navigation.reservations")}
                </Link>
              )}

              <div className="border-t pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-ocean-600 block py-2"
                    >
                      {t("navigation.profile")}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-red-600 hover:text-red-700 block py-2"
                    >
                      {t("navigation.signOut")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/auth/signin"
                      className="text-gray-700 hover:text-ocean-600 block py-2"
                    >
                      {t("navigation.signIn")}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-ocean-600 text-white px-4 py-2 rounded-lg inline-block"
                    >
                      {t("navigation.signUp")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
