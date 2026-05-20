"use client";

import {
  Database,
  Sparkles,
  LayoutDashboard,
  LifeBuoy,
} from "lucide-react";

import { useTranslations } from "next-intl";

const pasos = [
  {
    numero: "01",
    titulo: "connectDataTitle",
    descripcion: "connectDataDescription",
    icon: Database,
  },
  {
    numero: "02",
    titulo: "cleanDataTitle",
    descripcion: "cleanDataDescription",
    icon: Sparkles,
  },
  {
    numero: "03",
    titulo: "buildDashboardsTitle",
    descripcion: "buildDashboardsDescription",
    icon: LayoutDashboard,
  },
  {
    numero: "04",
    titulo: "deliverySupportTitle",
    descripcion: "deliverySupportDescription",
    icon: LifeBuoy,
  },
];

export default function ComoFunciona() {
  const t = useTranslations("home.process");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-6">
            <Sparkles className="w-4 h-4 text-violet-700" />

            <span className="text-sm font-semibold text-violet-800">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-violet-950 leading-tight mb-6">
            {t.rich("title", {
              br: () => <br />,
            })}
          </h2>

          <p className="text-lg text-violet-700 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {pasos.map((paso) => {
            const Icon = paso.icon;

            return (
              <div
                key={paso.numero}
                className="bg-[#faf7ff] border border-violet-100 rounded-[32px] p-8"
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-3xl bg-violet-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <span className="text-3xl font-black text-violet-200">
                    {paso.numero}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black tracking-tight text-violet-950 leading-tight mb-4">
                  {t(paso.titulo)}
                </h3>

                <p className="text-violet-700 leading-relaxed text-sm">
                  {t(paso.descripcion)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}