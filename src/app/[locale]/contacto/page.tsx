"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

import { useContact } from "@/hooks/useContact";
import { useAlert } from "@/context/AlertContext";

export default function ContactoPage() {
  const t = useTranslations("contact");

  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const { showAlert } = useAlert();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await sendContactForm({
      nombre: formData.nombre,
      email: formData.correo,
      telefono: formData.telefono,
      asunto: formData.asunto,
      mensaje: formData.mensaje,
    });

    if (result.success) {
      setSubmitted(true);

      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });

      return;
    }

    showAlert({
      title: t("alerts.errorTitle"),
      type: "error",
      message:
        result.error || t("alerts.defaultError"),
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f3ff]">
      <Header />

      <section className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 text-purple-600" />

              <span className="text-sm font-medium text-purple-700">
                {t("hero.badge")}
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1f1637] leading-tight">
                {t("hero.title")}
              </h1>

              <p className="mt-6 text-lg text-[#6b6280] leading-relaxed max-w-2xl">
                {t("hero.description")}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white border border-purple-100 rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-700" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1f1637]">
                      {t("info.title")}
                    </h2>

                    <p className="text-sm text-[#6b6280]">
                      {t("info.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+5215552445674"
                    className="group flex items-center gap-4 rounded-3xl border border-purple-100 px-5 py-4 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#f6f3ff] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-purple-700" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#8b82a3] font-semibold">
                        {t("info.phone")}
                      </p>

                      <span className="text-[#1f1637] font-semibold">
                        +52 1 55 5244 5674
                      </span>
                    </div>
                  </a>

                  <a
                    href="mailto:contacto@innovacodigo.com"
                    className="group flex items-center gap-4 rounded-3xl border border-purple-100 px-5 py-4 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#f6f3ff] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-purple-700" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#8b82a3] font-semibold">
                        {t("info.email")}
                      </p>

                      <span className="text-[#1f1637] font-semibold">
                        contacto@innovacodigo.com
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-3xl border border-purple-100 px-5 py-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#f6f3ff] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-700" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-[#8b82a3] font-semibold mb-1">
                        {t("info.office")}
                      </p>

                      <p className="text-sm leading-relaxed text-[#6b6280]">
                        {t("info.address")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Card */}
              <div className="bg-[#2b124c] rounded-[32px] p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-purple-500/10 translate-x-10 -translate-y-10" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    {t("custom.title")}
                  </h2>

                  <p className="text-purple-100 leading-relaxed mb-8">
                    {t("custom.description")}
                  </p>

                  <Link
                    href="/personalizado"
                    className="inline-flex items-center gap-2 bg-white text-purple-900 font-semibold px-6 py-4 rounded-2xl hover:bg-purple-100 transition-all duration-200"
                  >
                    {t("custom.button")}

                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-purple-100 rounded-[32px] p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <Send className="w-6 h-6 text-purple-700" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#1f1637]">
                    {t("form.title")}
                  </h2>

                  <p className="text-[#6b6280]">
                    {t("form.subtitle")}
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>

                  <h3 className="text-3xl font-black text-[#1f1637] mb-3">
                    {t("success.title")}
                  </h3>

                  <p className="text-[#6b6280] max-w-md mx-auto mb-8">
                    {t("success.description")}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-200"
                  >
                    {t("success.button")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1f1637] mb-2">
                        {t("form.fields.name")}
                      </label>

                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.name")}
                        required
                        className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf8ff] text-[#1f1637] placeholder:text-[#9a91b2] outline-none focus:border-purple-400 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1f1637] mb-2">
                        {t("form.fields.email")}
                      </label>

                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.email")}
                        required
                        className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf8ff] text-[#1f1637] placeholder:text-[#9a91b2] outline-none focus:border-purple-400 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1f1637] mb-2">
                        {t("form.fields.phone")}
                      </label>

                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.phone")}
                        className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf8ff] text-[#1f1637] placeholder:text-[#9a91b2] outline-none focus:border-purple-400 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1f1637] mb-2">
                        {t("form.fields.subject")}
                      </label>

                      <input
                        type="text"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        placeholder={t("form.placeholders.subject")}
                        required
                        className="w-full h-14 px-5 rounded-2xl border border-purple-100 bg-[#faf8ff] text-[#1f1637] placeholder:text-[#9a91b2] outline-none focus:border-purple-400 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1f1637] mb-2">
                      {t("form.fields.message")}
                    </label>

                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder={t("form.placeholders.message")}
                      rows={7}
                      required
                      className="w-full px-5 py-4 rounded-3xl border border-purple-100 bg-[#faf8ff] text-[#1f1637] placeholder:text-[#9a91b2] outline-none focus:border-purple-400 resize-none transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />

                    {isLoading
                      ? t("form.sending")
                      : t("form.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}