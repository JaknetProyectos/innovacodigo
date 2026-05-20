"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import {
  Menu,
  X,
  ShoppingCart,
  House,
  BriefcaseBusiness,
  Users,
  Mail,
  Languages,
} from "lucide-react";

import Logo from "./Logo";

import { useCart } from "@/context/CartContext";
import { useLocaleContext } from "@/context/LangContext";

export default function Header() {
  const t = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    locale,
    switchLanguage,
    isPending,
  } = useLocaleContext();

  const { totalItems, setIsOpen } = useCart();

  const navLinks = [
    {
      href: "/",
      label: t("home"),
      icon: House,
    },
    {
      href: "/nosotros",
      label: t("about"),
      icon: Users,
    },
    {
      href: "/servicios",
      label: t("services"),
      icon: BriefcaseBusiness,
    },
    {
      href: "/contacto",
      label: t("contact"),
      icon: Mail,
    },
  ];

  const toggleLanguage = () => {
    switchLanguage(locale === "es" ? "en" : "es");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-violet-100/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
          >
            <Logo className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-violet-700 transition-all duration-200 hover:bg-violet-100 hover:text-violet-950"
                >
                  <Icon className="h-4 w-4" />

                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language */}
            <button
              type="button"
              onClick={toggleLanguage}
              disabled={isPending}
              className="flex h-12 items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50 px-4 text-sm font-semibold text-violet-700 transition-all duration-200 hover:bg-violet-100 disabled:opacity-50"
            >
              <Languages className="h-4 w-4" />

              <span>
                {locale === "es" ? "EN" : "ES"}
              </span>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={t("openCart")}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-200 hover:bg-violet-200"
            >
              <ShoppingCart className="h-5 w-5" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-white bg-violet-600 px-1 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("openMenu")}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-200 hover:bg-violet-200 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="pb-5 lg:hidden">
            <nav className="flex flex-col gap-2 rounded-[2rem] border border-violet-100 bg-violet-50 p-3">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-4 text-violet-800 transition-all duration-200 hover:bg-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-medium">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}