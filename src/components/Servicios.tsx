"use client";

import { useState } from "react";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";

import {
  ArrowRight,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import {
  DataServicesSpanish,
  DataServicesEnglish,
  SingleServicesSpanish,
} from "@/data/services";

import { formatPrice } from "@/lib/price";

import ServiceDetailModal from "./ServiceModal";

let productos = [
  ...DataServicesSpanish.slice(0, 4)
];

type Service = (typeof productos)[0];

export default function Servicios() {
  const t = useTranslations("servicesSection");
  const locale = useLocale()
  productos = locale == "es" ? DataServicesSpanish : DataServicesEnglish;
  productos = productos.slice(0, 4)

  const { addItem } = useCart();

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const handleAddToCart = (producto: Service) => {
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
    <>
      <section
        id="servicios"
        className="py-24 bg-[#faf7ff]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
            <div>
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

              <p className="text-violet-700 text-lg max-w-2xl leading-relaxed">
                {t.rich("description", {
                  br: () => <br />,
                })}
              </p>
            </div>

            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-3xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all duration-200"
            >
              {t("viewAll")}

              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="group bg-white border border-violet-100 rounded-[32px] overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  {/* Price */}
                  <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-violet-100 border border-violet-200 mb-5">
                    <span className="text-sm font-bold text-violet-800">
                      {formatPrice(producto.precio)} MXN {t("taxesIncluded")}
                    </span>
                  </div>

                  {/* Title */}
                  <button
                    type="button"
                    onClick={() => setSelectedService(producto)}
                    className="text-left w-full"
                  >
                    <h3 className="text-2xl font-black tracking-tight text-violet-950 mb-4 hover:text-violet-700 transition-colors">
                      {producto.nombre}
                    </h3>
                  </button>

                  {/* Description */}
                  <p className="text-violet-700 leading-relaxed text-sm mb-8">
                    {producto.descripcion}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(producto)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all duration-200"
                    >
                      <ShoppingCart className="w-5 h-5" />

                      {t("add")}
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}