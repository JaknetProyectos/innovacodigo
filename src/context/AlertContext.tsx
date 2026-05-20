"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
  autoClose?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const typeStyles = {
  success: {
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    button: "bg-violet-700 hover:bg-violet-800",
    defaultIcon: <CheckCircle2 className="h-7 w-7" />,
  },
  error: {
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    button: "bg-red-600 hover:bg-red-700",
    defaultIcon: <AlertCircle className="h-7 w-7" />,
  },
  warning: {
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    button: "bg-amber-500 hover:bg-amber-600",
    defaultIcon: <AlertTriangle className="h-7 w-7" />,
  },
  info: {
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    defaultIcon: <Info className="h-7 w-7" />,
  },
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const hideAlert = useCallback(() => {
    setIsOpen(false);

    setTimeout(() => {
      setOptions((current) => {
        current?.onClose?.();
        return null;
      });
    }, 200);
  }, []);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !options?.autoClose) return;

    const timeout = setTimeout(() => {
      hideAlert();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [isOpen, options, hideAlert]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideAlert();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hideAlert]);

  const type = options?.type || "info";
  const styles = typeStyles[type];

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {mounted && isOpen && options
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                type="button"
                aria-label="Cerrar alerta"
                onClick={hideAlert}
                className="absolute inset-0 bg-[#120b24]/70 backdrop-blur-md"
              />

              <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/20 bg-white shadow-[0_30px_80px_rgba(91,33,182,.18)]"
              >
                <div className="h-1.5 w-full bg-violet-700" />

                <button
                  type="button"
                  onClick={hideAlert}
                  className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-gray-500 transition-all hover:bg-black/10 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="p-8 sm:p-10">
                  <div className="mb-8 flex justify-center">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-[2rem] ${styles.iconBg} ${styles.iconColor}`}
                    >
                      {options.icon || styles.defaultIcon}
                    </div>
                  </div>

                  {options.image && (
                    <div className="relative mb-7 aspect-video overflow-hidden rounded-3xl">
                      <Image
                        src={options.image}
                        alt="Alert"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">
                      {options.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500">
                      {options.message}
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={hideAlert}
                      className={`w-full rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 ${styles.button}`}
                    >
                      {options.confirmText || "Continuar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert debe ser usado dentro de AlertProvider");
  }

  return context;
};