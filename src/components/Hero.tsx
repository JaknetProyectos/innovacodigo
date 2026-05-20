"use client";

import Link from "next/link";

import { useTranslations } from "next-intl";

import {
  ArrowRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-[#faf7ff] pt-32 pb-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-[-80px] w-72 h-72 rounded-full bg-violet-100" />

        <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 rounded-full bg-violet-200" />

        <div className="absolute top-1/2 right-20 w-32 h-32 rounded-3xl border border-violet-200 rotate-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-8">
              <Sparkles className="w-4 h-4 text-violet-700" />

              <span className="text-sm font-semibold text-violet-800">
                {t("badge")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-violet-950 leading-[0.95] mb-8 whitespace-pre-line">
              {t("title")}
            </h1>

            {/* Description */}
            <p className="text-lg text-violet-700 leading-relaxed max-w-xl mb-10">
              {t("description")}
            </p>

      
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-white border border-violet-100 rounded-[36px] p-6 shadow-sm">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-violet-500 font-medium">
                    {t("dashboardLabel")}
                  </p>

                  <h3 className="text-2xl font-black text-violet-950">
                    {t("dashboardTitle")}
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Chart Mock */}
              <div className="bg-violet-50 rounded-3xl p-6 mb-6 border border-violet-100">
                <div className="flex items-end gap-3 h-52">
                  <div className="flex-1 rounded-t-3xl bg-violet-300 h-20" />

                  <div className="flex-1 rounded-t-3xl bg-violet-400 h-32" />

                  <div className="flex-1 rounded-t-3xl bg-violet-500 h-44" />

                  <div className="flex-1 rounded-t-3xl bg-violet-600 h-36" />

                  <div className="flex-1 rounded-t-3xl bg-violet-700 h-52" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-violet-50 border border-violet-100 p-5">
                  <p className="text-sm text-violet-500 mb-2">
                    {t("stats.revenue")}
                  </p>

                  <h4 className="text-3xl font-black text-violet-950">
                    +28%
                  </h4>
                </div>

                <div className="rounded-3xl bg-violet-50 border border-violet-100 p-5">
                  <p className="text-sm text-violet-500 mb-2">
                    {t("stats.conversion")}
                  </p>

                  <h4 className="text-3xl font-black text-violet-950">
                    4.9%
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}