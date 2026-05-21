"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { processEtominPayment } from "@/lib/etomin";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useAlert } from "@/context/AlertContext";
import { formatPrice } from "@/lib/price";



interface CartItem {
  id: number | string;
  nombre: string;
  precio: number;
  precioFormateado?: string;
  imagen: string;
  cantidad?: number;
  quantity?: number;
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone1: string;
  city: string;
  address1: string;
  postalCode: string;
  state: string;
  country: string;
  middleName: string;
  cardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

const initialFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone1: "",
  city: "",
  address1: "",
  postalCode: "",
  state: "CDMX",
  country: "México",
  middleName: "",
  cardNumber: "",
  cardholderName: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
};

const inputClassName =
  "w-full h-12 px-4 rounded-2xl border border-violet-200 bg-white text-violet-950 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

const coupons = [
  { code: "BI10", discount: 10 },
  { code: "BI15", discount: 15 },
  { code: "BI20", discount: 20 },
] as const;

type Coupon = (typeof coupons)[number];

export default function CarritoPage() {
  const t = useTranslations("cart");
  const { showAlert } = useAlert();

  const cart = useCart() as {
    items?: CartItem[];
    clearCart?: () => void;
  };

  const items = cart.items ?? [];
  const clearCart = cart.clearCart;

  const [step, setStep] = useState<1 | 2>(1);
  const [isPaying, setIsPaying] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const qty = item.cantidad ?? item.quantity ?? 1;
      return acc + item.precio * qty;
    }, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return (subtotal * appliedCoupon.discount) / 100;
  }, [appliedCoupon, subtotal]);

  const subtotalAfterDiscount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const vatAmount = useMemo(() => {
    return subtotalAfterDiscount * 0.16;
  }, [subtotalAfterDiscount]);

  const totalAmount = useMemo(() => {
    return subtotalAfterDiscount + vatAmount;
  }, [subtotalAfterDiscount, vatAmount]);

  const amountToPay = useMemo(() => {
    return totalAmount;
  }, [totalAmount]);

  const totalItems = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + (item.cantidad ?? item.quantity ?? 1),
      0
    );
  }, [items]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (!items.length) return;
    setStep(2);
  };

  const locale = useLocale()

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponMessage({
        type: "error",
        text: t("couponEmpty"),
      });
      return;
    }

    const found = coupons.find((coupon) => coupon.code === code);

    if (!found) {
      setCouponMessage({
        type: "error",
        text: t("invalidCoupon"),
      });
      return;
    }

    setAppliedCoupon(found);
    setCouponMessage({
      type: "success",
      text: t("couponApplied"),
    });
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsPaying(true);

    try {
      const orderId = `ORDER-${Date.now()}`;

      const paymentResult = await processEtominPayment({
        amount: amountToPay,
        orderId,
        cardData: {
          number: formData.cardNumber,
          name: formData.cardholderName,
          month: formData.expirationMonth,
          year: formData.expirationYear,
          cvv: formData.cvv,
        },
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName || "",
          email: formData.email,
          telefono: formData.phone1,
          city: formData.city,
          direccion: formData.address1,
          cp: formData.postalCode,
          state: formData.state,
          country: formData.country,
        },
      });

      if (
        paymentResult.status !== "APPROVED" &&
        paymentResult.responseCode !== "00"
      ) {
        console.log(paymentResult);
        throw new Error(t("paymentRejected"));
      }

      const emailResponse = await fetch(`/${locale ?? "es"}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reference: orderId,
          customer: {
            nombre: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            telefono: formData.phone1,
          },
          amount: amountToPay,
          total: `$ ${amountToPay} MXN`,
          items,
        }),
      });

      if (!emailResponse.ok) {
        let emailErrorMessage = t("unknownPaymentError");

        try {
          const emailResult = await emailResponse.json();
          if (emailResult?.error) {
            emailErrorMessage = emailResult.error;
          }
        } catch {
          // Keep default error message
        }

        throw new Error(emailErrorMessage);
      }

      const successText = t("paymentSuccess");

      setSuccessMessage(successText);

      showAlert({
        title: successText.split(".")[0] || successText,
        message: successText,
        type: "success",
      });

      clearCart?.();
      setStep(1);
      setFormData(initialFormData);
      setCouponInput("");
      setAppliedCoupon(null);
      setCouponMessage(null);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : t("unknownPaymentError");

      setErrorMessage(errorText);

      showAlert({
        title: t("paymentRejected"),
        message: errorText,
        type: "error",
      });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="mt-5 bg-[#faf7ff] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-4 py-2">
                <Sparkles className="w-4 h-4 text-violet-700" />
                <span className="text-sm font-semibold text-violet-800">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight tracking-tight text-violet-950 sm:text-5xl">
                {t("title")}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors ${step === 1
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-100 bg-white text-violet-700"
                  }`}
              >
                1. {t("stepCart")}
              </div>
              <ChevronRight className="w-4 h-4 text-violet-300" />
              <div
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors ${step === 2
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-100 bg-white text-violet-700"
                  }`}
              >
                2. {t("stepPayment")}
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-[36px] border border-violet-100 bg-white p-10 text-center shadow-sm sm:p-14">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-200 bg-violet-100">
                <ShoppingBag className="w-9 h-9 text-violet-700" />
              </div>

              <h3 className="mb-4 text-3xl font-black text-violet-950">
                {t("emptyTitle")}
              </h3>

              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-violet-700">
                {t("emptyDescription")}
              </p>

              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-violet-700"
              >
                {t("viewServices")}
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-[36px] border border-violet-100 bg-white shadow-sm">
                  <div className="border-b border-violet-100 p-6 sm:p-8">
                    <div className="mb-3 flex items-center gap-3">
                      <BadgeCheck className="w-5 h-5 text-violet-700" />
                      <h3 className="text-2xl font-black text-violet-950">
                        {step === 1 ? t("cartItems") : t("paymentData")}
                      </h3>
                    </div>
                    <p className="leading-relaxed text-violet-700">
                      {step === 1
                        ? t("cartDescription")
                        : t("paymentDescription")}
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    {step === 1 ? (
                      <div className="space-y-5">
                        {items.map((item) => {
                          const qty = item.cantidad ?? item.quantity ?? 1;
                          const lineTotal = item.precio * qty;

                          return (
                            <div
                              key={item.id}
                              className="flex gap-4 rounded-[28px] border border-violet-100 bg-[#fcfbff] p-4"
                            >
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-violet-100 bg-violet-100">
                                <img
                                  src={item.imagen}
                                  alt={item.nombre}
                                  className="h-full w-full object-cover"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <h4 className="text-lg font-bold leading-tight text-violet-950">
                                      {item.nombre}
                                    </h4>
                                    <p className="mt-1 text-sm text-violet-500">
                                      {t("quantity")}: {qty}
                                    </p>
                                  </div>

                                  <div className="shrink-0 text-right">
                                    <p className="text-sm text-violet-500">
                                      {t("subtotal")}
                                    </p>
                                    <p className="font-bold text-violet-950">
                                      {formatPrice(lineTotal)}
                                    </p>
                                  </div>
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-violet-700">
                                  $ {item.precio} MXN {t("beforeVat")}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                          <button
                            type="button"
                            onClick={handleContinue}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-violet-700"
                          >
                            {t("continueCheckout")}
                          </button>

                          <Link
                            href="/servicios"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-violet-800 transition-colors duration-200 hover:border-violet-300"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            {t("continueShopping")}
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handlePay} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label={t("firstName")}>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>

                          <Field label={t("lastName")}>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label={t("email")}>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>

                          <Field label={t("phone")}>
                            <input
                              type="tel"
                              name="phone1"
                              value={formData.phone1}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label={t("city")}>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>

                          <Field label={t("state")}>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>
                        </div>

                        <Field label={t("address")}>
                          <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                          />
                        </Field>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label={t("postalCode")}>
                            <input
                              type="text"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>

                          <Field label={t("country")}>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                              className={inputClassName}
                            />
                          </Field>
                        </div>

                        <div className="border-t border-violet-100 pt-2">
                          <div className="mb-5 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-violet-700" />
                            <h4 className="text-lg font-black text-violet-950">
                              {t("cardData")}
                            </h4>
                          </div>

                          <div className="space-y-4">
                            <Field label={t("cardholderName")}>
                              <input
                                type="text"
                                name="cardholderName"
                                value={formData.cardholderName}
                                onChange={handleChange}
                                required
                                className={inputClassName}
                              />
                            </Field>

                            <Field label={t("cardNumber")}>
                              <input
                                maxLength={16}
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                inputMode="numeric"
                                placeholder="4111111111111111"
                                required
                                className={inputClassName}
                              />
                            </Field>

                            <div className="grid grid-cols-3 gap-4">
                              <Field label={t("month")}>
                                <input
                                  type="text"
                                  name="expirationMonth"
                                  value={formData.expirationMonth}
                                  onChange={handleChange}
                                  placeholder="08"
                                  maxLength={2}
                                  required
                                  className={inputClassName}
                                />
                              </Field>

                              <Field label={t("year")}>
                                <input
                                  type="text"
                                  name="expirationYear"
                                  value={formData.expirationYear}
                                  onChange={handleChange}
                                  placeholder="2036"
                                  maxLength={4}
                                  required
                                  className={inputClassName}
                                />
                              </Field>

                              <Field label={t("cvv")}>
                                <input
                                  type="password"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleChange}
                                  inputMode="numeric"
                                  maxLength={4}
                                  required
                                  className={inputClassName}
                                />
                              </Field>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-violet-800 transition-colors duration-200 hover:border-violet-300"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            {t("backToCart")}
                          </button>

                          <button
                            type="submit"
                            disabled={isPaying}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Lock className="w-4 h-4" />
                            {isPaying ? t("processingPayment") : t("payNow")}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                {errorMessage ? (
                  <div className="flex items-start gap-3 rounded-[28px] border border-red-200 bg-red-50 p-5 text-red-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                ) : null}

                {successMessage ? (
                  <div className="flex items-start gap-3 rounded-[28px] border border-green-200 bg-green-50 p-5 text-green-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p>{successMessage}</p>
                  </div>
                ) : null}
              </div>

              <aside className="rounded-[36px] border border-violet-100 bg-white p-6 shadow-sm sm:p-8 lg:top-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100">
                    <ShoppingBag className="w-5 h-5 text-violet-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-violet-950">
                      {t("summary")}
                    </h3>
                    <p className="text-sm text-violet-500">
                      {t("currentOrder")}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[28px] border border-violet-100 bg-violet-50 p-5">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">
                      {t("couponTitle")}
                    </p>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponMessage(null);
                        }}
                        placeholder={t("couponPlaceholder")}
                        className="h-12 flex-1 rounded-2xl border border-violet-200 bg-white px-4 text-violet-950 outline-none transition-all duration-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                      />

                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-800"
                      >
                        {t("applyCoupon")}
                      </button>
                    </div>

                    {couponMessage ? (
                      <p
                        className={`mt-3 text-sm ${couponMessage.type === "success"
                            ? "text-green-700"
                            : "text-red-700"
                          }`}
                      >
                        {couponMessage.text}
                      </p>
                    ) : null}

                    {appliedCoupon ? (
                      <div className="mt-3 rounded-2xl bg-white border border-violet-100 px-4 py-3">
                        <p className="text-sm font-semibold text-violet-900">
                          {t("appliedCoupon")} {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-violet-500 mt-1">
                          -{appliedCoupon.discount}%
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between text-violet-700">
                    <span>{t("subtotalBeforeVat")}</span>
                    <span className="font-semibold text-violet-950">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-violet-700">
                      <span>
                        {t("discount")} ({appliedCoupon.code})
                      </span>
                      <span className="font-semibold text-violet-950">
                        - {formatPrice(discountAmount)}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between text-violet-700">
                    <span>{t("vatLabel")}</span>
                    <span className="font-semibold text-violet-950">
                      {formatPrice(vatAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-violet-700">
                    <span>{t("services")}</span>
                    <span className="font-semibold text-violet-950">
                      {items.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-violet-700">
                    <span>{t("units")}</span>
                    <span className="font-semibold text-violet-950">
                      {totalItems}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-violet-100 pt-5 mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-violet-700">{t("total")}</span>
                    <span className="text-3xl font-black text-violet-950">
                      {formatPrice(amountToPay)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-violet-500">
                    {t("secureDescription")}
                  </p>
                  <div className="flex items-center justify-between">
                    <Image
                      src="/secure-payment.png"
                      width={150}
                      height={30}
                      alt="Secure payment"
                      className="object-contain"
                    />
                    <Image
                      src="/etomin.png"
                      width={150}
                      height={30}
                      alt="Etomin"
                      className="object-contain"
                    />
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-violet-900">
        {label}
      </span>
      {children}
    </label>
  );
}