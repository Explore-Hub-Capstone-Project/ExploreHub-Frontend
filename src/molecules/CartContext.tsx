import React, { createContext, useContext, ReactNode } from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextType {
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<any[]>([]);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { useCart };
