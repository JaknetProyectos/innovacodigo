import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getTranslations } from "next-intl/server";

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("about.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NosotrosPage() {
  const t = await getTranslations("about");

  const pilares = [
    {
      icon: LayoutDashboard,
      title: t("pillars.items.dashboard.title"),
      description: t("pillars.items.dashboard.description"),
    },
    {
      icon: Database,
      title: t("pillars.items.data.title"),
      description: t("pillars.items.data.description"),
    },
    {
      icon: BrainCircuit,
      title: t("pillars.items.analysis.title"),
      description: t("pillars.items.analysis.description"),
    },
    {
      icon: ShieldCheck,
      title: t("pillars.items.security.title"),
      description: t("pillars.items.security.description"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f3ff]">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-white mb-6">
                <Sparkles className="w-4 h-4 text-purple-700" />

                <span className="text-sm font-semibold text-purple-700">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-tight">
                {t("hero.title")}
              </h1>

              <p className="mt-6 text-lg text-[#5b5675] leading-relaxed max-w-2xl">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-purple-100">
                  <BarChart3 className="w-5 h-5 text-purple-700" />

                  <span className="font-medium text-[#1e1b4b]">
                    {t("hero.tags.bi")}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-purple-100">
                  <Database className="w-5 h-5 text-purple-700" />

                  <span className="font-medium text-[#1e1b4b]">
                    {t("hero.tags.integration")}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="bg-white border border-purple-100 rounded-[32px] p-4 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                  alt={t("hero.imageAlt")}
                  className="w-full h-[420px] object-cover rounded-[24px]"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 bg-purple-700 text-white rounded-3xl p-5 border-4 border-[#f5f3ff]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8" />

                  <div>
                    <p className="text-sm text-purple-100">
                      {t("hero.cardSubtitle")}
                    </p>

                    <p className="font-bold text-lg">
                      {t("hero.cardTitle")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-purple-100 rounded-[32px] p-8 sm:p-10">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <BrainCircuit className="w-7 h-7 text-purple-700" />
            </div>

            <h2 className="text-3xl font-black text-[#1e1b4b] mb-5">
              {t("approach.title")}
            </h2>

            <p className="text-[#5b5675] leading-relaxed text-base">
              {t("approach.description")}
            </p>
          </div>

          <div className="bg-[#ede9fe] border border-purple-200 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6">
                <ArrowRight className="w-7 h-7 text-purple-700" />
              </div>

              <h2 className="text-3xl font-black text-[#1e1b4b] mb-5">
                {t("commitment.title")}
              </h2>

              <p className="text-[#5b5675] leading-relaxed text-base">
                {t("commitment.description")}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-purple-700 font-semibold">
              <CheckCircle2 className="w-5 h-5" />

              <span>{t("commitment.highlight")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b]">
              {t("pillars.title")}
            </h2>

            <p className="mt-4 text-[#5b5675] max-w-2xl mx-auto">
              {t("pillars.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pilares.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white border border-purple-100 rounded-[28px] p-7 hover:border-purple-300 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-purple-700" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1e1b4b] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#5b5675]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}