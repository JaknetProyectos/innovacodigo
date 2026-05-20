"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";

import { formatPrice } from "@/lib/price";
import { getOptimizedUrl } from "@/lib/images";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CircleDollarSign,
  FileSpreadsheet,
  Mail,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  User2,
} from "lucide-react";

import { useAlert } from "@/context/AlertContext";
import { useTranslations } from "next-intl";

export default function CustomServicePage() {
  const t = useTranslations("customService");

  const { addItem } = useCart();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [quoteId, setQuoteId] = useState("");
  const [monto, setMonto] = useState("");

  const numericAmount = Number(monto || 0);

  const { showAlert } = useAlert();

  const handleSubmit = () => {
    if (!nombre || !correo || !quoteId || !numericAmount) {
      showAlert({
        title: t("alerts.warningTitle"),
        message: t("alerts.completeFields"),
        type: "warning",
      });

      return;
    }

    addItem({
      id: Date.now(),
      nombre: `${t("cartItemTitle")} #${quoteId} - ${nombre}`,
      precio: numericAmount,
      precioFormateado: formatPrice(numericAmount),
      imagen: getOptimizedUrl(
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
      ),
      cantidad: 1,
    });
  };

  return (
    <main className="min-h-screen bg-[#f5f3ff]">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-700" />

                <span className="text-sm font-semibold text-purple-700">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1e1b4b] leading-tight">
                {t("title")}
              </h1>

              <p className="mt-6 text-lg text-[#5b5675] max-w-2xl leading-relaxed">
                {t("description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-purple-100">
                  <ShieldCheck className="w-5 h-5 text-purple-700" />

                  <span className="font-medium text-[#1e1b4b]">
                    {t("features.securePayment")}
                  </span>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-purple-100">
                  <BriefcaseBusiness className="w-5 h-5 text-purple-700" />

                  <span className="font-medium text-[#1e1b4b]">
                    {t("features.businessService")}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white border border-purple-100 rounded-[32px] p-4 shadow-sm">
              <img
                src={getOptimizedUrl(
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                )}
                alt="Innova Código"
                className="w-full h-[320px] object-cover rounded-[24px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form Card */}
          <div className="bg-white border border-purple-100 rounded-[32px] p-6 sm:p-10">
            <div className="mb-10">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                <ReceiptText className="w-8 h-8 text-purple-700" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b]">
                {t("form.title")}
              </h2>

              <p className="mt-4 text-[#5b5675] leading-relaxed">
                {t("form.description")}
              </p>
            </div>

            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#1e1b4b] mb-3">
                  <User2 className="w-4 h-4 text-purple-700" />
                  {t("form.name")}
                </label>

                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf7ff] text-[#1e1b4b] placeholder:text-[#847f9c] outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#1e1b4b] mb-3">
                  <Mail className="w-4 h-4 text-purple-700" />
                  {t("form.email")}
                </label>

                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf7ff] text-[#1e1b4b] placeholder:text-[#847f9c] outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Quote ID */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#1e1b4b] mb-3">
                  <FileSpreadsheet className="w-4 h-4 text-purple-700" />
                  {t("form.quoteId")}
                </label>

                <input
                  type="text"
                  value={quoteId}
                  onChange={(e) => setQuoteId(e.target.value)}
                  placeholder={t("form.quoteIdPlaceholder")}
                  className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf7ff] text-[#1e1b4b] placeholder:text-[#847f9c] outline-none focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Monto */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#1e1b4b] mb-3">
                  <CircleDollarSign className="w-4 h-4 text-purple-700" />
                  {t("form.amount")}
                </label>

                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="15000"
                  className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf7ff] text-[#1e1b4b] placeholder:text-[#847f9c] outline-none focus:border-purple-400 transition-colors"
                />

                {numericAmount > 0 && (
                  <div className="mt-4 bg-[#f5f3ff] border border-purple-100 rounded-2xl px-5 py-4 flex items-center justify-between">
                    <span className="text-[#5b5675] text-sm">
                      {t("form.estimatedTotal")}
                    </span>

                    <span className="text-xl font-black text-[#1e1b4b]">
                      {formatPrice(numericAmount)}
                    </span>
                  </div>
                )}
              </div>

              {/* Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full h-14 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition-colors flex items-center justify-center gap-3"
                >
                  {t("form.addToCart")}

                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Card */}
          <aside className="bg-[#ede9fe] border border-purple-200 rounded-[32px] p-6 lg:top-28">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6">
              <BadgeCheck className="w-7 h-7 text-purple-700" />
            </div>

            <h3 className="text-2xl font-black text-[#1e1b4b] mb-4">
              {t("sideCard.title")}
            </h3>

            <p className="text-[#5b5675] leading-relaxed text-sm">
              {t("sideCard.description")}
            </p>

            <div className="mt-8 space-y-4">
              <div className="bg-white rounded-2xl border border-purple-100 p-4">
                <p className="text-sm text-[#5b5675] mb-1">
                  {t("sideCard.identifier")}
                </p>

                <p className="font-bold text-[#1e1b4b]">
                  {quoteId || t("sideCard.pending")}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-purple-100 p-4">
                <p className="text-sm text-[#5b5675] mb-1">
                  {t("sideCard.amount")}
                </p>

                <p className="font-bold text-[#1e1b4b]">
                  {numericAmount > 0
                    ? formatPrice(numericAmount)
                    : t("sideCard.undefined")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}