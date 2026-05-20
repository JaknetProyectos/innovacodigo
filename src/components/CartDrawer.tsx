"use client";

import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";

import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

export default function CartDrawer() {
  const t = useTranslations("cartDrawer");

  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPriceFormatted,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label={t("closeCart")}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-[0_20px_80px_rgba(88,28,135,0.18)] flex flex-col border-l border-purple-100">
        {/* Header */}
        <div className="px-6 py-6 border-b border-purple-100 bg-gradient-to-b from-purple-50 to-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-purple-500 mb-3 font-medium">
                Innova Código
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1.25rem] bg-purple-100 flex items-center justify-center shadow-sm">
                  <ShoppingCart className="w-5 h-5 text-purple-700" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {t("title")}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? t("singleService")
                      : t("multipleServices")}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 rounded-full bg-white border border-purple-100 flex items-center justify-center hover:bg-purple-50 hover:border-purple-200 transition-all duration-300"
              aria-label={t("closeCart")}
            >
              <X className="w-4 h-4 text-purple-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-[2rem] bg-purple-100 flex items-center justify-center mb-6 shadow-inner">
                <ShoppingCart className="w-10 h-10 text-purple-700" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                {t("emptyTitle")}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                {t("emptyDescription")}
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors duration-300"
              >
                {t("continueExploring")}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-purple-100 rounded-[2rem] p-4 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-purple-50 flex-shrink-0">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 leading-snug">
                            {item.nombre}
                          </h3>

                          <p className="text-purple-700 font-semibold text-base mt-2">
                            {item.precioFormateado}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 rounded-full p-2"
                          aria-label={t("removeFromCart")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center bg-purple-50 border border-purple-100 rounded-full overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.cantidad - 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-purple-100 transition-colors duration-200"
                            aria-label={t("decreaseQuantity")}
                          >
                            <Minus className="w-3 h-3 text-purple-700" />
                          </button>

                          <span className="w-10 text-center text-sm font-semibold text-gray-900">
                            {item.cantidad}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.cantidad + 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-purple-100 transition-colors duration-200"
                            aria-label={t("increaseQuantity")}
                          >
                            <Plus className="w-3 h-3 text-purple-700" />
                          </button>
                        </div>

                        <p className="text-xs text-gray-400">
                          {t("vatIncluded")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-purple-100 bg-white px-6 py-6">
            {/* Total */}
            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-[2rem] p-5 mb-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {t("estimatedTotal")}
                  </p>

                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {totalPriceFormatted}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 text-right leading-relaxed">
                  {t("taxesIncluded")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/carrito"
                onClick={() => setIsOpen(false)}
                className="group w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold uppercase tracking-wider text-sm py-4 px-6 rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-300/30"
              >
                {t("checkout")}

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="w-full border border-purple-100 hover:bg-purple-50 text-gray-600 hover:text-purple-700 font-medium py-3 rounded-[1.5rem] transition-all duration-300 text-sm"
              >
                {t("clearCart")}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}