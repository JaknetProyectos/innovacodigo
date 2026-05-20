import {
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("homeFeatures");

  const features = [
    {
      title: t("items.custom.title"),
      description: t("items.custom.description"),
      icon: SlidersHorizontal,
    },
    {
      title: t("items.precision.title"),
      description: t("items.precision.description"),
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 bg-[#faf7ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white border border-violet-100 rounded-[32px] p-8 sm:p-10"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-3xl bg-violet-100 border border-violet-200 flex items-center justify-center mb-8">
                  <Icon className="w-7 h-7 text-violet-700" />
                </div>

                {/* Content */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-violet-950 mb-4">
                  {feature.title}
                </h3>

                <p className="text-violet-700 leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}