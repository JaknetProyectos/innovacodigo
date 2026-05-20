"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  precioFormateado: string;
  imagen: string;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalPriceFormatted: string;
}

const STORAGE_KEY = "bi-desk-cart";

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * IMPORTANT:
   * Prevent overwrite before hydration
   */
  const [isHydrated, setIsHydrated] = useState(false);

  /**
   * LOAD CART
   */
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("CART LOAD ERROR:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  /**
   * SAVE CART
   */
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items, isHydrated]);

  /**
   * ADD ITEM
   */
  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                cantidad:
                  item.cantidad + newItem.cantidad,
              }
            : item
        );
      }

      return [...prevItems, newItem];
    });

    setIsOpen(true);
  };

  /**
   * REMOVE ITEM
   */
  const removeItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  /**
   * UPDATE QUANTITY
   */
  const updateQuantity = (
    id: number,
    cantidad: number
  ) => {
    if (cantidad <= 0) {
      removeItem(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, cantidad }
          : item
      )
    );
  };

  /**
   * CLEAR CART
   */
  const clearCart = () => {
    setItems([]);
    setIsOpen(false);

    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * TOTALS
   */
  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.cantidad,
      0
    );
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.precio * item.cantidad,
      0
    );
  }, [items]);

  const totalPriceFormatted = useMemo(() => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(totalPrice);
  }, [totalPrice]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalPriceFormatted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}