import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function NecesitasAyuda() {
  const t = useTranslations("home.helpSection");

  return (
    <section
      id="contacto"
      className="py-24 bg-[#faf7ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-violet-100 rounded-[40px] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="p-10 sm:p-14 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-8 w-fit">
                <Mail className="w-4 h-4 text-violet-700" />

                <span className="text-sm font-semibold text-violet-800">
                  {t("badge")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-violet-950 leading-tight mb-6">
                {t.rich("title", {
                  br: () => <br />,
                })}
              </h2>

              <p className="text-lg text-violet-700 leading-relaxed max-w-xl mb-10">
                {t("description")}
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Link
                  href="tel:+5215552445674"
                  className="flex items-center gap-4 p-5 rounded-3xl border border-violet-100 hover:border-violet-200 transition-all duration-200"
                >
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-violet-700" />
                  </div>

                  <div>
                    <p className="text-sm text-violet-500 mb-1">
                      {t("phoneLabel")}
                    </p>

                    <p className="font-bold text-violet-950">
                      +52 1 55 5244 5674
                    </p>
                  </div>
                </Link>

                <Link
                  href="mailto:contacto@innovacodigo.com"
                  className="flex items-center gap-4 p-5 rounded-3xl border border-violet-100 hover:border-violet-200 transition-all duration-200"
                >
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-violet-700" />
                  </div>

                  <div>
                    <p className="text-sm text-violet-500 mb-1">
                      {t("emailLabel")}
                    </p>

                    <p className="font-bold text-violet-950">
                      contacto@innovacodigo.com
                    </p>
                  </div>
                </Link>

                <div className="flex items-start gap-4 p-5 rounded-3xl border border-violet-100">
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-violet-700" />
                  </div>

                  <div>
                    <p className="text-sm text-violet-500 mb-1">
                      {t("officeLabel")}
                    </p>

                    <p className="text-violet-950 leading-relaxed">
                      {t("officeAddress")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative min-h-[420px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
                alt={t("imageAlt")}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-violet-950/20" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-[32px] p-6 border border-violet-100">
                <h3 className="text-2xl font-black tracking-tight text-violet-950 mb-3">
                  {t.rich("floatingCardTitle", {
                    br: () => <br />,
                  })}
                </h3>

                <p className="text-violet-700 leading-relaxed text-sm mb-6">
                  {t("floatingCardDescription")}
                </p>

                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all duration-200"
                >
                  {t("button")}

                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}