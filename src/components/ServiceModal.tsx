"use client";

import { useEffect, useState } from "react";

import {
  X,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

import { formatPrice } from "@/lib/price";
import { useCart } from "@/context/CartContext";

import Header from "./Header";
import Footer from "./Footer";

import { useTranslations } from "next-intl";

interface Service {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
}

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailModalProps) {
  const t = useTranslations("serviceModal");

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: service.id,
      nombre: service.nombre,
      precio: service.precio,
      precioFormateado: formatPrice(service.precio),
      imagen: service.imagen,
      cantidad: quantity,
    });

    setQuantity(1);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-white">
      <Header />

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-700 transition-all hover:bg-violet-100"
          >
            <ArrowLeft className="h-4 w-4" />

            {t("back")}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <section className="relative">
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* IMAGE SIDE */}
          <div className="relative overflow-hidden bg-[#f5f3ff]">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-transparent z-10" />

            <img
              src={service.imagen}
              alt={service.nombre}
              className="h-full w-full object-cover lg:min-h-screen"
            />

            {/* FLOATING BADGE */}
            <div className="absolute bottom-8 left-8 z-20 rounded-[2rem] border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                {t("brand")}
              </p>

              <p className="mt-1 text-2xl font-black text-white">
                {formatPrice(service.precio)}
              </p>
            </div>
          </div>

          {/* INFO SIDE */}
          <div className="flex items-center bg-white px-6 py-16 lg:px-16">
            <div className="mx-auto w-full max-w-2xl">
              {/* LABEL */}
              <div className="mb-6 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-5 py-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-violet-700">
                  {t("professionalService")}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl">
                {service.nombre}
              </h1>

              {/* PRICE */}
              <div className="mt-8 flex items-end gap-3">
                <p className="text-4xl font-black text-violet-700">
                  {formatPrice(service.precio)}
                </p>

                <span className="pb-1 text-sm text-gray-400">
                  {t("taxIncluded")}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-10 rounded-[2rem] border border-violet-100 bg-violet-50/60 p-8">
                <p className="text-base leading-8 text-gray-600">
                  {service.descripcion}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="mt-10">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                  {t("quantity")}
                </p>

                <div className="inline-flex items-center overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={decrease}
                    className="flex h-16 w-16 items-center justify-center text-gray-600 transition-all hover:bg-violet-50 hover:text-violet-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <div className="flex h-16 min-w-[80px] items-center justify-center border-x border-violet-100 text-lg font-black text-gray-900">
                    {quantity}
                  </div>

                  <button
                    type="button"
                    onClick={increase}
                    className="flex h-16 w-16 items-center justify-center text-gray-600 transition-all hover:bg-violet-50 hover:text-violet-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-10 rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  {t("estimatedTotal")}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-4xl font-black tracking-tight text-gray-950">
                    {formatPrice(service.precio * quantity)}
                  </h3>

                  <div className="rounded-2xl bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                    {quantity}{" "}
                    {quantity > 1
                      ? t("servicePlural")
                      : t("serviceSingular")}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-3 rounded-[1.5rem] bg-violet-700 px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-violet-800"
                >
                  <ShoppingCart className="h-5 w-5" />

                  {t("addToCart")}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[1.5rem] border border-gray-200 px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-gray-700 transition-all hover:bg-gray-50"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}