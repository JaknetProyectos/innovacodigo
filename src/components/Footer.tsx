import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

import Logo from "./Logo";
import Image from "next/image";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const legalLinks = [
    {
      href: "/legal/privacidad",
      label: t("privacyPolicy"),
    },
    {
      href: "/legal/terminos",
      label: t("termsConditions"),
    },
    {
      href: "/legal/reembolsos",
      label: t("refundPolicy"),
    },
  ];

  const navigation = [
    {
      href: "/",
      label: t("home"),
    },
    {
      href: "/nosotros",
      label: t("about"),
    },
    {
      href: "/servicios",
      label: t("services"),
    },
    {
      href: "/contacto",
      label: t("contact"),
    },
  ];

  return (
    <footer className="bg-[#faf7ff] border-t border-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex mb-8"
            >
              <Logo className="h-14" />
            </Link>

            <p className="text-violet-700 leading-relaxed max-w-md mb-8">
              {t("description")}
            </p>

            {/* Contact */}
            <div className="space-y-4">
              <Link
                href="tel:+5215552445674"
                className="flex items-center gap-4 text-violet-800 hover:text-violet-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-violet-100 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>

                <span className="font-medium">
                  +52 1 55 5244 5674
                </span>
              </Link>

              <Link
                href="mailto:contacto@innovacodigo.com"
                className="flex items-center gap-4 text-violet-800 hover:text-violet-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-violet-100 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>

                <span className="font-medium">
                  contacto@innovacodigo.com
                </span>
              </Link>

              <div className="flex items-start gap-4 text-violet-800">
                <div className="w-12 h-12 rounded-2xl bg-white border border-violet-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>

                <p className="leading-relaxed">
                  {t("address")}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-8">
              <ArrowUpRight className="w-4 h-4 text-violet-700" />

              <span className="text-sm font-semibold text-violet-800">
                {t("navigation")}
              </span>
            </div>

            <ul className="space-y-4">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-violet-800 hover:text-violet-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-8">
              <ShieldCheck className="w-4 h-4 text-violet-700" />

              <span className="text-sm font-semibold text-violet-800">
                {t("legal")}
              </span>
            </div>

            <ul className="space-y-4 mb-10">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-violet-800 hover:text-violet-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Payments */}
            <div className="bg-white border border-violet-100 rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-violet-700" />
                </div>

                <div>
                  <p className="font-bold text-violet-950">
                    {t("securePayments")}
                  </p>

                  <p className="text-sm text-violet-500">
                    Visa & Mastercard
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Image
                  src="/cards.png"
                  width={150}
                  height={30}
                  alt="Visa"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-violet-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-violet-500 text-sm text-center md:text-left">
            {t("copyright")}
          </p>

          <p className="text-violet-500 text-sm">
            {t("bottomText")}
          </p>
        </div>
      </div>
    </footer>
  );
}