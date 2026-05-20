"use client";

import { useMemo, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";

import Link from "next/link";

import {
  SingleServicesSpanish,
  SingleServicesEnglish,
  DataServicesSpanish,
  DataServicesEnglish,
  Service,
} from "@/data/services";

import { formatPrice } from "@/lib/price";
import { getOptimizedUrl } from "@/lib/images";

import ServiceDetailModal from "@/components/ServiceModal";

import {
  Database,
  Layers3,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
  Boxes,
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

export default function ServiciosPage() {
  const t = useTranslations("servicesPage");

  const { addItem } = useCart();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [categoriaActivaId, setCategoriaActivaId] = useState<"data" | "single">(
    "data"
  );

  const locale = useLocale()
  const dataServices = locale == "es" ? DataServicesSpanish : DataServicesEnglish;
  const singleServices = locale == "es" ? SingleServicesSpanish : SingleServicesEnglish;

  const categorias = useMemo(
    () => [
      {
        id: "data" as const,
        nombre: t("categories.data.name"),
        descripcion: t("categories.data.description"),
        productos: dataServices,
        icon: Database,
        imagen: getOptimizedUrl(
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
        ),
      },
      {
        id: "single" as const,
        nombre: t("categories.single.name"),
        descripcion: t("categories.single.description"),
        productos: singleServices,
        icon: Layers3,
        imagen: getOptimizedUrl(
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
        ),
      },
    ],
    [t]
  );

  const categoriaActiva = useMemo(
    () => categorias.find((categoria) => categoria.id === categoriaActivaId) ?? categorias[0],
    [categorias, categoriaActivaId]
  );

  const handleAddToCart = (producto: (typeof categoriaActiva.productos)[0]) => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precioFormateado: formatPrice(producto.precio),
      imagen: producto.imagen,
      cantidad: 1,
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f3ff]">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
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
      </section>

      {/* Categories */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {categorias.map((categoria) => {
              const isActive = categoriaActiva.id === categoria.id;
              const Icon = categoria.icon;

              return (
                <button
                  key={categoria.id}
                  type="button"
                  onClick={() => setCategoriaActivaId(categoria.id)}
                  className={`group relative overflow-hidden rounded-[32px] border text-left transition-all duration-300 p-6 sm:p-7 ${
                    isActive
                      ? "bg-[#2b124c] border-[#2b124c] text-white"
                      : "bg-white border-purple-100 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                          isActive ? "bg-white/10" : "bg-[#f6f3ff]"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${
                            isActive ? "text-white" : "text-purple-700"
                          }`}
                        />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">
                        {categoria.nombre}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed max-w-sm ${
                          isActive ? "text-purple-100" : "text-[#6b6280]"
                        }`}
                      >
                        {categoria.descripcion}
                      </p>

                      <div
                        className={`inline-flex items-center gap-2 mt-5 text-sm font-semibold ${
                          isActive ? "text-white" : "text-purple-700"
                        }`}
                      >
                        {categoria.productos.length} {t("categories.available")}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    <img
                      src={categoria.imagen}
                      alt={categoria.nombre}
                      className="hidden sm:block w-28 h-28 rounded-3xl object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-purple-100 rounded-full px-4 py-2 mb-5">
                <Boxes className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {t("catalog.badge")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1f1637] mb-4">
                {categoriaActiva.nombre}
              </h2>

              <p className="text-[#6b6280] max-w-2xl leading-relaxed">
                {t("catalog.description")}
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl px-6 py-5">
              <p className="text-sm text-[#8b82a3] mb-1">
                {t("catalog.availableLabel")}
              </p>

              <p className="text-3xl font-black text-[#1f1637]">
                {categoriaActiva.productos.length}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {categoriaActiva.productos.map((producto) => (
              <div
                key={producto.id}
                className="group bg-white border border-purple-100 rounded-[32px] overflow-hidden hover:border-purple-300 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-5 left-5">
                    <div className="bg-white/95 rounded-full px-4 py-2 text-sm font-semibold text-purple-700 border border-purple-100">
                      {t("catalog.vatIncluded")}
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <button
                    type="button"
                    onClick={() => setSelectedService(producto)}
                    className="text-left w-full"
                  >
                    <h3 className="text-2xl font-black text-[#1f1637] mb-3 group-hover:text-purple-700 transition-colors duration-200">
                      {producto.nombre}
                    </h3>
                  </button>

                  <div className="flex items-center gap-2 mb-5">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />

                    <span className="text-sm font-medium text-[#6b6280]">
                      {t("catalog.ready")}
                    </span>
                  </div>

                  <p className="text-[#6b6280] leading-relaxed text-sm mb-7">
                    {producto.descripcion}
                  </p>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#8b82a3] mb-1">
                        {t("catalog.finalPrice")}
                      </p>

                      <p className="text-3xl font-black text-[#1f1637]">
                        {formatPrice(producto.precio)}
                      </p>
                      <p className="text-xl text-[#1f1637]">
                        {t("taxesIncluded")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(producto)}
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-4 rounded-2xl transition-all duration-200"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {t("catalog.addToCart")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2b124c] rounded-[40px] p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-500/10 translate-x-20 -translate-y-20" />

            <div className="relative z-10 max-w-3xl">
              <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mb-8">
                <Sparkles className="w-8 h-8" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-5">
                {t("cta.title")}
              </h2>

              <p className="text-purple-100 leading-relaxed text-lg mb-8">
                {t("cta.description")}
              </p>

              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-white text-purple-900 hover:bg-purple-100 font-bold px-7 py-4 rounded-2xl transition-all duration-200"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />

      <Footer />
    </main>
  );
}