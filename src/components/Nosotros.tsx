import {
  BarChart3,
  Database,
  BrainCircuit,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function Nosotros() {
  const t = useTranslations("homeAbout");

  return (
    <section
      id="nosotros"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-8">
              <BrainCircuit className="w-4 h-4 text-violet-700" />

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

            {/* Description */}
            <p className="text-lg text-violet-700 leading-relaxed max-w-xl mb-10">
              {t("description")}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-3xl border border-violet-100 bg-violet-50">
                <div className="w-12 h-12 rounded-2xl bg-white border border-violet-100 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-violet-700" />
                </div>

                <div>
                  <h3 className="font-bold text-violet-950 mb-1">
                    {t("features.integration.title")}
                  </h3>

                  <p className="text-violet-700 text-sm leading-relaxed">
                    {t("features.integration.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-3xl border border-violet-100 bg-violet-50">
                <div className="w-12 h-12 rounded-2xl bg-white border border-violet-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-violet-700" />
                </div>

                <div>
                  <h3 className="font-bold text-violet-950 mb-1">
                    {t("features.visualization.title")}
                  </h3>

                  <p className="text-violet-700 text-sm leading-relaxed">
                    {t("features.visualization.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-violet-50 border border-violet-100 rounded-[36px] p-5">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                alt={t("imageAlt")}
                className="w-full h-[500px] object-cover rounded-[28px]"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-violet-100 rounded-3xl px-6 py-5 shadow-sm">
              <p className="text-sm text-violet-500 mb-1">
                {t("floatingCard.label")}
              </p>

              <h3 className="text-2xl font-black text-violet-950">
                {t("floatingCard.title")}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}